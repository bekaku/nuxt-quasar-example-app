<script setup lang="ts">
import type { IMenu } from '~/types/common';
import {
    biEnvelope,
    biPerson,
    biShieldLock,
} from '@quasar/extras/bootstrap-icons';
const navs: IMenu[] = [
    {
        header: '',
        pages: [
            {
                icon: biPerson,
                translate: true,
                title: 'page.settingsPublicProfile',
                to: '/settings',
                noActiveLink: true
            }
        ]
    },
    {
        header: 'Access',
        translate: false,
        border:true,
        pages: [
            {
                icon: biShieldLock,
                translate: true,
                title: 'page.settingsSecurity',
                to: '/settings/security',
                noActiveLink: true
            },
            {
                icon: biEnvelope,
                translate: true,
                title: 'contactInfo',
                to: '/settings/emails',
                noActiveLink: true
            }
        ]
    },
];
</script>
<template>
    <q-page v-bind="$attrs" padding>
        <div class="row">
            <div class="col-12 col-md-3 q-px-md">
                <BaseMenuItems :menu-items="navs"/>
            </div>

            <div class="col-12 col-md-9">
                <slot name="content" />
            </div>
        </div>
        <slot/>
    </q-page>
</template>