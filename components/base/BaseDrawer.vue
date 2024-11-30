<script setup lang="ts">
import {
    biGear,
    biNewspaper,
    biQuestionCircle,
    biSearch,
    biCommand,
    biChatDots,
    biCursorText,
    biBack,
    biList,
    biDatabase,
    biChevronRight,
    biFileEarmark,
    biBrush,
    biPersonCircle,
    biApp,
    biCalendar,
    biUpload,
    biChevronExpand
} from '@quasar/extras/bootstrap-icons';
import type { IMenu } from '~/types/common';
const { overlay = false, bordered = false, miniToOverlay = true, width = 250, showUserSetting = true } = defineProps<{
    overlay?: boolean;
    miniToOverlay?: boolean;
    bordered?: boolean;
    width?: number;
    showUserSetting?: boolean;
}>();
const { t } = useLang();
const appStore = useAppStore();
const drawerModel = ref(true);
const miniState = ref(false);
const searchText = ref<string>('');
const additionalMenu: IMenu[] = [
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
                        icon: biDatabase,
                        permission: '',
                        title: 'useAxios',
                        translate: false,
                        to: '/example/composables/use-axios'
                    },
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
                        icon: biUpload,
                        permission: '',
                        title: 'File picker',
                        translate: false,
                        to: '/example/ui/file-picker'
                    },
                    {
                        icon: biChevronExpand,
                        permission: '',
                        title: 'Select',
                        translate: false,
                        to: '/example/ui/select'
                    },
                    {
                        icon: 'bi-toggle-off',
                        permission: '',
                        title: 'Toggle',
                        translate: false,
                        to: '/example/ui/toggle'
                    },
                ],
            },
            {
                icon: 'bi-pie-chart',
                title: 'Charts',
                translate: false,
                items: [
                    {
                        icon: 'bi-bar-chart',
                        permission: '',
                        title: 'Bar',
                        translate: false,
                        to: '/example/charts/bar'
                    },
                ]
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
                icon: 'bi-emoji-smile',
                permission: '',
                title: 'Emoji picker',
                translate: false,
                to: '/example/emoji-picker'
            },
            {
                icon: 'bi-crop',
                permission: '',
                title: 'Image cropper',
                translate: false,
                to: '/example/image-cropper'
            },
            {
                icon: 'bi-file-image',
                permission: '',
                title: 'Image/Pdf View',
                translate: false,
                to: '/example/image-view'
            },
            {
                icon: 'bi-markdown',
                permission: '',
                title: 'Markdown editor',
                translate: false,
                to: '/example/markdown-editor'
            },
            {
                icon: 'bi-file',
                permission: '',
                title: 'Result',
                caption: 'Error, Success, 404',
                translate: false,
                to: '/example/result'
            },
            {
                icon: 'bi-arrow-left-right',
                permission: '',
                title: 'Swiper',
                translate: false,
                to: '/example/swiper'
            },
            {
                icon: 'bi-funnel',
                permission: '',
                title: 'Sort items',
                translate: false,
                to: '/example/sort-items'
            },
            {
                icon: biNewspaper,
                permission: '',
                title: 'Social feed',
                translate: false,
                to: '/feed'
            },
            {
                icon: 'bi-arrow-down-up',
                permission: '',
                title: 'Virtual scroller',
                translate: false,
                to: '/example/virtual-scroller'
            },
        ]
    }
];
</script>
<template>
    <q-drawer v-model="drawerModel" show-if-above :width="width" :overlay="overlay" :bordered="bordered"
        :mini-to-overlay="miniToOverlay && !appStore.leftDrawerOpen" :mini="miniState && !appStore.leftDrawerOpen"
        @mouseover="miniState = false" @mouseout="miniState = true" class="drawer-bg">
        <q-scroll-area class="fit">
            <div v-show="!miniState || appStore.leftDrawerOpen">
                <BaseHeaderMenu class="q-pt-md" />
                <q-input v-model="searchText" class="q-pa-md" outlined dense>
                    <template #prepend>
                        <q-icon :name="biSearch" size="xs" />
                    </template>
                    <template #append>
                        <q-icon :name="biCommand" size="xs" />
                    </template>
                </q-input>
            </div>
            <BaseMenuItems :menu-items="appStore.drawers"></BaseMenuItems>
            <BaseMenuItems :menu-items="additionalMenu">
                <template #after>
                    <q-separator />
                    <q-item clickable>
                        <q-item-section side>
                            <q-icon class="q-text-black" :name="biQuestionCircle" />
                        </q-item-section>
                        <q-item-section>{{ t('base.help') }}</q-item-section>
                    </q-item>
                    <q-item clickable to="/settings">
                        <q-item-section side>
                            <q-icon class="q-text-black" :name="biGear" />
                        </q-item-section>
                        <q-item-section>{{ t('base.setting') }}</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item>
                        <q-item-section>
                            <q-item-label caption>
                                {{ `@ ${getYearNow()} ${t('app.monogram')}` }}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </template>
            </BaseMenuItems>
        </q-scroll-area>
    </q-drawer>
</template>
<style lang="sass">
.drawer-card-header
  background-color: #212635
.drawer-card
  background-color: #282d3f

.active-menu-link
  color: $primary
.YL
  &__toolbar-input-container
    min-width: 100px
    width: 55%
  &__toolbar-input-btn
    border-radius: 0
    border-style: solid
    border-width: 1px 1px 1px 0
    border-color: rgba(0,0,0,.24)
    max-width: 60px
    width: 100%
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      text-decoration: underline
</style>