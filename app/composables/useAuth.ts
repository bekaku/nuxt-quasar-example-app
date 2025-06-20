import AuthenService from '~/api/AuthenService';
import type { LoginRequest } from '~/types/common';
export const useAuth = () => {
    const { singin: signinToServer, singoutToServer } = AuthenService();
    const authenStore = useAuthenStore();
    const { appLoading, appConfirm, appNavigateTo } = useBase();
    const { t } = useLang();

    const signin = async (req: LoginRequest) => {

        const response = await signinToServer({
            emailOrUsername: req.emailOrUsername,
            password: req.password,
            loginFrom: 'WEB',
            deviceId: req.deviceId,
        });
        if (response && response.authenticationToken) {
            await authenStore.setAuthenCookie(response);
            // appNavigateTo('/', { replace: true })
            window.location.replace('/');
        }
        return new Promise((resolve) => resolve(true));
    }
    const signout = async () => {
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
        signin,
        signout,
    }
}