import type {
  AccessTokenDto,
  UserDto,
  UserPersonalEditRequest,
  UserChangePasswordRequest
} from '@/types/models';
import type { AppLocale, IApiListResponse, LoginedProfileItem, RefreshTokenRequest, RefreshTokenResponse, ResponseMessage } from '~/types/common';
export default () => {
  const { callAxios } = useAxios();

  const findAll = async (q: string): Promise<IApiListResponse<UserDto> | null> => {
    return await callAxios<IApiListResponse<UserDto>>({
      API: `/api/user${q}`,
      method: 'GET',
    });
  };
  const findCurrentUserData = async (): Promise<UserDto | null> => {
    return await callAxios<UserDto>({
      API: '/api/user/currentUserData',
      method: 'GET',
    });
  };
  const updateUserAvatar = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/user/updateUserAvatar?fileManagerId=${fileManagerId}`,
      method: 'PUT',
    });
  };
  const updateUserCover = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/user/updateUserCover?fileManagerId=${fileManagerId}`,
      method: 'PUT',
    });
  };
  const updateDefaultLocale = async (locale: AppLocale): Promise<UserDto | null> => {
    return await callAxios<UserDto>({
      API: `/api/user/updateDefaultLocale?locale=${locale}`,
      method: 'PUT',
    });
  };
  const selfUpdatePassword = async (
    req: UserChangePasswordRequest
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: '/api/user/selfUpdatePassword',
      method: 'PUT',
      body: {
        userChangePasswordRequest: req
      },
    });
  };
  const updateUserPassword = async (
    req: UserChangePasswordRequest,
    userId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/user/updateUserPassword/${userId}`,
      method: 'PUT',
      body: {
        userChangePasswordRequest: req
      },
    });
  };
  const currentAuthSession = async (q: string): Promise<AccessTokenDto[] | null> => {
    return await callAxios<AccessTokenDto[]>({
      API: `/api/user/currentAuthSession${q}`,
      method: 'GET',
    });
  };

  const updatePersonalData = async (
    req: UserPersonalEditRequest
  ): Promise<ResponseMessage | null> => {

    // return await callAxios<ResponseMessage>({
    //   API: '/api/user/updatePersonalData',
    //   method: 'PUT',
    //   body: {
    //     user: req,
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
  //     API: '/api/user/updatePersonalData',
  //     method: 'PUT',
  //     body: {
  //       user: req,
  //     },
  //   });
  // };
  const updateEmail = async (
    req: UserPersonalEditRequest
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: '/api/user/updateEmail',
      method: 'PUT',
      body: {
        user: req,
      },
    });
  };

  const findLoginedProfile = async (
    refreshToken: RefreshTokenRequest
  ): Promise<LoginedProfileItem | null> => {
    return await callAxios<LoginedProfileItem>({
      API: '/api/user/findLoginedProfile',
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
      API: '/api/user/verifyUserByEmailOrUsername',
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
