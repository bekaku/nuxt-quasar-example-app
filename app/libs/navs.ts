import {
    biApp,
    biArrowDownCircle,
    biArrowDownUp,
    biArrowLeftRight,
    biArrowsMove,
    biBack,
    biBrush,
    biBug,
    biCreditCard2Front,
    biCrop,
    biCursorText,
    biDatabase,
    biEmojiSmile,
    biFile,
    biFileImage,
    biFolder,
    biInputCursorText,
    biLayers,
    biLayoutSidebar,
    biMarkdown,
    biPerson,
    biSegmentedNav,
    biShieldCheck,
    biToggleOff,
    biUpload,
    biWindowFullscreen,
    biWindowSidebar
} from '@quasar/extras/bootstrap-icons';
import { mdiRobotConfused } from '@quasar/extras/mdi-v7';
import type { LabelValue } from '~/types/common';
import { login, PermissionPermission, RolePermission, UserPermission } from './permissions';
export const appNavs: LabelValue<any>[] = [
    {
        children: [
            {
                icon: { name: 'lucide:home', iconSet: 'nuxt' },
                label: 'nav.dashboard',
                to: '/',
                rbac: {
                    permissions: [login]
                }
            }
        ]
    },
    {
        label: 'nav.developers',
        children: [
            {
                label: 'nav.systemData',
                icon: { name: 'hugeicons:database-setting', iconSet: 'nuxt' },
                children: [
                    {
                        label: 'model_permission',
                         icon: { name: 'lucide:file-lock-2', iconSet: 'nuxt' },
                        to: '/permission',
                        rbac: {
                            permissions: [PermissionPermission.list]
                        }
                    }
                ]
            }
        ]
    },
    {
        label: 'nav.forAdmin',
        children: [
            {
                label: 'nav.userData',
                icon: { name: 'lucide:user-cog', iconSet: 'nuxt' },
                children: [
                    {
                        label: 'nav.userRole',
                        icon: { name: 'lucide:users', iconSet: 'nuxt' },
                        to: '/app-role',
                        rbac: {
                            permissions: [RolePermission.list]
                        }
                    },
                    {
                        label: 'nav.appUser',
                        icon: { name: 'hugeicons:user', iconSet: 'nuxt' },
                        to: '/app-user',
                        rbac: {
                            permissions: [UserPermission.list]
                        }
                    }
                ]
            }
        ]
    },
    {
        label: 'nav.more',
        children: [
            {
                label: 'drive.title',
                icon: { name: biFolder },
                to: '/my-drive/folder/0',
                rbac: {
                    permissions: ['file_manager_manage']
                }
            }
        ]
    }
];

