<script setup lang="ts">
import type { LabelValue } from '~/types/common';
import {
    biAirplane,
    biGear,
    biLightbulb,
    biPerson,
    biPhone,
    biX
} from '@quasar/extras/bootstrap-icons';
useHead({
    title: 'Select'
})
const { t } = useLang();
const singleModel = ref<number>();
const singleLazyModel = ref<number>();
const multipleModel = ref<number[]>([]);
const singleModel2 = ref<number>();
const multipleAnyModel = ref<any[]>([]);
const lazyLoading = ref(false);
const cascadeLoading = ref(false);
const commandPaletteModel = ref<number[]>([])
const showCommandPaletteDialog = ref<boolean>(false)
const lazyItems = ref<LabelValue<number>[]>([
    {
        label: 'api_client_list',
        value: 1
    }
]);



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
        value: 6,
        description: 'Fisher',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg'
    },
    {
        label: 'Robert Fox',
        value: 7,
        description: 'Fox',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
    },
    {
        label: 'Esther Howard',
        value: 8,
        description: 'Howard',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
    },
    {
        label: 'Darlene Robertson',
        value: 9,
        description: 'Robertson',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
    },
    {
        label: 'Ralph Edwards',
        value: 10,
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

const items3: LabelValue<number>[] = [
    {
        label: 'Users',
        children: simpleItems2
    },
    {
        label: 'Other',
        children: simpleItems
    },
    {
        label: 'test',
        description: 'Just test',
        value: 55
    },
]


//cascade example 
const provinceItems = ref<LabelValue<number>[]>([]);
const provinceSeleted = ref<number>();
const districtItems = ref<LabelValue<number>[]>([]);
const districtSeleted = ref<number>();
const subdistrictItems = ref<LabelValue<number>[]>([]);
const subdistrictSeleted = ref<number>();

onMounted(() => {
    onLoadProviceItems();
})
const onLazyFilter = (val: string, update: any) => {
    console.log('onLazyFilter', val);
    setTimeout(() => {
        update(() => {
            for (let index = 0; index < 30; index++) {
                lazyItems.value.push({
                    label: `Label ${lazyItems.value.length + 1}`,
                    value: lazyItems.value.length + 1,
                })
            }
            // lazyItems.value.push({
            //     label: `Label ${lazyItems.value.length + 1}`,
            //     value: lazyItems.value.length + 1,
            // })
        });
    }, 2000);
}

const onLazyScroll = (to: number, ref: any) => {
    console.log('onScroll', to, ref);
    lazyLoading.value = true;
    setTimeout(() => {
        for (let index = 0; index < 30; index++) {
            lazyItems.value.push({
                label: `Label ${lazyItems.value.length + 1}`,
                value: lazyItems.value.length + 1,
            })
        }
        lazyLoading.value = false;
    }, 1500);
}

const onLoadProviceItems = async () => {
    cascadeLoading.value = true;
    const provinces = await $fetch('/api/provinces');
    for (const p of provinces) {
        provinceItems.value.push({
            label: p.name_th,
            value: p.id,
            description: p.name_en
        })
    }
    cascadeLoading.value = false;
}
const onLoadDistrictItems = async () => {
    districtSeleted.value = undefined;
    districtItems.value = [];
    subdistrictItems.value = [];
    subdistrictSeleted.value = undefined;
    if (!provinceSeleted.value) {
        return;
    }
    cascadeLoading.value = true;
    const disticts = await $fetch(`/api/district?provinceId=${provinceSeleted.value}`);
    for (const d of disticts) {
        districtItems.value.push({
            label: d.name_th,
            value: d.id,
            description: d.name_en
        })
    }
    cascadeLoading.value = false;

}
const onLoadSubdistrictItems = async () => {
    subdistrictItems.value = [];
    subdistrictSeleted.value = undefined;
    if (!districtSeleted.value) {
        return;
    }
    cascadeLoading.value = true;
    const subdisticts = await $fetch(`/api/subdistrict?districtId=${districtSeleted.value}`);
    for (const d of subdisticts) {
        subdistrictItems.value.push({
            label: d.name_th,
            value: d.id,
            description: `${d.name_en} ${d.zip_code}`
        })
    }
    cascadeLoading.value = false;
}
watch(provinceSeleted, () => {
    onLoadDistrictItems();
})
watch(districtSeleted, () => {
    onLoadSubdistrictItems();
})
</script>
<template>
    <QuasarPage>
        <QuasarCard>
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
                        <quasar-select v-model="singleModel" required can-filter clearable :items="simpleItems" dense
                            :multiple="false" label="Select Single" />
                        <p>simpleModel : {{ singleModel }}</p>
                    </div>
                    <div class="col-12 col-md-4 q-pa-md">
                        <div class="text-h5 q-my-sm">
                            Single Avatar Select
                        </div>
                        <quasar-select v-model="singleModel2" can-filter clearable :items="simpleItems2" dense
                            :multiple="false" label="Select Multiple" />
                        <p>singleModel2 : {{ singleModel2 }}</p>
                    </div>
                    <div class="col-12 col-md-4 q-pa-md">
                        <div class="text-h5 q-my-sm">
                            Multiple Select
                        </div>
                        <quasar-select v-model="multipleModel" can-filter clearable :items="simpleItems2" dense
                            use-chips multiple label="Select Multiple" />
                        <p>multipleModel : {{ multipleModel }}</p>
                    </div>
                    <div class="col-12 col-md-4 q-pa-md">
                        <div class="text-h5 q-my-sm">
                            Select Alt
                        </div>
                        <quasar-select-alt v-model="multipleAnyModel" :items="simpleItems3" multiple dense
                            label="Select Any" option-label="name" option-value="id" />
                        <p>multipleAnyModel : {{ multipleAnyModel }}</p>
                    </div>
                    <div class="col-12 col-md-4 q-pa-md">
                        <div class="text-h5 q-my-sm">
                            Lazy loading, Virtual Scroller
                        </div>
                        <quasar-select v-model="singleLazyModel" can-filter clearable :items="lazyItems" dense
                            :multiple="false" lazy :input-debounce="300" :lazy-loading="lazyLoading"
                            label="Select lazy Single" :no-options-text="t('base.typeForsearch')"
                            @on-filter="onLazyFilter" @on-scroll="onLazyScroll" />
                        <p>simpleModel : {{ singleLazyModel }}</p>
                    </div>
                </div>


                <div class="text-h5 q-my-sm">
                    Cascade
                </div>
                <div class="row">
                    <div class="col-12 col-md-4 q-pa-md">
                        <quasar-select v-model="provinceSeleted" can-filter :items="provinceItems" dense
                            :lazy-loading="cascadeLoading" :multiple="false" label="Province" />
                    </div>
                    <div class="col-12 col-md-4 q-pa-md">
                        <quasar-select v-model="districtSeleted" can-filter :items="districtItems" dense
                            :lazy-loading="cascadeLoading" :multiple="false" label="District" />
                    </div>
                    <div class="col-12 col-md-4 q-pa-md">
                        <quasar-select v-model="subdistrictSeleted" can-filter :items="subdistrictItems" dense
                            :lazy-loading="cascadeLoading" :multiple="false" label="Sub District" />
                    </div>
                </div>

                <div class="text-h5 q-my-sm">
                    Command palette {{ commandPaletteModel }}
                </div>

                <div class="row">
                    <div class="col-12 col-md-6">
                        <quasar-command-palette v-model="commandPaletteModel" multiple :items="items3" />
                    </div>
                    <div class="col-12 col-md-6 q-px-md">
                        <div class="text-h5 q-my-sm">
                            Command palette dialog {{ commandPaletteModel }}
                        </div>
                        <quasar-button outline label="Open Command palette dialog"
                            @click="showCommandPaletteDialog = true" />
                    </div>
                </div>


            </q-card-section>
        </QuasarCard>

        <BaseDialog v-model="showCommandPaletteDialog" :show-toolbar="false"
            dialog-style="width: 756px; max-width: 80vw;">
            <quasar-command-palette v-model="commandPaletteModel" class="q-pt-sm" multiple :items="items3">
                <template #inputAppend>
                    <QuasarButton round :icon="biX" @click="showCommandPaletteDialog=false" />
                </template>
            </quasar-command-palette>
        </BaseDialog>
    </QuasarPage>
</template>
<style lang="scss" scoped></style>