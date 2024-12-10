
export default defineNuxtRouteMiddleware(async (to) => {
    // console.log('middleware > initAuth.global > Pagename: ', to.name, ', path: ',to.path);
    // skip middleware on client side entirely
    // if (import.meta.client) return

    // skip middleware on server
    // if (import.meta.server) return

    // console.log('middleware > checkPermit.global > ', to);
    const metaRequirePermit=to?.meta?.requiresPermission;
    if(metaRequirePermit!=undefined && isArray(metaRequirePermit)){
        // console.log('middleware > checkPermit.global > metaRequirePermit: ', metaRequirePermit);
        //TODO implement check authorize to this page or not
    }
})
