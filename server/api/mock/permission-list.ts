import { ApiResponse } from "~/types/common"
import { Permission } from "~/types/models"

export default defineEventHandler(async (event): Promise<ApiResponse<Permission>> => {
    return {
        dataList: [
            {
                id: 1,
                code: 'api_client_list',
                remark: null,
                description: 'Api client(List)',
                operationType: 'CRUD',
            },
            {
                id: 3,
                code: 'api_client_manage',
                remark: null,
                description: 'Api client(Manage)',
                operationType: 'CRUD',
            },
            {
                id: 2,
                code: 'api_client_view',
                remark: null,
                description: 'Api client(View)',
                operationType: 'CRUD',
            },
            {
                id: 16,
                code: 'backend_login',
                remark: null,
                description: 'Login',
                operationType: 'CRUD',
            },
            {
                id: 13,
                code: 'file_manager_list',
                remark: null,
                description: 'File(List)',
                operationType: 'CRUD',
            },
            {
                id: 15,
                code: 'file_manager_manage',
                remark: null,
                description: 'File(Manage)',
                operationType: 'CRUD',
            },
            {
                id: 14,
                code: 'file_manager_view',
                remark: null,
                description: 'File(View)',
                operationType: 'CRUD',
            },
            {
                id: 25,
                code: 'files_directory_list',
                remark: null,
                description: 'Directory(List)',
                operationType: 'CRUD',
            },
            {
                id: 27,
                code: 'files_directory_manage',
                remark: null,
                description: 'Directory(Manage)',
                operationType: 'CRUD',
            },
            {
                id: 26,
                code: 'files_directory_view',
                remark: null,
                description: 'Directory(View)',
                operationType: 'CRUD',
            },
        ],
        totalPages: 2,
        totalElements: 20,
        last: false,
    }
})