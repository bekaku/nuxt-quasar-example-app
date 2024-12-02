import { useAuthenStore } from '~/stores/authenStore'
import { useAppStore } from '~/stores/appStore'
import { useAxios } from '~/composables/useAxios'
import { useMenu } from '~/composables/useMenu'
import type { UserDto } from '~/types/models';
import type { AxiosResponse, AxiosError } from 'axios';
import { AuthNoInitialPage } from '~/libs/constants';
import type { IAcl } from "~/types/common";

export default defineNuxtRouteMiddleware(async (to) => {
    // console.log('middleware > 01.initAuth.global > Pagename: ', to.name, ', path: ',to.path);
    // skip middleware on client side entirely
    // if (import.meta.client) return

    // skip middleware on server
    // if (import.meta.server) return

    // if (AuthNoInitialPath.includes(to.path)) return
    if (to.name == undefined) return
    if (typeof to.name == 'string' && AuthNoInitialPage.includes(to.name)) return

    const authenStore = useAuthenStore();
    // Skip if user already loaded
    if (authenStore.auth) return

    const { $config } = useNuxtApp()
    const jwtToken = useCookie($config.public.jwtKeyName);
    if (!jwtToken.value) return;
    const appStore = useAppStore();
    const { callAxiosProcess } = useAxios();
    const { initialAppNav } = useMenu();
    try {
        const response = await callAxiosProcess<UserDto>({
            API: '/api/user/currentUserData',
            method: 'GET',
        });
        if (response && response?.status == 200 && response.data && !isAppException(response.data)) {
            authenStore.setAuthen(response.data);

            const aclResponse = await callAxiosProcess<IAcl>({
                API: '/api/permission/userAcl?getMenuList=0',
                method: 'GET',
            });
            if (aclResponse && aclResponse?.status == 200 && aclResponse.data) {
                const acl: IAcl = aclResponse.data;
                if (acl.permissions && acl.permissions.length > 0) {
                    appStore.setPermissions(acl.permissions);
                }

                // if (acl.menus && acl.menus.length > 0) {
                //     appStore.setDrawers(acl.menus);
                // }
                await initialAppNav();
            }
        }
    } catch (error) {
        const errors = error as AxiosError;
        if (errors?.status === 403) {
            await authenStore.onLogout();
        }
    }
})
