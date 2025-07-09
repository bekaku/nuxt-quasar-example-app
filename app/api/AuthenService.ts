import type {
  LoginRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  AppException, ResponseMessage,
  ForgotPasswordRequest
} from '~/types/common';
import type { AxiosResponse } from 'axios';
export default () => {
  const { callAxios, callAxiosProcess } = useAxios();
  const singin = async (
    loginRequest: LoginRequest
  ): Promise<RefreshTokenResponse | null> => {
    return await callAxios<RefreshTokenResponse>({
      API: '/api/auth/login',
      method: 'POST',
      body: {
        user: loginRequest
      },
    });
  };
  const singoutToServer = async (
    req: RefreshTokenRequest
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: '/api/auth/logout',
      method: 'POST',
      body: {
        refreshToken: req
      },
    });
  };
  const refreshToken = async (
    req: RefreshTokenRequest
  ): Promise<RefreshTokenResponse | null> => {
    return await callAxios<RefreshTokenResponse>({
      API: '/api/auth/refreshToken',
      method: 'POST',
      body: {
        refreshToken: req
      },
    });
  };
  const removeAccessTokenSession = async (
    id: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/user/removeAccessTokenSession?id=${id}`,
      method: 'DELETE',
    });
  };
  //Forgot password
  const requestVerifyCodeToResetPwd = async (
    req: ForgotPasswordRequest
  ): Promise<AxiosResponse<ResponseMessage | AppException>> => {
    return await callAxiosProcess<ResponseMessage | AppException>({
      API: '/api/auth/requestVerifyCodeToResetPwd',
      method: 'POST',
      body: {
        forgotPasswordRequest: req
      },
    });
  };
  const sendVerifyCodeToResetPwd = async (
    req: ForgotPasswordRequest
  ): Promise<AxiosResponse<ResponseMessage | AppException>> => {
    return await callAxiosProcess<ResponseMessage | AppException>({
      API: '/api/auth/sendVerifyCodeToResetPwd',
      method: 'POST',
      body: {
        forgotPasswordRequest: req
      },
    });
  };
  const resetPassword = async (
    req: ForgotPasswordRequest
  ): Promise<AxiosResponse<ResponseMessage | AppException>> => {
    return await callAxiosProcess<ResponseMessage | AppException>({
      API: '/api/auth/resetPassword',
      method: 'POST',
      body: {
        forgotPasswordRequest: req
      },
    });
  };
  return {
    singin,
    singoutToServer,
    refreshToken,
    removeAccessTokenSession,
    requestVerifyCodeToResetPwd,
    sendVerifyCodeToResetPwd,
    resetPassword
  };
};
