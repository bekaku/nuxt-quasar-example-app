import { AppUser } from "~/types/models"

export default defineEventHandler(async (event): Promise<AppUser> => {
    return {
        id: 1,
        email: 'admin@mydomain.com',
        username: 'admin',
        token: null,
        fcmToken: null,
        avatar: {
            image: 'https://i.pravatar.cc/450',
            thumbnail: 'https://i.pravatar.cc/128'
        },
        cover: {
            image: 'https://images.unsplash.com/photo-1741568032886-18d3f2a694c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            thumbnail: 'https://images.unsplash.com/photo-1741568032886-18d3f2a694c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
        },
        active: true,
        selectedRoles: [
            1
        ],
        defaultLocale: 'th',
        permissions: [
            'api_client_view',
            'api_client_manage',
            'permission_list',
            'permission_view',
            'permission_manage',
            'role_list',
            'role_view',
            'role_manage',
            'user_list',
            'user_view',
            'user_manage',
            'file_manager_list',
            'file_manager_view',
            'file_manager_manage',
            'backend_login'
        ]
    }
})