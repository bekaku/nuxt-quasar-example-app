// move this file to /app/api 
import type { AppRole } from '~/types/models';
import type { ResponseMessage, ApiResponse } from '~/types/common';
export default () => {
  const { callAxios } = useAxios();
  const findAll = async (q: string): Promise<ApiResponse<AppRole> | null> => {
    return await callAxios<ApiResponse<AppRole>>({
      API: `/api/appRole${q}`,
      method: 'GET',
    });
  };
  const findById = async (id: number): Promise<AppRole | null> => {
    return await callAxios<AppRole>({
      API: `/api/appRole/${id}`,
      method: 'GET',
    });
  };
  const crudCreate = async (request: AppRole): Promise<AppRole | null> => {
    return await callAxios<AppRole>({
      API: '/api/appRole',
      method: 'POST',
      body: {
        appUser: request,
      },
    });
  };
  const crudUpdate = async (id: number, request: AppRole): Promise<AppRole | null> => {
    return await callAxios<AppRole>({
      API: `/api/appRole/${id}`,
      method: 'PUT',
      body: {
        appUser: request,
      },
    });
  };
  const deleteById = async (id: number): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/appRole/${id}`,
      method: 'DELETE',
    });
  };
  const findAllPermissions = async (): Promise<AppRole[] | null> => {
    return await callAxios<AppRole[]>({
      API: '/api/appRole/findAll',
      method: 'GET',
    });
  };
  return {
    findAll,
    findById,
    crudCreate,
    crudUpdate,
    deleteById,
    findAllPermissions
  };
};
