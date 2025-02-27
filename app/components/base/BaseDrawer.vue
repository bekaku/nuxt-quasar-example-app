<script setup lang="ts">
import {
    biCommand,
    biGear,
    biQuestionCircle,
    biSearch
} from '@quasar/extras/bootstrap-icons';
import { additionalMenu } from '~/libs/navs';
const { overlay = false, bordered = false, miniToOverlay = true, width = 250 } = defineProps<{
    overlay?: boolean;
    miniToOverlay?: boolean;
    bordered?: boolean;
    width?: number;
}>();
const { version: quasarVersion } = useQuasar();
const { t } = useLang();
const { appNavigateTo } = useBase();
const { isDark } = useTheme();
const appStore = useAppStore();
const drawerModel = ref(true);
const miniState = ref(false);
const searchTimeout = ref<any>();
const showSearch = ref(false);
const onOpenSearch = () => {
    showSearch.value = true;
};
const onSearchMenuClick = (to: string) => {
    showSearch.value = false;
    setTimeout(() => {
        appNavigateTo(to);
    }, 500)
}
onBeforeUnmount(() => {
    if (searchTimeout.value) {
        clearTimeout(searchTimeout.value);
    }
    searchTimeout.value = null;
})
</script>
<template>
    <q-drawer v-model="drawerModel" show-if-above :width="width" :overlay="overlay" :bordered="bordered"
        :mini-to-overlay="miniToOverlay && !appStore.leftDrawerOpen" :mini="miniState && !appStore.leftDrawerOpen"
        class="drawer-bg q-px-xs" @mouseover="miniState = false" @mouseout="miniState = true">
        <q-scroll-area class="fit">
            <div v-show="!miniState || appStore.leftDrawerOpen">
                <div class="row justify-center q-pa-sm">
                    <q-btn flat dense round to="/" class="btn--no-hover">
                        <q-avatar style="height: auto; width: 45px" square>
                            <img alt="logo" :src="!isDark
                                ? '/logo/logo-black.png'
                                : '/logo/logo-white.png'
                                ">
                        </q-avatar>
                    </q-btn>
                </div>

                <q-item clickable dense class="search-item"
                    @click="onOpenSearch">
                    <q-item-section side>
                        <q-icon :name="biSearch" size="xs" class="text-muted" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label class="text-muted">
                            {{ t('base.searchMenu') }}
                        </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                        <q-icon :name="biCommand" size="xs" class="text-muted" />
                    </q-item-section>
                </q-item>
            </div>
            <BaseMenuItems :menu-items="appStore.drawers" />
            <BaseMenuItems :menu-items="additionalMenu">
                <template #after>
                    <q-separator />
                    <q-item clickable>
                        <q-item-section side>
                            <q-icon class="q-text-black" :name="biQuestionCircle" size="20px" />
                        </q-item-section>
                        <q-item-section>{{ t('base.help') }}</q-item-section>
                    </q-item>
                    <q-item clickable to="/settings">
                        <q-item-section side>
                            <q-icon class="q-text-black" :name="biGear" size="20px" />
                        </q-item-section>
                        <q-item-section>{{ t('base.setting') }}</q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item>
                        <q-item-section class="text-center">
                            <q-item-label caption>
                                {{ `@ ${getYearNow()} ${t('app.monogram')}` }}
                            </q-item-label>
                            <q-item-label caption>
                                {{ `Quasar ${quasarVersion}` }}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </template>
            </BaseMenuItems>
        </q-scroll-area>
        <LazySearchMenu v-if="showSearch" v-model="showSearch" @on-click="onSearchMenuClick" />
    </q-drawer>
</template>
<style lang="scss" scoped>
.search-item {
    padding: 10px;
    margin: 10px 10px 0 10px;
    border-radius: 10px;
    border: var(--app-main-border-color) 1px solid;
}
</style>