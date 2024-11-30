
import { useAuthenStore } from '~/stores/authenStore'
import { useAxios } from '~/composables/useAxios'
import type { UserDto } from '~/types/models';
import type { AxiosResponse, AxiosError } from 'axios';
import { AuthNoFilter } from '~/libs/constants';
export default defineNuxtRouteMiddleware(async (to) => {
    // skip middleware on client side entirely
    // if (import.meta.client) return

    // skip middleware on server
    // if (import.meta.server) return
    if (AuthNoFilter.includes(to.path)) return

    const authenStore = useAuthenStore();
    // Skip if user already loaded
    if (authenStore.auth) return

    const { $config, $axios } = useNuxtApp()
    const jwtToken = useCookie($config.public.jwtKeyName);
    if (!jwtToken.value) return;

    $axios.defaults.headers.Authorization = `Bearer ${jwtToken.value || ''}`;
    $axios.defaults.headers['Content-Type'] = 'application/json';
    $axios.defaults.responseType = 'json';
    try {
        const response: AxiosResponse<UserDto> = await $axios({
            method: 'GET',
            url: '/api/user/currentUserData',
        });
        if (
            response &&
            response.status &&
            response.status == 200 &&
            response.data &&
            !isAppException(response.data)
        ) {
            authenStore.setAuthen(response.data);
        }
    } catch (error) {
        const errors = error as AxiosError;
        if (errors?.status === 403) {
            await authenStore.onLogout();
        }
    }
})
