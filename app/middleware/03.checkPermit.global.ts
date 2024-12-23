
export default defineNuxtRouteMiddleware(async (to) => {
    // console.log('middleware > initAuth.global > Pagename: ', to.name, ', path: ',to.path);
    // skip middleware on client side entirely
    // if (import.meta.client) return

    // skip middleware on server
    // if (import.meta.server) return

    // console.log('middleware > checkPermit.global > ', to);
    const metaRequirePermit=to?.meta?.requiresPermission;
    if(metaRequirePermit!=undefined && isArray(metaRequirePermit)){
        const appStore = useAppStore();
       const isPermited= await appStore.isHavePermissionLazy(metaRequirePermit as string[]);
        // console.log('middleware > checkPermit.global > metaRequirePermit: ', metaRequirePermit);
        // console.log('isPermited', isPermited);
        //TODO implement check authorize to this page or not
        if(!isPermited){
            abortNavigation();
            return showError({
                statusCode: 403,
                statusMessage: 'Forbidden'
              })
        }
    }
})
