import {useAuthenStore} from '~/stores/authenStore'
import {useAppStore} from '~/stores/appStore'
import {useAxios} from '~/composables/useAxios'
import type {UserDto} from '~/types/models';
import type {AxiosResponse, AxiosError} from 'axios';
import {AuthNoInitialPath} from '~/libs/constants';
import type {IAcl} from "~/types/common";

export default defineNuxtRouteMiddleware(async (to) => {
    // console.log('middleware > 01.initAuth.global > Pagename: ', to.name, ', path: ',to.path);
    // skip middleware on client side entirely
    // if (import.meta.client) return

    // skip middleware on server
    // if (import.meta.server) return
    if (AuthNoInitialPath.includes(to.path)) return

    const authenStore = useAuthenStore();
    // Skip if user already loaded
    if (authenStore.auth) return

    const {$config} = useNuxtApp()
    const jwtToken = useCookie($config.public.jwtKeyName);
    if (!jwtToken.value) return;
    const appStore =useAppStore();
    const {callAxiosProcess} = useAxios();
    try {
        const response = await callAxiosProcess<UserDto>({
            API: '/api/user/currentUserData',
            method: 'GET',
        });
        if (response && response?.status == 200 && response.data && !isAppException(response.data)) {
            authenStore.setAuthen(response.data);

            const aclResponse = await callAxiosProcess<IAcl>({
                API: '/api/permission/userAcl',
                method: 'GET',
            });
            if (aclResponse && aclResponse?.status == 200 && aclResponse.data) {
                const acl:IAcl = aclResponse.data;
                if (acl.permissions && acl.permissions.length > 0) {
                    appStore.setPermissions(acl.permissions);
                }
                if (acl.menus && acl.menus.length > 0) {
                    appStore.setDrawers(acl.menus);
                }
            }
        }
    } catch (error) {
        const errors = error as AxiosError;
        if (errors?.status === 403) {
            await authenStore.onLogout();
        }
    }
})
