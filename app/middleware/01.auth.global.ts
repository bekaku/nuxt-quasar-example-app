import { AuthNoFilterPage } from '~/libs/constants';
export default defineNuxtRouteMiddleware((to) => {
    if (to.name == undefined || (typeof to.name !== 'string')) return
    const baseRouteName = to?.name?.replace(/___[a-z]{2}$/, '');
    if (typeof to.name == 'string' && AuthNoFilterPage.includes(baseRouteName)) return
    // console.log('middleware > auth.global > Pagename: ', to.name, ', path: ', to.path, ',meta: ', to.meta?.layout);

    // const { $config } = useNuxtApp()
    const { currentUserId } = useAppCookie();
    // console.log('middleware > auth.global > JWT currentUserId (SSR):', currentUserId.value)
    // const token = useCookie($config.public.jwtKeyName); // get token from cookies
    if (currentUserId.value && to.path === '/auth/login') {
        return navigateTo('/');
    }

    if (!currentUserId.value && to.path !== '/auth/login') { // if token doesn't exist redirect to log in
        abortNavigation();
        // return navigateTo('/auth/login?continue=' + to.fullPath ? to.fullPath : '');
        // return navigateTo('/auth/login?continue=' + (to.fullPath ? encodeURIComponent(to.fullPath):''));
        const continueQuery = to.fullPath
            ? `?continue=${!import.meta.server ? encodeURIComponent(to.fullPath) : to.fullPath}`
            : ''
        return navigateTo(`/auth/login${continueQuery}`)
    }
})