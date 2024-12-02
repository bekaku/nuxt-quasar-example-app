import { biFolder, biGear, biHouseDoor, biPeople, biPerson, biPersonBadge, biShieldCheck } from '@quasar/extras/bootstrap-icons';
import type { IMenu } from '~/types/common';

export const appNavs: IMenu[] = [
    {
        header: '',
        pages: [
            {
                icon: biHouseDoor,
                color: 'info',
                iconText: '',
                translate: true,
                title: 'nav.dashboard',
                to: '/',
                permission: 'backend_login',
                noActiveLink: true
            }
        ]
    },
    {
        header: 'nav.developers',
        pages: [
            {
                color: 'red',
                title: 'nav.systemData',
                icon: biGear,
                iconText: '',
                items: [
                    {
                        'title': 'model_permission',
                        'icon': biShieldCheck,
                        'to': '/permission',
                        'permission': 'permission_list'
                    }
                ]
            }
        ]
    },
    {
        header: 'nav.forAdmin',
        pages: [
            {
                title: 'nav.userData',
                icon: biPersonBadge,
                color: 'yellow darken-4',
                items: [
                    {
                        title: 'nav.userRole',
                        icon: biPeople,
                        to: '/role',
                        permission: 'role_list'
                    },
                    {
                        title: 'nav.appUser',
                        icon: biPerson,
                        to: '/user',
                        permission: 'user_list'
                    }
                ]
            }
        ]
    },
    {
        border: false,
        header: 'nav.more',
        pages: [
            {
                title: 'model_files_manager',
                icon: biFolder,
                to: '/myFiles?_id=root',
                permission: 'file_manager_manage'
            }
        ]
    }
]