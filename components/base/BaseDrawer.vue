<script setup lang="ts">
import {
    biCommand,
    biGear,
    biQuestionCircle,
    biSearch
} from '@quasar/extras/bootstrap-icons';
import {additionalMenu} from '~/libs/navs'
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