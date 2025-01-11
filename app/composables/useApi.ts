// import { biCheckCircle, biExclamationTriangle, biX } from "@quasar/extras/bootstrap-icons";
// import type { AxiosError, AxiosResponse } from "axios";
// import type { AppException, RequestType, ResponseMessage } from "~/types/common";

// export const useApi = async <T>(req: RequestType, devLog: boolean = true) => {

//     const { $axios } = useNuxtApp()
//     const config = useRuntimeConfig()
//     const { canSyncActiveStatusToServer } = useDevice();
//     const { notify, loading: quasarLoading } = useQuasar();
//     const loading = ref<boolean>(false);
//     const data = ref<T | null>(null);
//     const error = ref<AxiosError | null>(null);
//     const axiosResponse = ref<AxiosResponse<T> | null>(null);
//     const callAxiosProcess = async () => {
//         loading.value = true;
//         const canSyncOnlineStatus = await canSyncActiveStatusToServer();
//         if (req.baseURL != undefined) {
//             $axios.defaults.baseURL = req.baseURL;
//         } else {
//             $axios.defaults.baseURL = config.public.apiBase;
//         }

//         if (req.contentType) {
//             $axios.defaults.headers['Content-Type'] = req.contentType;
//         } else {
//             $axios.defaults.headers['Content-Type'] = 'application/json';
//         }
//         if (req.responseType) {
//             $axios.defaults.responseType = req.responseType;
//         } else {
//             $axios.defaults.responseType = 'json';
//         }

//         $axios.defaults.headers['X-Sync-Active'] = canSyncOnlineStatus ? '1' : '0';
//         $axios({
//             method: req.method,
//             url: req.API,
//             data: req.body ? req.body : undefined
//         }).then((response) => {
//             if (import.meta.dev && devLog && !import.meta.server) {
//                 console.log(`api ${$axios.defaults.baseURL}${req.API}`, response);
//             }
//             data.value = response.data;
//             axiosResponse.value = response;
//         }).catch((axiosError) => {
//             if (axiosError?.response) {
//                 if (axiosError.response.status != 401 && axiosError.response.status != 403) {
//                     const responseData = axiosError?.response?.data;
//                     if (responseData) {
//                         exeptionNotify(axiosError?.response);
//                     }
//                 }
//             }
//             error.value = axiosError;
//         }).finally(() => {
//             loading.value = false;
//         });
//     };
//     callAxiosProcess();

//     const exeptionNotify = <T>(response: AxiosResponse<T>) => {
//         if (response && response.data) {
//             if (isAppException(response.data)) {
//                 notifyMessage(response.data);
//             } else if (isServerResponseMessage(response.data)) {
//                 notifyServerMessage(response.data);
//             }
//         }
//     };
//     const notifyMessage = (response: AppException | null): void => {
//         console.error(response);
//         if (import.meta.server || response == null) {
//             return;
//         }
//         if (quasarLoading.isActive) {
//             quasarLoading.hide();
//         }
//         notify(
//             {
//                 message: `<strong>${response.message}</strong><br> ${response.errors?.join('<br>')}`,
//                 html: true,
//                 icon: biExclamationTriangle,
//                 type: 'negative',
//                 timeout: 15 * 1000,
//                 progress: true,
//                 position: 'bottom-left',
//                 multiLine: true,
//                 actions: [{ icon: biX, color: 'white' }]
//             },
//         );
//     };
//     const notifyServerMessage = (response: ResponseMessage): void => {
//         if (import.meta.server || !response.message) {
//             return;
//         }
//         if (quasarLoading.isActive) {
//             quasarLoading.hide();
//         }
//         notify(
//             {
//                 message: response.message,
//                 icon: response.status == 'OK' || response.status == 'CREATED' ? biCheckCircle : biExclamationTriangle,
//                 type: response.status == 'OK' || response.status == 'CREATED' ? 'positive' : 'negative',
//                 timeout: response.status == 'OK' || response.status == 'CREATED' ? 3 * 1000 : 10 * 1000,
//                 progress: true,
//                 position: 'bottom-left',
//                 multiLine: true,
//                 actions: [{ icon: biX, color: 'white' }]
//             },
//         );
//     }
//     const refresh = () => {
//         callAxiosProcess();
//     }
//     const clear = () => {
//         loading.value = false;
//         data.value = null;
//         error.value = null;
//         axiosResponse.value = null;
//     }
//     return {
//         loading,
//         data,
//         error,
//         axiosResponse,
//         clear,
//         refresh
//     }
// };