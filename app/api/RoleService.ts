// move this file to /app/api 
import type { Role } from '~/types/models';
import type { ResponseMessage, IApiListResponse } from '~/types/common';
export default () => {
  const { callAxios } = useAxios();
  const findAll = async (q: string): Promise<IApiListResponse<Role> | null> => {
    return await callAxios<IApiListResponse<Role>>({
      API: `/api/role${q}`,
      method: 'GET',
    });
  };
  const findById = async (id: number): Promise<Role | null> => {
    return await callAxios<Role>({
      API: `/api/role/${id}`,
      method: 'GET',
    });
  };
  const crudCreate = async (request: Role): Promise<Role | null> => {
    return await callAxios<Role>({
      API: '/api/role',
      method: 'POST',
      body: {
        role: request,
      },
    });
  };
  const crudUpdate = async (id: number, request: Role): Promise<Role | null> => {
    return await callAxios<Role>({
      API: `/api/role/${id}`,
      method: 'PUT',
      body: {
        role: request,
      },
    });
  };
  const deleteById = async (id: number): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/role/${id}`,
      method: 'DELETE',
    });
  };
  const findAllBackendRole = async (): Promise<Role[] | null> => {
    return await callAxios<Role[]>({
      API: '/api/role/findAllBackend',
      method: 'GET',
    });
  };
  return {
    findAll,
    findById,
    crudCreate,
    crudUpdate,
    deleteById,
    findAllBackendRole
  };
};
