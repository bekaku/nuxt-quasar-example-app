import type {  Permission } from '~/types/models';
import type { IAcl, IApiListResponse } from '~/types/common';
export default () => {
  const { callAxios } = useAxios();
  const userAcl = async (getMenuList = 0): Promise<IAcl | null> => {
    return await callAxios<IAcl | null>({
      API: `/api/permission/userAcl?getMenuList=${getMenuList}`,
      method: 'GET',
    });
  };

  const findAll = async (q: string): Promise<IApiListResponse<Permission> | null> => {
    return await callAxios<IApiListResponse<Permission>>({
      API: `/api/permission${q}`,
      method: 'GET',
    });
  };
  const findAllPermission = async (): Promise<Permission[] | null> => {
    return await callAxios<Permission[]>({
      API: '/api/permission/findAllPermission',
      method: 'GET',
    });
  };

  return {
    findAll,
    userAcl,
    findAllPermission,
  };
};
