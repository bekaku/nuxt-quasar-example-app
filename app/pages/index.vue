<script setup lang="ts">
import { biBrightnessHigh, biMoon } from '@quasar/extras/bootstrap-icons';

definePageMeta({
    // middleware: ["auth"]
    pageName: 'base.home',//custom meta
    // requiresPermission: ['role_manage'],//custom meta
})
useInitPage();
const {  onSetTheme } = useTheme();
const {  getPageMeta, getPageMetaByKey } = useBase();

if(!import.meta.server){
    console.log('getPageMeta',getPageMeta());
    console.log('getPageMetaByKey','pageName: ' ,getPageMetaByKey('pageName'), ', requiresPermission: ', getPageMetaByKey('requiresPermission'));
}
</script>
<template>
    <BasePage>
        <BaseCard>
            <q-card-section class="q-gutter-md">
                <QBtn label="Light" :icon="biBrightnessHigh" @click="onSetTheme('light')" />
                <QBtn label="Dark" :icon="biMoon" @click="onSetTheme('dark')" />
            </q-card-section>
            <q-card-section class="q-gutter-md">
                <BaseLink to="/param/users-admins/123?action=view">To Param page</BaseLink>
                <BaseLink to="/config">To Config page</BaseLink>
            </q-card-section>
        </BaseCard>
    </BasePage>
</template>