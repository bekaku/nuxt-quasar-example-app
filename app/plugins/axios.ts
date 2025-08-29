/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import JSONbig from 'json-bigint'
import { useAuthenStore } from '~/stores/authenStore';
const JSONbigString = JSONbig({ storeAsString: true });
export default defineNuxtPlugin((nuxtApp) => {
    // const { $config } = useNuxtApp()
    const localeCookie = useCookie('locale');
    // const headersCookie = useRequestHeaders(['cookie'])
    const runtimeConfig = useRuntimeConfig()
    // const event = useRequestEvent()
    const authenStore = useAuthenStore();
    const { setRefreshAuthenToken, currentUserId, getCurrentUserToken, removeAuthToken } = useAppCookie();

    const axiosInstance = axios.create({
        baseURL: runtimeConfig.public.apiBase as string,
        withCredentials: true,
        timeout: runtimeConfig.public.timeOut as unknown as number,
        headers: {
            'Content-Type': 'application/json',
            'Accept-Apiclient': runtimeConfig.public.apiClient
        },
        validateStatus: (status) => status < 400, // Resolve only if the status code is less than 400
        // transformResponse: [function (data) {
        //     try {
        //         const parsed = JSONbigString.parse(data);
        //         console.log('Parsed ID type:', typeof parsed?.id); // Should log: "string"
        //         return parsed;
        //     } catch (e) {
        //         console.warn('Parse failed:', e);
        //         return data;
        //     }
        // }]
        transformResponse: [data => data]
    })

    // const event = nuxtApp.ssrContext?.event;
    // if (import.meta.server && event) {
    //     const cookie = getRequestHeader(event, 'cookie');
    //     console.log('axios.ts SERVERMODE >cookie', cookie)
    //     if (cookie) {
    //         axiosInstance.defaults.headers.Cookie = cookie;
    //     }
    // }

    // for multiple requests
    let isRefreshing = false;
    let failedQueue: { resolve: (value?: any) => void; reject: (reason?: any) => void }[] = [];

    const processQueue = (error: any, token = null) => {
        failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });

        failedQueue = [];
    };

    axiosInstance.interceptors.request.use(
        async (config) => {
            // if (import.meta.server) {
            // if (event) {
            //     const cookie = event.node.req.headers.cookie
            //     console.log('axios.ts SERVERMODE >cookie 2 ', cookie)
            // }
            // console.log('axios.ts SERVERMODE >headersCookie ', headersCookie.cookie)
            // if (headersCookie.cookie) {
            //     config.headers.cookie = headersCookie.cookie
            // }
            // }

            // const token = authenStore.jwtToken;
            const currentToken = await getCurrentUserToken();
            // console.log('axios.ts > currentUserJwt', currentToken)
            if (currentToken && currentToken?.authenticationToken) {
                config.headers.Authorization = `Bearer ${currentToken.authenticationToken}`
            }
            config.headers['X-User-ID'] = currentUserId.value || '';
            config.headers['Accept-Language'] = localeCookie.value;
            return config
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            if (response?.data) {
                try {
                    response.data = JSONbigString.parse(response.data);
                } catch (e) {
                    // fallback to normal JSON
                    response.data = JSON.parse(response.data);
                }
            }
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            const currentToken = await getCurrentUserToken();
            if (currentToken && currentToken.refreshToken && error.response && error.response.status === 401 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        console.warn('Request queued:', originalRequest.url);
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    }).catch(err => {
                        return Promise.reject(err);
                    });
                }

                isRefreshing = true;
                originalRequest._retry = true;

                try {
                    const tokenTORefresh = currentToken.refreshToken;
                    console.log('Refreshing token:', { tokenTORefresh, isRefreshing, queueLength: failedQueue.length });
                    axiosInstance.defaults.baseURL = runtimeConfig.public.apiBase;
                    axiosInstance.defaults.responseType = 'json';
                    axiosInstance.defaults.headers['Content-Type'] = 'application/json';

                    const { data } = await axiosInstance.post('/api/auth/refreshToken', {
                        refreshToken: {
                            refreshToken: tokenTORefresh
                        }
                    });

                    await setRefreshAuthenToken(data);
                    const newToken = data.authenticationToken;
                    axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    processQueue(null, newToken);
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError, null);
                    await removeAuthToken();
                    await authenStore.onLogout();
                    navigateTo('/auth/login');
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }
            return Promise.reject(error);
        },
    )

    return {
        provide: { axios: axiosInstance },
    }
})