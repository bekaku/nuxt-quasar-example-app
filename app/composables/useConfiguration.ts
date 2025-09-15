export const useConfiguration = () => {
    const { public: publicConfig } = useRuntimeConfig()
    const isLinkFromApi = (link: string): boolean => {
        if (!publicConfig.apiBase) {
            return false
        }
        return link.includes(publicConfig.apiBase)
    }
    const isLinkFromCdn = (link: string): boolean => {
        if (!publicConfig.cdnBase) {
            return false
        }
        return link.includes(publicConfig.cdnBase)
    }
    const isDevMode = () => {
        return import.meta.dev;
    };
    const isServer = () => {
        return import.meta.server;
    };
    return {
        isLinkFromApi,
        isLinkFromCdn,
        isDevMode,
        isServer,
        ...publicConfig
    }
}