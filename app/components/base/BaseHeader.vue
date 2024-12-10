<script setup lang="ts">
import {
    biAppIndicator,
    biBell,
    biCameraVideo,
    biChatDots,
    biList,
    biSearch
} from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
const { bordered = false, reveal = false, showTogleDrawer = false, showLogo = true, showUserSetting = true, hambergerIcon = biList } = defineProps<{
    bordered?: boolean;
    reveal?: boolean;
    showTogleDrawer?: boolean;
    frontend?: boolean;
    showLogo?: boolean;
    hambergerMenu?: boolean;
    hambergerIcon?: string;
    hambergerIconOff?: string;
    showUserSetting?: boolean;
}>();
const { t } = useLang();
const { screen, dark } = useQuasar();
const appStore = useAppStore();
const showGotTopBtn = ref(false);
const showSearch = ref(false);
const onOpenSearch = () => {
    showSearch.value = true;
};
const onScroll = (info: any) => {
    if (info && info.position && info.position.top > 100) {
        showGotTopBtn.value = true;
    } else {
        showGotTopBtn.value = false;
    }
};
</script>

<template>
    <q-header :reveal="reveal" height-hint="58" :bordered="bordered" :elevated="showGotTopBtn" :class="{
        'app-second-bg-color-theme-dark text-white': dark.isActive,
        'bg-white text-black': !dark.isActive,
    }">
        <q-scroll-observer @scroll="onScroll" />
        <q-toolbar class="q-py-xs">
            <q-btn v-if="showTogleDrawer" dense flat round :icon="hambergerIcon"
                @click="appStore.setLeftDrawer(!appStore.leftDrawerOpen)" />
            <q-btn v-if="showLogo" flat no-caps no-wrap class="q-mr-xs" :ripple="false" to="/">
                <q-avatar style="height: auto; width: 42px" square>
                    <img :src="!dark.isActive
                        ? '/logo/logo-black.png'
                        : '/logo/logo-white.png'
                        " />
                </q-avatar>
            </q-btn>
            <q-btn v-if="screen.gt.xs" flat @click="onOpenSearch" class="text-capitalize">
                <span class="q-mr-sm text-muted">{{
                    t('base.search') + ' Vue Quasar'
                    }}</span>
                <q-icon :name="biSearch" />
            </q-btn>
            <q-space />

            <div class="q-gutter-md row items-center no-wrap">
                <q-btn round dense flat :icon="biCameraVideo" v-if="screen.gt.sm">
                    <q-tooltip>Create a video or post</q-tooltip>
                </q-btn>
                <q-btn round dense flat :icon="biAppIndicator" v-if="screen.gt.sm">
                    <q-tooltip>Apps</q-tooltip>
                </q-btn>
                <q-btn round dense flat :icon="biChatDots" v-if="screen.gt.sm" to="/chats">
                    <q-tooltip>Messages</q-tooltip>
                </q-btn>
                <q-btn v-if="!screen.gt.xs" round dense flat @click="onOpenSearch">
                    <q-icon :name="biSearch" />
                </q-btn>
                <q-btn round dense flat :icon="biBell">
                    <q-badge  color="negative" rounded text-color="white" floating>
                        99+
                    </q-badge>
                    <q-tooltip>{{ t('base.notifications') }}</q-tooltip>
                </q-btn>
                <LazyBaseHeaderMenu v-if="showUserSetting" style="max-width: 225px" />
            </div>
        </q-toolbar>
    </q-header>
</template>