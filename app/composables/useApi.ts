import type { RefreshTokenResponse } from '~/types/common'

// เก็บตัวแปรไว้ข้างนอก Composable เพื่อแชร์สถานะให้ทุกการเรียกใช้ (กันการขอ Token ซ้ำซ้อน)
let refreshPromise: Promise<RefreshTokenResponse> | null = null

export const useApi = () => {
    const { apiBase, cdnBase, apiClient } = useConfiguration()
    const { setRefreshAuthenToken, currentUserId, getCurrentUserToken, removeAuthToken } = useAppCookie();
    const localeCookie = useCookie('locale');

    const getBaseHeaders = () => {
        return {
            'X-User-ID': currentUserId.value + '',
            'Accept-Apiclient': apiClient,
            'Accept-Language': localeCookie.value || 'en'
        }
    }

    const handleLogout = async () => {
        await removeAuthToken();
        refreshPromise = null

        if (import.meta.client) {
            await navigateTo('/auth/login')
        }
    }

    // 1. สร้าง Base Fetch ที่มีหน้าที่แค่ "แนบ Headers" อย่างเดียว (เอา onResponseError ออก)
    const baseFetch = $fetch.create({
        baseURL: apiBase as string,
        async onRequest({ options }) {
            const currentToken = await getCurrentUserToken();
            options.headers = new Headers(options.headers)
            
            const baseHeaders = getBaseHeaders();
            for (const [key, value] of Object.entries(baseHeaders)) {
                options.headers.set(key, value);
            }
            
            if (currentToken) {
                options.headers.set('Authorization', `Bearer ${currentToken.authenticationToken}`)
            }
        }
    })

    // 2. สร้างฟังก์ชัน Wrapper สำหรับใช้เรียก API พร้อมระบบดักจับ 401 และ Retry
    const customApiFetch = async <T = any>(request: Parameters<typeof $fetch>[0], options?: Parameters<typeof $fetch>[1]) => {
        try {
            // ลองยิง API รอบแรก
            return await baseFetch<T>(request, options)
        } catch (error: any) {
            // ถ้า Error เป็น 401 Unauthorized
            if (error.response?.status === 401) {
                const currentToken = await getCurrentUserToken();
                
                if (currentToken && currentToken.refreshToken) {
                    
                    // ถ้ายังไม่มีใครเริ่มขอ Token ให้เริ่มยิงขอใหม่
                    if (!refreshPromise) {
                        refreshPromise = $fetch<RefreshTokenResponse>('/api/auth/refreshToken', {
                            baseURL: apiBase as string,
                            method: 'POST',
                            headers: getBaseHeaders(), // แนบ Headers พื้นฐาน
                            body: {
                                data: {
                                    refreshToken: currentToken.refreshToken
                                }
                            }
                        }).then(async (res) => {
                            await setRefreshAuthenToken(res);
                            return res;
                        }).catch(async (err) => {
                            await handleLogout();
                            throw err;
                        }).finally(() => {
                            refreshPromise = null;
                        });
                    }

                    try {
                        // รอจนกว่าจะได้ Token ใหม่
                        const newAccessToken = await refreshPromise;
                        console.log('newAccessToken', newAccessToken)
                        
                        // เตรียม Options ใหม่เพื่อยิง API ซ้ำ
                        const retryOptions = options || {};
                        retryOptions.headers = new Headers(retryOptions.headers);
                        retryOptions.headers.set('Authorization', `Bearer ${newAccessToken.authenticationToken}`);
                        
                        // 🚀 ยิง API เดิมซ้ำ และส่งผลลัพธ์กลับให้ Component !
                        return await baseFetch<T>(request, retryOptions);
                    } catch (retryError) {
                        return Promise.reject(retryError);
                    }
                } else {
                    // ถ้าไม่มี Refresh Token ให้ Logout เลย
                    await handleLogout();
                }
            }
            
            // ถ้าเป็น Error อื่นๆ ที่ไม่ใช่ 401 ก็โยนกลับไปปกติ
            return Promise.reject(error);
        }
    }

    // 3. Return ตัว Wrapper ออกไปให้ Component ใช้งาน
    return customApiFetch;
}