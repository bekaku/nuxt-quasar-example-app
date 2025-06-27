/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import { useAuthenStore } from '~/stores/authenStore';
export default defineNuxtPlugin((nuxtApp) => {
    const localeCookie = useCookie('locale');
    const runtimeConfig = useRuntimeConfig()
    const authenStore = useAuthenStore();

    const axiosInstance = axios.create({
        baseURL: runtimeConfig.public.apiBase as string,
        withCredentials: false,
        timeout: runtimeConfig.public.timeOut as unknown as number,
        headers: {
            'Content-Type': 'application/json',
            'Accept-Apiclient': runtimeConfig.public.apiClient
        },
        validateStatus: (status) => status < 400 // Resolve only if the status code is less than 400
    })

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
        (config) => {
            const token = authenStore.jwtToken;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }

            config.headers['Accept-Language'] = localeCookie.value;
            return config
        },
        (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
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
                    const tokenTORefresh = authenStore.refreshToken;
                    console.log('Refreshing token:', { tokenTORefresh, isRefreshing, queueLength: failedQueue.length });
                    axiosInstance.defaults.baseURL = runtimeConfig.public.apiBase;
                    axiosInstance.defaults.responseType = 'json';
                    axiosInstance.defaults.headers['Content-Type'] = 'application/json';

                    const { data } = await axiosInstance.post('/api/auth/refreshToken', {
                        refreshToken: {
                            refreshToken: tokenTORefresh
                        }
                    });

                    await authenStore.setAuthenCookie(data);
                    const newToken = data.authenticationToken;
                    axiosInstance.defaults.headers.Authorization = `Bearer ${newToken}`;
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    processQueue(null, newToken);
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    processQueue(refreshError, null);
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