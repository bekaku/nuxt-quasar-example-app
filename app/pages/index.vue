<script setup lang="ts">
import { biBrightnessHigh, biMoon } from '@quasar/extras/bootstrap-icons';

definePageMeta({
    // middleware: ["auth"]
    pageName: 'base.home',//custom meta
    // requiresPermission: ['role_manage'],//custom meta
})
useInitPage();
const appStore = useAppStore();
const authenStore = useAuthenStore();
const { dark, onSetTheme } = useTheme();
const { appNavigateTo, getPageMeta, getPageMetaByKey } = useBase();
const testStore = useTestStore();
const count = ref(1);

if(!import.meta.server){
    console.log('getPageMeta',getPageMeta());
    console.log('getPageMetaByKey','pageName: ' ,getPageMetaByKey('pageName'), ', requiresPermission: ', getPageMetaByKey('requiresPermission'));
}
const onGotoPage = (link: string) => {
    appNavigateTo(link);
}
</script>
<template>
    <q-page padding>
        <q-card>
            <q-card-section class="q-gutter-md">
                <p>
                    permissionStore {{ appStore.permissions }}
                </p>
                <p>
                    authenStore {{ authenStore.auth }}
                </p>
                <ClientOnly>
                    {{ dark }}
                </ClientOnly>
                <QBtn label="Light" :icon="biBrightnessHigh" @click="onSetTheme('light')" />
                <QBtn label="Dark" :icon="biMoon" @click="onSetTheme('dark')" />
            </q-card-section>
            <q-card-section>
                <div class="text-danger">Test Title</div>
                <div>
                    <p>count : {{ count }}</p>
                    <q-btn @click="count++">Click++</q-btn>
                </div>
                <br >
                <NuxtLink to="/store">Store {{ testStore.counter }}</NuxtLink>
                <br >
                <q-btn no-caps @click="onGotoPage('/store')">Store page</q-btn>
                <br >
                <NuxtLink to="/param/users-admins/123?action=view">Param page</NuxtLink>
                <br >
                <NuxtLink to="/fetch">Fetch</NuxtLink>
                <br >
                <NuxtLink to="/config">config</NuxtLink>
                <br >
                <NuxtLink to="/i18n">i18n</NuxtLink>

                <br >
                <NuxtLink to="/404">404</NuxtLink>
            </q-card-section>
        </q-card>
    </q-page>
</template>