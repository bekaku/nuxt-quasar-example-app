import AuthenService from '~/api/AuthenService';
import type { LoginRequest, RefreshTokenResponse } from '~/types/common';
export const useAuth = () => {
    const { singin: signinToServer, singoutToServer } = AuthenService();
    const authenStore = useAuthenStore();
    const { appLoading, appConfirm, appNavigateTo } = useBase();
    const { t } = useLang();
    const { setAuthenToken, removeAuthToken, getCurrentUserToken, switchUser } = useAppCookie();
    const { getDeviceId } = useAppDevice()
    const signin = async (req: LoginRequest): Promise<RefreshTokenResponse | null> => {
        const deviceId = await getDeviceId()
        const response = await signinToServer({
            emailOrUsername: req.emailOrUsername,
            password: req.password,
            loginFrom: 'WEB',
            deviceId: deviceId,
        });
        if (response && response.authenticationToken) {
            await setAuthenToken(response);
            // appNavigateTo('/', { replace: true })
            // window.location.replace('/');
        }
        return new Promise((resolve) => {
            resolve(response);
        });
    }
    const signout = async () => {
        const conf = await appConfirm(t('app.monogram'), t('helper.logoutConfirm'));
        if (conf) {
            appLoading();
            const currentToken = await getCurrentUserToken();
            await singoutToServer({
                refreshToken: currentToken?.refreshToken,
            });
            await removeAuthToken();
            await authenStore.onLogout();
            appLoading(false);
            appNavigateTo('/auth/login', { replace: true })
        }
        return new Promise((resolve) => resolve(true));
    };
    const onSwithUser = async (userId: number) => {
        if (!userId) {
            return;
        }
        await switchUser(userId)
    }
    return {
        signin,
        signout,
        onSwithUser
    }
}