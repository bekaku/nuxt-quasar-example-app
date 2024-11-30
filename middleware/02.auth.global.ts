import { AuthNoFilterPage } from '~/libs/constants';
export default defineNuxtRouteMiddleware((to) => {

    if (to.name != undefined && typeof to.name == 'string' && AuthNoFilterPage.includes(to.name)) return
    console.log('middleware > auth > Pagename: ', to.name, ', path: ', to.path, ',meta: ', to.meta?.layout);


    const { $config } = useNuxtApp()
    const token = useCookie($config.public.jwtKeyName); // get token from cookies
    if (token.value && to.path === '/auth/login') {
        return navigateTo('/');
    }

    if (!token.value && to.path !== '/auth/login') { // if token doesn't exist redirect to log in
        abortNavigation();
        return navigateTo('/auth/login');
    }
})
