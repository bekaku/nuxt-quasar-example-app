import axios from 'axios'
export default defineNuxtPlugin((nuxtApp) => {
    // const { locale } = useLang(); 
    const localeCookie = useCookie('locale');
    const runtimeConfig = useRuntimeConfig()
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
    const isRefreshing = false;
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
            // Modify request config before sending the request
            // const token = useAuthStore().token
            // if (token) {
            //     config.headers.Authorization = `Bearer ${token}`
            // }

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
            // Handle successful response
            return response
        },
        (error) => {
            // Handle response error
            if (error.response && error.response.status === 401) {
                // useAuthStore().logout()
            }
            return Promise.reject(error)
        },
    )
    return {
        provide: { axios: axiosInstance },
    }
})