export const additionalMenu: LabelValue<any>[] = [
    {
        avatar: { src: 'https://cdn.quasar.dev/img/avatar3.jpg' },
        label: 'My profile',
        translateLabel: false,
    },
    {
        border: true,
        translateLabel: false,
        label: 'Example',
        children: [
            {
                icon: { name: 'hugeicons:function', iconSet : 'nuxt' },
                label: 'Composables',
                translateLabel: false,
                children: [
                    {
                        icon: { name: biFile },
                        label: 'useBase',
                        translateLabel: false,
                        to: '/example/composables/use-base'
                    },
                    {
                        icon: { name: 'hugeicons:database-import', iconSet: 'nuxt' },
                        label: 'usePageFetch',
                        translateLabel: false,
                        to: '/example/composables/use-pagefecth'
                    },
                ]
            },
            {
                icon: { name: biBrush },
                label: 'Components',
                translateLabel: false,
                children: [
                    {
                        icon: {
                            name: 'lucide:circle-user',
                            iconSet: 'nuxt'
                        },
                        label: 'Avatar',
                        translateLabel: false,
                        to: '/example/ui/avatar'
                    },
                    {
                        icon: { name: biApp },
                        label: 'Button',
                        translateLabel: false,
                        to: '/example/ui/button'
                    },
                    {
                        icon: { name: biCreditCard2Front },
                        label: 'Card',
                        translateLabel: false,
                        to: '/example/ui/card'
                    },
                    {
                        icon: {
                            name: 'lucide:calendar-range',
                            iconSet: 'nuxt'
                        },
                        label: 'Date-time picker',
                        translateLabel: false,
                        to: '/example/ui/date-picker'
                    },
                    {
                        icon: { name: biBack },
                        label: 'Dialog',
                        description: 'dialog, popconfirm, menu',
                        translateLabel: false,
                        to: '/example/ui/dialog'
                    },
                    {
                        icon: { name: biUpload },
                        label: 'File picker',
                        translateLabel: false,
                        to: '/example/ui/file-picker'
                    },
                    {
                        icon: { name: biInputCursorText },
                        label: 'Form Input',
                        description: 'Form, Input, Textarea',
                        translateLabel: false,
                        to: '/example/ui/input-text'
                    },
                    {
                        icon: { name: biLayoutSidebar },
                        label: 'Menu',
                        description: 'Dropdown, Menu, Breadcrumb',
                        translateLabel: false,
                        to: '/example/ui/menu'
                    },
                    {
                        icon: {
                            name: 'lucide:chevrons-up-down',
                            iconSet: 'nuxt'
                        },
                        label: 'Select',
                        description: 'Select, Command palette',
                        translateLabel: false,
                        to: '/example/ui/select'
                    },
                    {
                        icon: { name: biSegmentedNav },
                        label: 'Tabs',
                        translateLabel: false,
                        to: '/example/ui/tabs'
                    },
                    {
                        icon: { name: biToggleOff },
                        description: 'Toggle,Options,Radios',
                        label: 'Options group',
                        translateLabel: false,
                        to: '/example/ui/toggle'
                    },
                    {
                        icon: { name: biLayers },
                        label: 'Transitions',
                        translateLabel: false,
                        to: '/example/ui/transitions'
                    },
                    {
                        icon: { name: biPerson },
                        label: 'User',
                        translateLabel: false,
                        to: '/example/ui/user'
                    },
                ],
            },
            {
                icon: { name: 'hugeicons:presentation-bar-chart-02', iconSet: 'nuxt' },
                label: 'Charts',
                translateLabel: false,
                to: '/example/charts'
            },
            {
                icon: { name: 'hugeicons:bubble-chat', iconSet: 'nuxt' },
                label: 'Chat',
                translateLabel: false,
                to: '/chats'
            },
            {
                icon: { name: 'hugeicons:edit-table', iconSet: 'nuxt' },
                label: 'Crud table',
                translateLabel: false,
                to: '/example/crud-table'
            },
            {
                icon: { name: biCursorText },
                label: 'Content text',
                description: 'Display user input',
                translateLabel: false,
                to: '/example/content-text'
            },
            {
                icon: { name: biArrowsMove },
                label: 'Darg and Drop',
                translateLabel: false,
                to: '/example/drag-drop'
            },
            {
                icon: { name: biEmojiSmile },
                label: 'Icon/Emoji picker',
                description: 'Emoji and Icon',
                translateLabel: false,
                to: '/example/emoji-picker'
            },
            {
                icon: { name: biDatabase },
                label: 'Fetch data',
                translateLabel: false,
                to: '/example/fetch-data'
            },
            {
                icon: { name: 'hugeicons:image-crop', iconSet: 'nuxt' },
                label: 'Image cropper',
                translateLabel: false,
                to: '/example/image-cropper'
            },
            {
                icon: { name: 'hugeicons:image-03', iconSet: 'nuxt' },
                label: 'Image/Pdf View',
                translateLabel: false,
                to: '/example/image-view'
            },
            {
                icon: { name: biArrowDownCircle },
                label: 'Infinite scroll',
                translateLabel: false,
                to: '/example/infinite-scroll'
            },
            {
                icon: { name: biWindowFullscreen },
                label: 'Login 2',
                translateLabel: false,
                to: '/auth/login-v1'
            },
            {
                icon: { name: biWindowFullscreen },
                label: 'Login 3',
                translateLabel: false,
                to: '/auth/login-v2'
            },
            {
                icon: { name: biMarkdown },
                label: 'Markdown editor',
                translateLabel: false,
                to: '/example/markdown-editor'
            },
            {
                icon: { name: biFile },
                label: 'Result',
                description: 'Error, Success, 404, Alert',
                translateLabel: false,
                to: '/example/result'
            },
            {
                icon: { name: biArrowLeftRight },
                label: 'Swiper',
                translateLabel: false,
                to: '/example/swiper'
            },
            {
                icon: { name: biWindowSidebar },
                label: 'Social feed',
                translateLabel: false,
                to: '/feed'
            },
            {
                icon: { name: biArrowDownUp },
                label: 'Virtual scroller',
                translateLabel: false,
                to: '/example/virtual-scroller'
            },
            {
                icon: { name: biBug },
                label: 'Test page',
                translateLabel: false,
                to: '/test'
            },
            {
                icon: { name: mdiRobotConfused },
                label: 'Error page',
                translateLabel: false,
                to: '/permission/duplicate/0'
            },
            {
                icon: { name: biFile },
                label: 'Starter page',
                translateLabel: false,
                to: '/blank'
            },
            {
                icon: { name: mdiRobotConfused },
                label: '404 page',
                translateLabel: false,
                to: '/notfound'
            },
        ]
    },
];