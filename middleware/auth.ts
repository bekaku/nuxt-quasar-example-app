export default defineNuxtRouteMiddleware((to) => {
    const { $config } = useNuxtApp()
    const token = useCookie($config.public.jwtKeyName); // get token from cookies
    if (token.value && to.path === '/auth/login') {
        return navigateTo('/');
    }
    
    // if token doesn't exist redirect to log in
    if (!token.value && to.path !== '/auth/login') {
        abortNavigation();
        return navigateTo('/auth/login');
    }
})
