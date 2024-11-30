import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { RefreshTokenResponse } from '~/types/common';
import type { UserDto } from '~/types/models';
export const useAuthenStore = defineStore('authenStore', () => {
    const config = useRuntimeConfig()
    const cookiesExpireDays = 30;
    const jwtToken = useCookie<string | null>(config.public.jwtKeyName, {
        expires: addDateByDays(config.public.jwtAges),
        path: '/',
        sameSite: 'lax',
        secure: !import.meta.dev
    },)
    const refreshToken = useCookie<string | null>(config.public.refreshJwtKeyName, {
        expires: addDateByDays(config.public.jwtAges),
        path: '/',
        sameSite: 'strict',
        secure: !import.meta.dev
    },)

    const auth = ref<UserDto | undefined>(undefined);
    const loginedCover = computed(() => auth.value?.cover?.image);
    const loginedAvatar = computed(() => auth.value?.avatar?.image);
    const loginedDisplay = computed(() => auth.value?.username
        ? auth.value?.username
        : auth.value?.email);

    const setAuthen = (item: UserDto) => {
        auth.value = item;
    };
    const setAuthenCookie = (authResponse: RefreshTokenResponse) => {
        if (!authResponse) {
            return new Promise((resolve) => resolve(false));
        }
        return new Promise((resolve) => {
            jwtToken.value = authResponse.authenticationToken;
            refreshToken.value = authResponse.refreshToken;
            resolve(true)
        });
    };
    const onLogout = () => {
        auth.value = undefined;
        jwtToken.value = null;
        refreshToken.value = null; 
        return new Promise((resolve) => resolve(true));
    };
    return {
        auth,
        loginedCover,
        loginedAvatar,
        loginedDisplay,
        setAuthen,
        onLogout,
        setAuthenCookie,
        jwtToken,
        refreshToken
    };

});
