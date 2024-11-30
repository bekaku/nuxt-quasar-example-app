<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Select </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>

                <div class="row">
                    <div class="col-12 col-md-4 q-pa-md">
                        <div class="text-h5 q-my-sm">
                            Single Select
                        </div>
                        <quasar-select required can-filter clearable :items="simpleItems" v-model="singleModel" dense
                            :multiple="false" label="Select Single" />
                        <p>simpleModel : {{ singleModel }}</p>
                    </div>
                    <div class="col-12 col-md-4 q-pa-md">
                        <div class="text-h5 q-my-sm">
                            Multiple Select
                        </div>
                        <quasar-select can-filter clearable :items="simpleItems2" v-model="multipleModel" dense
                            use-chips multiple label="Select Multiple" />
                        <p>multipleModel : {{ multipleModel }}</p>
                    </div>
                    <div class="col-12 col-md-4 q-pa-md">
                        <div class="text-h5 q-my-sm">
                            Select Alt
                        </div>
                        <quasar-select-alt :items="simpleItems3" v-model="multipleAnyModel" multiple dense
                            label="Select Any" option-label="name" option-value="id" />
                        <p>multipleAnyModel : {{ multipleAnyModel }}</p>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import type { LabelValue } from '~/types/common';
import {
    biAirplane,
    biGear,
    biLightbulb,
    biPerson,
    biPhone
} from '@quasar/extras/bootstrap-icons';
const { t } = useLang();
useHead({
    title: `Select | ${t('app.name')}`
})
const singleModel = ref<number>();
const multipleModel = ref<number[]>([]);
const multipleAnyModel = ref<any[]>([]);
const simpleItems: LabelValue<number>[] = [
    {
        label: 'Google',
        value: 1,
        description: 'Fox',
        icon: biAirplane
    },
    {
        label: 'Facebook',
        value: 2,
        icon: biGear
    },
    {
        label: 'Twitter',
        value: 3,
        icon: biLightbulb
    },
    {
        label: 'Apple',
        value: 4,
        icon: biPerson
    },
    {
        label: 'Oracle',
        value: 5,
        icon: biPhone
    },
];
const simpleItems2: LabelValue<number>[] = [
    {
        label: 'Cody Fisher',
        value: 1,
        description: 'Fisher',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg'
    },
    {
        label: 'Robert Fox',
        value: 2,
        description: 'Fox',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
    },
    {
        label: 'Esther Howard',
        value: 3,
        description: 'Howard',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
    },
    {
        label: 'Darlene Robertson',
        value: 4,
        description: 'Robertson',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
    },
    {
        label: 'Ralph Edwards',
        value: 5,
        description: 'Edwards',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png'
    },
];
const simpleItems3: any[] = [
    {
        name: 'Cody Fisher',
        id: 1,
    },
    {
        name: 'Robert Fox',
        id: 2,
    },
    {
        name: 'Esther Howard',
        id: 3,
    },
    {
        name: 'Darlene Robertson',
        id: 4,
    },
    {
        name: 'Ralph Edwards',
        id: 5,
    },
];
</script>

<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}
</style>