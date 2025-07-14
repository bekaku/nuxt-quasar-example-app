import type { AxiosError } from 'axios';
import { useAxios } from '~/composables/useAxios';
import { useMenu } from '~/composables/useMenu';
import { AuthNoInitialPage } from '~/libs/constants';
import { useAppStore } from '~/stores/appStore';
import { useAuthenStore } from '~/stores/authenStore';
import type { UserDto } from '~/types/models';

export default defineNuxtRouteMiddleware(async (to) => {
    // console.log('middleware > initAuth.global > Pagename: ', to.name, ', path: ',to.path);
    // skip middleware on client side entirely
    // if (import.meta.client) return
    // skip middleware on client
    if (!import.meta.server) return

    // if (AuthNoInitialPath.includes(to.path)) return
    if (to.name == undefined || (typeof to.name !== 'string')) return
    const baseRouteName = to?.name?.replace(/___[a-z]{2}$/, '');
    if (typeof to.name == 'string' && AuthNoInitialPage.includes(baseRouteName)) return

    const authenStore = useAuthenStore();
    // Skip if user already loaded
    if (authenStore.auth) return

    // const { $axios, $config } = useNuxtApp()
    const { currentUserId, removeAuthToken } = useAppCookie();
    // if (import.meta.server) {
    //     const jwt = useCookie('_jwt_token_1');
    //     console.log('SERVER middleware > 02.init-auth.global > JWT token (SSR):', jwt.value);
    // }
    // console.log('middleware > 02.init-auth.global > JWT currentUserId (SSR):', currentUserId.value)
    // const jwtToken = useCookie($config.public.jwtKeyName);
    // if (!jwtToken.value) return;
    if (!currentUserId.value) return
    const appStore = useAppStore();
    const { callAxiosProcess } = useAxios();
    // const { initialAppNav } = useMenu();
    try {
        const response = await callAxiosProcess<UserDto>({
            API: '/api/user/currentUserData',
            method: 'GET',
        });
        // console.log('middleware > 02.init-auth.global > response:', response.data);
        if (response && response?.status == 200 && response.data && !isAppException(response.data)) {
            authenStore.setAuthen(response.data);
            if (response.data.permissions && response.data.permissions.length > 0) {
                appStore.setPermissions(response.data.permissions);
                // await initialAppNav();
            }
        }
    } catch (error) {
        const errors = error as AxiosError;
        if (errors?.status === 403) {
            await removeAuthToken();
            await authenStore.onLogout();
        }
    }
})
