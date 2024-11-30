import type { LoginRequest, RefreshTokenResponse } from '~/types/common';
import AuthenService from '~/api/AuthenService';
export const useAuth = () => {
    const { singin: signinToServer, singoutToServer } = AuthenService();
    const authenStore = useAuthenStore();
    const { appLoading, appConfirm, appNavigateTo } = useBase();
    const { t } = useLang();

    const singin = async (req: LoginRequest) => {

        const response = await signinToServer({
            emailOrUsername: req.emailOrUsername,
            password: req.password,
            loginFrom: 'WEB',
            deviceId: req.deviceId,
        });
        if (response && response.authenticationToken) {
            await authenStore.setAuthenCookie(response);
            appNavigateTo('/', { replace: true })
        }
        return new Promise((resolve) => resolve(true));
    }
    const logout = async () => {
        const conf = await appConfirm(t('app.monogram'), t('helper.logoutConfirm'));
        if (conf) {
            appLoading();
            await singoutToServer({
                refreshToken: authenStore.refreshToken,
                email: authenStore?.auth?.email,
            });

            await authenStore.onLogout();
            appLoading(false);
            appNavigateTo('/auth/login', { replace: true })
        }
        return new Promise((resolve) => resolve(true));
    };
    return {
        singin,
        logout,
    }
}