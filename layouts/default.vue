<script setup lang="ts">
import { bi0Circle, biCode, biGlobe, biList, biMessenger, biRecord, biRss, biStar } from '@quasar/extras/bootstrap-icons';
import { ref } from 'vue';
import type { EssentialLinkProps } from '~/components/EssentialLink.vue';
const { version: quasarVersion } = useQuasar();
const essentialLinks: EssentialLinkProps[] = [
    {
        title: 'Docs',
        caption: 'quasar.dev',
        icon: bi0Circle,
        link: 'https://quasar.dev'
    },
    {
        title: 'Github',
        caption: 'github.com/quasarframework',
        icon: biCode,
        link: 'https://github.com/quasarframework'
    },
    {
        title: 'Discord Chat Channel',
        caption: 'chat.quasar.dev',
        icon: biMessenger,
        link: 'https://chat.quasar.dev'
    },
    {
        title: 'Forum',
        caption: 'forum.quasar.dev',
        icon: biRecord,
        link: 'https://forum.quasar.dev'
    },
    {
        title: 'Twitter',
        caption: '@quasarframework',
        icon: biRss,
        link: 'https://twitter.quasar.dev'
    },
    {
        title: 'Facebook',
        caption: '@QuasarFramework',
        icon: biGlobe,
        link: 'https://facebook.quasar.dev'
    },
    {
        title: 'Quasar Awesome',
        caption: 'Community Quasar projects',
        icon: biStar,
        link: 'https://awesome.quasar.dev'
    }
];

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
<template>
    <q-layout view="lHh Lpr lFf">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat color="white" dense round :icon="biList" aria-label="Menu" @click="toggleLeftDrawer" />

                <q-toolbar-title>
                    Quasar App
                </q-toolbar-title>

                <div>Quasar v{{ quasarVersion }}</div>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
            <q-list>
                <q-item-label header>
                    Essential Links
                </q-item-label>

                <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
            </q-list>
        </q-drawer>

        <q-page-container padding>
            <slot />
        </q-page-container>
    </q-layout>
</template>