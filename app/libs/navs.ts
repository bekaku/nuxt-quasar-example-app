import {
    biApp,
    biArrowDownUp,
    biArrowLeftRight,
    biArrowsMove,
    biBack,
    biBrush,
    biBug,
    biCalendar,
    biChatDots,
    biChevronExpand,
    biChevronRight,
    biCrop,
    biCursorText,
    biDatabase,
    biEmojiSmile,
    biFile,
    biFileEarmark,
    biFileImage,
    biFolder,
    biGear, biHouseDoor,
    biInputCursorText,
    biList,
    biMarkdown,
    biPeople, biPerson, biPersonBadge,
    biPersonCircle,
    biPieChart,
    biShieldCheck,
    biToggleOff,
    biUpload,
    biWindowFullscreen,
    biWindowSidebar
} from '@quasar/extras/bootstrap-icons';
import { mdiRobotConfused } from '@quasar/extras/mdi-v7';
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
];

export const additionalMenu: IMenu[] = [
    {
        border: true,
        translate: false,
        header: 'Example',
        pages: [
            {
                icon: biList,
                title: 'Composables',
                translate: false,
                items: [
                    {
                        icon: biChevronRight,
                        permission: '',
                        title: 'useBase',
                        translate: false,
                        to: '/example/composables/use-base'
                    },
                    {
                        icon: biFileEarmark,
                        permission: '',
                        title: 'usePageFetch',
                        translate: false,
                        to: '/example/composables/use-pagefecth'
                    },
                ]
            },
            {
                icon: biBrush,
                title: 'Quasar UI',
                translate: false,
                items: [
                    {
                        icon: biPersonCircle,
                        permission: '',
                        title: 'Avatar',
                        translate: false,
                        to: '/example/ui/avatar'
                    },
                    {
                        icon: biApp,
                        permission: '',
                        title: 'Button',
                        translate: false,
                        to: '/example/ui/button'
                    },
                    {
                        icon: biCalendar,
                        permission: '',
                        title: 'Date-time picker',
                        translate: false,
                        to: '/example/ui/date-picker'
                    },
                    {
                        icon: biBack,
                        permission: '',
                        title: 'Dialog',
                        caption: 'dialog, popconfirm, menu',
                        translate: false,
                        to: '/example/ui/dialog'
                    },
                    {
                        icon: biList,
                        permission: '',
                        title: 'Dropdown menu',
                        translate: false,
                        to: '/example/ui/dropdown-menu'
                    },
                    {
                        icon: biUpload,
                        permission: '',
                        title: 'File picker',
                        translate: false,
                        to: '/example/ui/file-picker'
                    },
                    {
                        icon: biInputCursorText,
                        permission: '',
                        title: 'Form Input',
                        caption:'Form, Input, Textarea',
                        translate: false,
                        to: '/example/ui/input-text'
                    },
                    {
                        icon: biChevronExpand,
                        permission: '',
                        title: 'Select',
                        caption : 'Select, Command palette',
                        translate: false,
                        to: '/example/ui/select'
                    },
                    {
                        icon: biToggleOff,
                        permission: '',
                        caption:'Toggle,Options,Radios',
                        title: 'Options group',
                        translate: false,
                        to: '/example/ui/toggle'
                    },
                ],
            },
            {
                icon: biPieChart,
                permission: '',
                title: 'Charts',
                translate: false,
                to: '/example/charts'
            },
            {
                icon: biChatDots,
                permission: '',
                title: 'Chat',
                translate: false,
                to: '/chats'
            },
            {
                icon: biCursorText,
                permission: '',
                title: 'Content text',
                caption: 'Display user input',
                translate: false,
                to: '/example/content-text'
            },
            {
                icon: biArrowsMove,
                permission: '',
                title: 'Darg and Drop',
                translate: false,
                to: '/example/drag-drop'
            },
            {
                icon: biEmojiSmile,
                permission: '',
                title: 'Icon/Emoji picker',
                caption:'Emoji and Icon',
                translate: false,
                to: '/example/emoji-picker'
            },
            {
                icon: biDatabase,
                permission: '',
                title: 'Fetch data',
                translate: false,
                to: '/example/fetch-data'
            },
            {
                icon: biCrop,
                permission: '',
                title: 'Image cropper',
                translate: false,
                to: '/example/image-cropper'
            },
            {
                icon: biFileImage,
                permission: '',
                title: 'Image/Pdf View',
                translate: false,
                to: '/example/image-view'
            },
            {
                icon: biWindowFullscreen,
                permission: '',
                title: 'Login 2',
                translate: false,
                to: '/auth/login-v1'
            },
            {
                icon: biWindowFullscreen,
                permission: '',
                title: 'Login 3',
                translate: false,
                to: '/auth/login-v2'
            },
            {
                icon: biMarkdown,
                permission: '',
                title: 'Markdown editor',
                translate: false,
                to: '/example/markdown-editor'
            },
            {
                icon: biFile,
                permission: '',
                title: 'Result',
                caption: 'Error, Success, 404',
                translate: false,
                to: '/example/result'
            },
            {
                icon: biArrowLeftRight,
                permission: '',
                title: 'Swiper',
                translate: false,
                to: '/example/swiper'
            },
            {
                icon: biWindowSidebar,
                permission: '',
                title: 'Social feed',
                translate: false,
                to: '/feed'
            },
            {
                icon: biArrowDownUp,
                permission: '',
                title: 'Virtual scroller',
                translate: false,
                to: '/example/virtual-scroller'
            },
            {
                icon: biBug,
                permission: '',
                title: 'Test page',
                translate: false,
                to: '/test'
            },
            {
                icon: mdiRobotConfused,
                permission: '',
                title: 'Error page',
                translate: false,
                to: '/permission/duplicate/0'
            },
            {
                icon: mdiRobotConfused,
                permission: '',
                title: '404 page',
                translate: false,
                to: '/notfound'
            },
        ]
    }
];