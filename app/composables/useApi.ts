import type { FetchOptions } from 'ofetch'
import type { RefreshTokenResponse } from '~/types/common'

let refreshPromise: Promise<RefreshTokenResponse> | null = null

export const useApi = () => {
    const { apiBase, apiClient } = useConfiguration()
    const { setRefreshAuthenToken, currentUserId, getCurrentUserToken, removeAuthToken } = useAppCookie();
    const localeCookie = useCookie('locale');

    const customFetch = $fetch.create({
        baseURL: apiBase as string,
        async onRequest({ options }) {
            const currentToken = await getCurrentUserToken();
            options.headers = new Headers(options.headers)
            options.headers.set('X-User-ID', currentUserId.value + '')
            options.headers.set('Accept-Apiclient', apiClient)
            options.headers.set('Accept-Language', localeCookie.value || 'en')
            if (currentToken) {
                options.headers.set('Authorization', `Bearer ${currentToken.authenticationToken}`)
            }
        },

        async onResponseError({ request, response, options }) {
            console.warn('use-api > error', response)

            const currentToken = await getCurrentUserToken();
            if (currentToken && currentToken.refreshToken && response.status === 401) {

                // if (!currentToken.refreshToken) {
                //     await handleLogout()
                //     return Promise.reject(new Error('No refresh token available'))
                // }

                if (!refreshPromise) {
                    refreshPromise = $fetch<RefreshTokenResponse>('/api/auth/refreshToken', {
                        baseURL: apiBase as string,
                        method: 'POST',
                        body: {
                            data: {
                                refreshToken: currentToken.refreshToken
                            }
                        }
                    }).then(async (res) => {
                        await setRefreshAuthenToken(res);
                        return res
                    }).catch(async (error) => {
                        await handleLogout()
                        throw error
                    }).finally(() => {
                        refreshPromise = null
                    })
                }

                try {
                    const newAccessToken = await refreshPromise

                    options.headers = new Headers(options.headers)
                    options.headers.set('Authorization', `Bearer ${newAccessToken.authenticationToken}`)

                    return $fetch(request, options as Parameters<typeof $fetch>[1])
                } catch (error) {
                    return Promise.reject(error)
                }
            }
        }
    })

    const handleLogout = async () => {
        await removeAuthToken();
        refreshPromise = null

        if (import.meta.client) {
            await navigateTo('/auth/login')
        }
    }

    return customFetch
}