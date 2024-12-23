/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useAuthenStore } from '~/stores/authenStore';
export default defineNuxtPlugin((nuxtApp) => {
    // const { locale } = useLang(); 
    const localeCookie = useCookie('locale');
    const runtimeConfig = useRuntimeConfig()
    const authenStore = useAuthenStore();
    // const refreshToken = useCookie<string | null>(runtimeConfig.public.refreshJwtKeyName)
    const axiosInstance = axios.create({
        baseURL: runtimeConfig.public.apiBase as string,
        withCredentials: false,
        timeout: runtimeConfig.public.timeOut as unknown as number,
        headers: {
            // Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept-Apiclient': runtimeConfig.public.apiClient
            // 'Accept-Language': DefaultLocale,
        },
        validateStatus: (status) => status < 400 // Resolve only if the status code is less than 400
        // validateStatus: (status) => status <= 500 // Resolve only if the status code is less than 500
    })



    // for multiple requests
    let isRefreshing = false;
    let failedQueue: any[] = [];
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
        (config) => {
            const token = authenStore.jwtToken;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            // config.headers['Accept-Language'] = Cookies.get(LocaleKey);
            config.headers['Accept-Language'] = localeCookie.value;
            return config
        },
        (error) => {
            // Handle request error
            return Promise.reject(error)
        },
    )
    axiosInstance.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 403 && !originalRequest._retry) {
                if (isRefreshing) {
                    return new Promise(function (resolve, reject) {
                        console.warn('isRefreshing > failedQueue.push', originalRequest.url);
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    }).catch(err => {
                        return Promise.reject(err);
                    });
                }

                //TODO
                // const currentToken = Cookies.get(AppAuthTokenKey);
                // if (currentToken) {
                //   const currentExpireStatus = await getTokenStatus(currentToken);
                //   console.log('try new call currentExpireStatus', 'currentToken', currentToken, currentExpireStatus);
                //   if (currentExpireStatus && currentExpireStatus == 'VALID') {
                //     originalRequest.headers['Authorization'] = 'Bearer ' + currentToken;
                //     return api(originalRequest);
                //   }
                // }
                originalRequest._retry = true;
                isRefreshing = true;

                // eslint-disable-next-line no-async-promise-executor
                return new Promise(async (resolve, reject) => {
                    console.warn('/api/auth/refreshToken', authenStore.refreshToken);
                    // console.warn('/api/auth/refreshToken', refreshToken.value);
                    try {
                        axiosInstance.defaults.baseURL = runtimeConfig.public.apiBase;
                        axiosInstance.defaults.responseType = 'json';
                        axiosInstance.defaults.headers['Content-Type'] = 'application/json';
                        const { data } = await axiosInstance.post('/api/auth/refreshToken', {
                            refreshToken: {
                                refreshToken:  authenStore.refreshToken
                            }
                        });
                        await authenStore.setAuthenCookie(data);
                        axiosInstance.defaults.headers.Authorization = `Bearer ${data.authenticationToken}`;
                        originalRequest.headers.Authorization = `Bearer ${data.authenticationToken}`;
                        processQueue(null, data.authenticationToken);
                        resolve(axiosInstance(originalRequest));
                    } catch (err) {
                        processQueue(err, null);
                        await authenStore.onLogout();
                        navigateTo('/auth/login');
                        reject(err);
                    } finally {
                        isRefreshing = false;
                    }
                });
            }
            return Promise.reject(error)
        },
    )
    return {
        provide: { axios: axiosInstance },
    }
})