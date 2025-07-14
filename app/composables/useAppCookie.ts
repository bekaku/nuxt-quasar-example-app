import type { CookieItem, RefreshTokenResponse } from "~/types/common";
// import { parse } from 'cookie'
// import { serialize } from 'cookie'
// import { appendResponseHeader, setCookie } from 'h3'
export const useAppCookie = () => {
    const config = useRuntimeConfig()
    // const event = useRequestEvent();
    const headers = useRequestHeaders(['cookie'])
    const isServerMode = import.meta.server;
    const jwtToken = useCookie<string | null>(config.public.jwtKeyName, {
        expires: addDateByDays(config.public.jwtAges),
        path: '/',
        sameSite: 'lax',
        secure: !import.meta.dev
    },)
    const refreshToken = useCookie<string | null>(config.public.refreshJwtKeyName, {
        expires: addDateByDays(config.public.jwtAges),
        path: '/',
        sameSite: 'strict',
        secure: !import.meta.dev
    },)
    const currentUserId = useCookie<number | null>(config.public.currentUserKeyName, {
        expires: addDateByDays(config.public.jwtAges),
        path: '/',
        sameSite: 'lax',
        secure: !import.meta.dev
    },)

    const currentUserJwt = useCookie<string | null>(`${config.public.jwtKeyName}_${currentUserId.value}`, {
        expires: addDateByDays(config.public.jwtAges),
        path: '/',
        sameSite: 'lax',
        secure: !import.meta.dev
    });
    const currentUserJwtRefresh = useCookie<string | null>(`${config.public.refreshJwtKeyName}_${currentUserId.value}`, {
        expires: addDateByDays(config.public.jwtAges),
        path: '/',
        sameSite: 'strict',
        secure: !import.meta.dev
    });
    const setRefreshAuthenToken = (authResponse: RefreshTokenResponse) => {
        if (!authResponse || !authResponse.userId) {
            return new Promise((resolve) => resolve(false));
        }
        currentUserJwt.value = authResponse.authenticationToken;
        currentUserJwtRefresh.value = authResponse.refreshToken;
    }
    const setAuthenToken = (authResponse: RefreshTokenResponse) => {
        if (!authResponse || !authResponse.userId || !authResponse.authenticationToken || !authResponse.authenticationToken) {
            return new Promise((resolve) => resolve(false));
        }
        // if (!isServerMode) {
        return new Promise((resolve) => {
            const jwt = useCookie<string | null>(`${config.public.jwtKeyName}_${authResponse.userId}`, {
                expires: addDateByDays(config.public.jwtAges),
                path: '/',
                sameSite: 'lax',
                secure: !import.meta.dev
            },)
            const refresh = useCookie<string | null>(`${config.public.refreshJwtKeyName}_${authResponse.userId}`, {
                expires: addDateByDays(config.public.jwtAges),
                path: '/',
                sameSite: 'strict',
                secure: !import.meta.dev
            },)
            jwt.value = authResponse.authenticationToken;
            refresh.value = authResponse.refreshToken;
            currentUserId.value = authResponse.userId;
            resolve(true)
        });
        // } else {
        //     return new Promise((resolve) => {

        //         if (event) {
        //             const cookieJwt = serialize(`${config.public.jwtKeyName}_${authResponse.userId}`, authResponse.authenticationToken || '', {
        //                 path: '/',
        //                 maxAge: config.public.jwtAgesSecond,
        //                 sameSite: 'strict',
        //                 httpOnly: false,
        //                 secure: !import.meta.dev
        //             })

        //             const cookieJwtRefresh = serialize(`${config.public.refreshJwtKeyName}_${authResponse.userId}`, authResponse.refreshToken || '', {
        //                 path: '/',
        //                 maxAge: config.public.jwtAgesSecond,
        //                 sameSite: 'strict', // ← try same as above first
        //                 httpOnly: false,
        //                 secure: !import.meta.dev
        //             })

        //             const newCookies = [cookieJwt, cookieJwtRefresh]
        //             const existing = event.node.res.getHeader('Set-Cookie')

        //             const allCookies = existing
        //                 ? Array.isArray(existing)
        //                     ? [...existing, ...newCookies]
        //                     : [existing, ...newCookies]
        //                 : newCookies
        //             console.log('allCookies', allCookies)

        //             event.node.res.setHeader('Set-Cookie', allCookies as string[])
        //         }
        //         resolve(true)
        //     });
        // }
    };
    const getCurrentUserToken = async (): Promise<RefreshTokenResponse | null> => {
        if (!currentUserId.value) {
            return new Promise((resolve) => {
                resolve(null);
            });
        }
        if (!currentUserJwt.value || !currentUserJwtRefresh.value) {
            return new Promise((resolve) => {
                resolve(null);
            });
        }
        return new Promise((resolve) => {
            resolve({
                userId: currentUserId.value,
                authenticationToken: currentUserJwt.value,
                refreshToken: currentUserJwtRefresh.value,
            });
        });
    };
    const getAllJwtToken = (): Promise<CookieItem[]> => {
        if (!isServerMode) {
            return new Promise((resolve) => {
                const items =
                    document.cookie
                        .split('; ')
                        .map(cookie => cookie.split('='))
                        .filter(([key]) => key && key.startsWith(`${config.public.jwtKeyName}_`))
                        .map(([key, value]) => ({ key, value, userId: key ? Number.parseInt(key.replace(`${config.public.jwtKeyName}_`, '')) : null }));

                resolve(items);
            });
        }
        else {

            const cookieHeader = headers.cookie || ''
            if (cookieHeader) {
                return new Promise((resolve) => {
                    const items =
                        cookieHeader
                            .split('; ')
                            .map(cookie => cookie.split('='))
                            .filter(([key]) => key && key.startsWith(`${config.public.jwtKeyName}_`))
                            .map(([key, value]) => ({ key, value, userId: key ? Number.parseInt(key.replace(`${config.public.jwtKeyName}_`, '')) : null }));

                    resolve(items);
                });
            }

        }

        return new Promise((resolve) => {
            resolve([]);
        });
    }
    const getAllJwtRefreshToken = (): Promise<CookieItem[]> => {
        if (!isServerMode) {
            return new Promise((resolve) => {
                const items =
                    document.cookie
                        .split('; ')
                        .map(cookie => cookie.split('='))
                        .filter(([key]) => key && key.startsWith(`${config.public.refreshJwtKeyName}_`))
                        .map(([key, value]) => ({ key, value, userId: key ? Number.parseInt(key.replace(`${config.public.refreshJwtKeyName}_`, '')) : null }));

                resolve(items);
            });
        }
        if (isServerMode) {
            const headers = useRequestHeaders(['cookie'])
            const cookieHeader = headers.cookie || ''
            if (cookieHeader) {
                return new Promise((resolve) => {
                    const items =
                        cookieHeader
                            .split('; ')
                            .map(cookie => cookie.split('='))
                            .filter(([key]) => key && key.startsWith(`${config.public.refreshJwtKeyName}_`))
                            .map(([key, value]) => ({ key, value, userId: key ? Number.parseInt(key.replace(`${config.public.refreshJwtKeyName}_`, '')) : null }));

                    resolve(items);
                });
            }

        }

        return new Promise((resolve) => {
            resolve([]);
        });
    }
    const clearCurrentAuthenToken = (): Promise<void> => {
        return new Promise((resolve) => {
            // const jwt = useCookie<string | null>(`${config.public.jwtKeyName}_${currentUserId.value}`);
            // const refreshKey = useCookie<string | null>(`${config.public.refreshJwtKeyName}_${currentUserId.value}`);
            // jwt.value = null;
            // refreshKey.value = null;
            currentUserJwt.value = null;
            currentUserJwtRefresh.value = null;
            setTimeout(() => {
                resolve();
            }, 300)

        });


    }
    const removeAuthToken = async () => {
        console.log('removeAuthToken', currentUserId.value);
        if (!currentUserId.value) {
            return null;
        }
        await clearCurrentAuthenToken();
        // set another user
        const activeJwtCookies = await getAllJwtToken();
        const otherJwts = activeJwtCookies.filter(cookie => cookie.userId != currentUserId.value);
        if (otherJwts && otherJwts.length > 0) {
            const firstCookie = otherJwts[0]
            if (firstCookie && firstCookie.userId) {
                currentUserId.value = firstCookie.userId;
            }
        } else {
            currentUserId.value = null
        }
        return new Promise((resolve) => {
            resolve(true);
        });
    }
    const validateUserExist = async (userId: number | string): Promise<boolean> => {
        const jwtCookies = await getAllJwtToken()
        if (!jwtCookies || jwtCookies.length == 0) {
            return new Promise((resolve) => {
                resolve(false);
            });
        }
        const jwtCookie = jwtCookies.find(cookie => cookie.userId == userId);
        if (jwtCookie) {
            return new Promise((resolve) => {
                resolve(true);
            });
        }
        return new Promise((resolve) => {
            resolve(false);
        });
    }

    const switchUser = async (userId: number): Promise<boolean> => {
        if (!userId || isServerMode) {
            return new Promise((resolve) => {
                resolve(false);
            });
        }
        if (!currentUserId.value || currentUserId.value == userId) {
            return new Promise((resolve) => {
                resolve(false);
            });
        }
        // validate user exist in cookies
        const exist = await validateUserExist(userId);
        if (!exist) {
            return new Promise((resolve) => {
                resolve(false);
            });
        }
        currentUserId.value = userId;
        return new Promise((resolve) => {
            resolve(true);
        });
    }
    return {
        jwtToken,
        refreshToken,
        currentUserId,
        setAuthenToken,
        getCurrentUserToken,
        getAllJwtToken,
        getAllJwtRefreshToken,
        removeAuthToken,
        switchUser,
        currentUserJwt,
        currentUserJwtRefresh,
        setRefreshAuthenToken
    }
}