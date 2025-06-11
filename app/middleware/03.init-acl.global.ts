import { useMenu } from '~/composables/useMenu';

export default defineNuxtRouteMiddleware(async (to) => {
    // skip middleware on client
    if (!import.meta.server) return
    const { initialAppNav } = useMenu();
    await initialAppNav();
})
