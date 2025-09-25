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
                icon: { name: 'lucide:settings', iconSet: 'nuxt' },
                children: [
                    {
                        label: 'model_permission',
                        icon: { name: 'lucide:lock-keyhole', iconSet: 'nuxt' },
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
                        icon: { name: 'lucide:user', iconSet: 'nuxt' },
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
                icon: { name: 'bi:folder', iconSet: 'nuxt' },
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
                icon: { name: 'lucide:square-function', iconSet: 'nuxt' },
                label: 'Composables',
                translateLabel: false,
                children: [
                    {
                        icon: { name: 'lucide:file', iconSet: 'nuxt' },
                        label: 'useBase',
                        translateLabel: false,
                        to: '/example/composables/use-base'
                    },
                    {
                        icon: { name: 'lucide:import', iconSet: 'nuxt' },
                        label: 'usePageFetch',
                        translateLabel: false,
                        to: '/example/composables/use-pagefecth'
                    },
                ]
            },
            {
                icon: { name: 'lucide:paintbrush-vertical', iconSet: 'nuxt' },
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
                        icon: { name: 'lucide:square', iconSet: 'nuxt' },
                        label: 'Button',
                        translateLabel: false,
                        to: '/example/ui/button'
                    },
                    {
                        icon: { name: 'lucide:credit-card', iconSet: 'nuxt' },
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
                        icon: { name: 'lucide:copy', iconSet: 'nuxt' },
                        label: 'Dialog',
                        description: 'dialog, popconfirm, menu',
                        translateLabel: false,
                        to: '/example/ui/dialog'
                    },
                    {
                        icon: { name: 'lucide:upload', iconSet: 'nuxt' },
                        label: 'File upload',
                        translateLabel: false,
                        to: '/example/ui/file-picker'
                    },
                    {
                        icon: { name: 'lucide:text-cursor-input', iconSet: 'nuxt' },
                        label: 'Form Input',
                        description: 'Form, Input, Textarea',
                        translateLabel: false,
                        to: '/example/ui/input-text'
                    },
                    {
                        icon: { name: 'lucide:menu', iconSet: 'nuxt' },
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
                        icon: { name: 'bi:segmented-nav', iconSet: 'nuxt' },
                        label: 'Tabs',
                        translateLabel: false,
                        to: '/example/ui/tabs'
                    },
                    {
                        icon: { name: 'lucide:toggle-left', iconSet: 'nuxt' },
                        description: 'Toggle,Options,Radios',
                        label: 'Options group',
                        translateLabel: false,
                        to: '/example/ui/toggle'
                    },
                    {
                        icon: { name: 'bi:layers', iconSet: 'nuxt' },
                        label: 'Transitions',
                        translateLabel: false,
                        to: '/example/ui/transitions'
                    },
                    {
                        icon: { name: 'lucide:square-user', iconSet: 'nuxt' },
                        label: 'User',
                        translateLabel: false,
                        to: '/example/ui/user'
                    },
                ],
            },
            {
                icon: { name: 'lucide:chart-line', iconSet: 'nuxt' },
                label: 'Charts',
                translateLabel: false,
                to: '/example/charts'
            },
            {
                icon: { name: 'lucide:message-circle-more', iconSet: 'nuxt' },
                label: 'Chat',
                translateLabel: false,
                to: '/chats'
            },
            {
                icon: { name: 'lucide:table-properties', iconSet: 'nuxt' },
                label: 'Crud table',
                translateLabel: false,
                to: '/example/crud-table'
            },
            {
                icon: { name: 'lucide:receipt-text', iconSet: 'nuxt' },
                label: 'Content text',
                description: 'Display user input',
                translateLabel: false,
                to: '/example/content-text'
            },
            {
                icon: { name: 'lucide:move', iconSet: 'nuxt' },
                label: 'Darg and Drop',
                translateLabel: false,
                to: '/example/drag-drop'
            },
            {
                icon: { name: 'lucide:smile', iconSet: 'nuxt' },
                label: 'Icon/Emoji picker',
                description: 'Emoji and Icon',
                translateLabel: false,
                to: '/example/emoji-picker'
            },
            {
                icon: { name: 'lucide:file-down', iconSet: 'nuxt' },
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
                icon: { name: 'lucide:image-play', iconSet: 'nuxt' },
                label: 'Media viewer',
                description:'Image, Pdf, Video viewer',
                translateLabel: false,
                to: '/example/image-view'
            },
            {
                icon: { name: 'lucide:download'},
                label: 'Download files',
                description:'Download large files xample',
                translateLabel: false,
                to: '/example/download-files'
            },
            {
                icon: { name: 'lucide:circle-arrow-down', iconSet: 'nuxt' },
                label: 'Infinite scroll',
                translateLabel: false,
                to: '/example/infinite-scroll'
            },
            {
                icon: { name: 'lucide:log-in', iconSet: 'nuxt' },
                label: 'Login 2',
                translateLabel: false,
                to: '/auth/login-v1'
            },
            {
                icon: { name: 'lucide:log-in', iconSet: 'nuxt' },
                label: 'Login 3',
                translateLabel: false,
                to: '/auth/login-v2'
            },
            {
                icon: { name: 'bi:markdown', iconSet: 'nuxt' },
                label: 'Markdown editor',
                translateLabel: false,
                to: '/example/markdown-editor'
            },
            {
                icon: { name: 'lucide:circle-alert', iconSet: 'nuxt' },
                label: 'Alert',
                description: 'Error, Success, 404, Alert',
                translateLabel: false,
                to: '/example/result'
            },
            {
                icon: { name: 'lucide:chevrons-left-right-ellipsis', iconSet: 'nuxt' },
                label: 'Swiper',
                translateLabel: false,
                to: '/example/swiper'
            },
            {
                icon: { name: 'lucide:newspaper', iconSet: 'nuxt' },
                label: 'Social feed',
                translateLabel: false,
                to: '/feed'
            },
            {
                icon: { name: 'lucide:circle-arrow-down', iconSet: 'nuxt' },
                label: 'Virtual scroller',
                translateLabel: false,
                to: '/example/virtual-scroller'
            },
            {
                icon: { name: 'lucide:bug', iconSet: 'nuxt' },
                label: 'Test page',
                translateLabel: false,
                to: '/test'
            },
            {
                icon: { name: 'lucide:triangle-alert', iconSet: 'nuxt' },
                label: 'Error page',
                translateLabel: false,
                to: '/permission/duplicate/0'
            },
            {
                icon: { name: 'lucide:file', iconSet: 'nuxt' },
                label: 'Starter page',
                translateLabel: false,
                to: '/blank'
            },
            {
                icon: { name: 'lucide:triangle-alert', iconSet: 'nuxt' },
                label: '404 page',
                translateLabel: false,
                to: '/notfound'
            },
        ]
    },
];