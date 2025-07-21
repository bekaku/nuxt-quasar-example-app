export const useConfiguration = () => {
    const runtimeConfig = useRuntimeConfig()
    const isLinkFromApi = (link: string): boolean => {
        if (!runtimeConfig.public.apiDomain) {
            return false
        }
        return link.includes(runtimeConfig.public.apiDomain)
    }

    return {
        isLinkFromApi
    }
}