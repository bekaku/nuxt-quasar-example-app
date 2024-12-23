import type { IPageMetaConfig } from "~/types/common";

export const useInitPage = (config?: IPageMetaConfig) => {
    const { getPageMetaByKey } = useBase();
    const { t } = useLang();
    // console.log('getPageMetaByKey', 'pageName: ', getPageMetaByKey('pageName'), ', requiresPermission: ', getPageMetaByKey('requiresPermission'));
    if (config?.setTitle !== false) {
        const pageName = getPageMetaByKey('pageName') as string;
        useHead({
            title: pageName != undefined ? t(pageName) : undefined
        })
    }
}