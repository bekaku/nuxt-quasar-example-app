import type {
  AccessToken,
  AppUser,
  UserPersonalEditRequest,
  UserChangePasswordRequest
} from '@/types/models';
import type { AppLocale, IApiListResponse, LoginedProfileItem, RefreshTokenRequest, RefreshTokenResponse, ResponseMessage } from '~/types/common';
export default () => {
  const { callAxios } = useAxios();

  const findAll = async (q: string): Promise<IApiListResponse<AppUser> | null> => {
    return await callAxios<IApiListResponse<AppUser>>({
      API: `/api/appUser${q}`,
      method: 'GET',
    });
  };
  const findCurrentUserData = async (): Promise<AppUser | null> => {
    return await callAxios<AppUser>({
      API: '/api/appUser/currentUserData',
      method: 'GET',
    });
  };
  const updateUserAvatar = async (
    fileManagerId: number | string
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/appUser/updateUserAvatar?fileManagerId=${fileManagerId}`,
      method: 'PUT',
    });
  };
  const updateUserCover = async (
    fileManagerId: number | string
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/appUser/updateUserCover?fileManagerId=${fileManagerId}`,
      method: 'PUT',
    });
  };
  const updateDefaultLocale = async (locale: AppLocale): Promise<AppUser | null> => {
    return await callAxios<AppUser>({
      API: `/api/appUser/updateDefaultLocale?locale=${locale}`,
      method: 'PUT',
    });
  };
  const selfUpdatePassword = async (
    req: UserChangePasswordRequest
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: '/api/appUser/selfUpdatePassword',
      method: 'PUT',
      body: {
        userChangePasswordRequest: req
      },
    });
  };
  const updateUserPassword = async (
    req: UserChangePasswordRequest,
    userId: number | string
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/appUser/updateUserPassword/${userId}`,
      method: 'PUT',
      body: {
        userChangePasswordRequest: req
      },
    });
  };
  const currentAuthSession = async (q: string): Promise<AccessToken[] | null> => {
    return await callAxios<AccessToken[]>({
      API: `/api/appUser/currentAuthSession${q}`,
      method: 'GET',
    });
  };

  const updatePersonalData = async (
    req: UserPersonalEditRequest
  ): Promise<ResponseMessage | null> => {

    // return await callAxios<ResponseMessage>({
    //   API: '/api/appUser/updatePersonalData',
    //   method: 'PUT',
    //   body: {
    //     appUser: req,
    //   },
    // });
    console.log('updatePersonalData', req);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, 1500);
    })
  };
  // const updatePersonalData = async (
  //   req: UserPersonalEditRequest
  // ): Promise<ResponseMessage | null> => {
  //   return await callAxios<ResponseMessage>({
  //     API: '/api/appUser/updatePersonalData',
  //     method: 'PUT',
  //     body: {
  //       appUser: req,
  //     },
  //   });
  // };
  const updateEmail = async (
    req: UserPersonalEditRequest
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: '/api/appUser/updateEmail',
      method: 'PUT',
      body: {
        appUser: req,
      },
    });
  };

  const findLoginedProfile = async (
    refreshToken: RefreshTokenRequest
  ): Promise<LoginedProfileItem | null> => {
    return await callAxios<LoginedProfileItem>({
      API: '/api/appUser/findLoginedProfile',
      method: 'POST',
      body: {
        refreshToken
      },
    });
  };
  const verifyUserByEmailOrUsername = async (
    userNameOrEmail: string
  ): Promise<RefreshTokenResponse | null> => {
    return await callAxios<RefreshTokenResponse>({
      API: '/api/appUser/verifyUserByEmailOrUsername',
      method: 'POST',
      body: {
        emailOrUsername: {
          emailOrUsername: userNameOrEmail
        }
      },
    });
  };
  return {
    findCurrentUserData,
    updateUserAvatar,
    updateUserCover,
    selfUpdatePassword,
    currentAuthSession,
    updateUserPassword,
    updateDefaultLocale,
    updatePersonalData,
    updateEmail,
    findAll,
    findLoginedProfile,
    verifyUserByEmailOrUsername
  };
};
