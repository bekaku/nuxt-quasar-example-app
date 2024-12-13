<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section class="q-gutter-md">
                <div class="text-h6">Dialog</div>
                <q-separator />


                <QuasarButton label="Dialog" @click="dialog = true" />
                <QuasarButton label="Dialog persistent" @click="dialog2 = true" />

                <p>Size</p>
                <QuasarButton label="Small" @click="dialogSmall = true" />
                <QuasarButton label="Medium" @click="dialogMedium = true" />
                <QuasarButton label="Full Width" @click="dialogFullWidth = true" />
                <QuasarButton label="Full Height" @click="dialogFullHeight = true" />
                <QuasarButton label="Full Width and Height" @click="dialogFullWidthHeight = true" />
                <QuasarButton label="Maximize" @click="dialogMaximize = true" />
            </q-card-section>

            <q-card-section class="q-gutter-md">
                <div class="text-h6">Pop confirm</div>
                <q-separator />
                <QuasarButton label="Delete item" color="negative" :icon="biTrash">
                    <base-pop-confirm
:title="t('base.deleteConfirm')" confirm-color="negative"
                        @on-change="onPopConfirmChange"/>
                </QuasarButton>

                <QuasarButton label="Custom label">
                    <base-pop-confirm
title="Custom label" confirm-color="teal" label-confirm="Custom confirm"
                        cancel-color="grey" label-cancel="Blaa" @on-change="onPopConfirmChange"/>
                </QuasarButton>
                <QuasarButton label="More custom">
                    <base-pop-confirm title="Addon label" width="350px" @on-change="onPopConfirmChange">
                        <q-input v-model="text" outlined label="This input overide title prop" />
                        <template #bottom>
                            bottom slot
                        </template>
                    </base-pop-confirm>
                </QuasarButton>
            </q-card-section>

            <q-card-section class="q-gutter-md">
                <div class="text-h6">Menu</div>
                <q-separator />
                <q-btn dense :icon="biThreeDots" flat label="Show menu">
                    <BaseSimpleMenu :items="menus" @on-click="onMenuClick"/>
                </q-btn>
                <q-item clickable>
                    <q-item-section>
                        Q-item Menu v-model
                    </q-item-section>
                    <q-item-section side>
                        <q-btn dense :icon="biThreeDots" round flat @click="openMenu($event)"/>
                        <q-menu v-model="showMenu" cover anchor="top middle">
                            <BaseSimpleMenuItem
v-for="(item, index) in menus2" :key="`app-menu-${item.value}-${index}`"
                                v-close-popup :item="item" @click="onMenuClick(item.value)" /> 
                            </q-menu>
                    </q-item-section>
                </q-item>
            </q-card-section>
        </q-card>

        <base-dialog v-if="dialog" v-model="dialog" title="Dialog title" :icon="biPencil">
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.

            </q-card-section>
        </base-dialog>

        <base-dialog v-if="dialog2" v-model="dialog2" title="Dialog persistent" :persistent="true">
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>
            <q-card-actions align="right">
                <q-btn v-close-popup no-caps flat label="Cancel" color="primary" />
                <q-btn v-close-popup no-caps flat label="Turn on Wifi" color="negative" />
            </q-card-actions>
        </base-dialog>

        <base-dialog v-if="dialogSmall" v-model="dialogSmall" title="Dialog Small" dialog-style="width: 300px;">
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>
        </base-dialog>
        <base-dialog
v-if="dialogMedium" v-model="dialogMedium" title="Dialog Medium"
            dialog-style="width: 700px; max-width: 80vw;">
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>
        </base-dialog>
        <base-dialog v-if="dialogFullWidth" v-model="dialogFullWidth" title="Dialog fullWidth" full-width>
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>
        </base-dialog>
        <base-dialog v-if="dialogFullHeight" v-model="dialogFullHeight" title="Dialog fullHeight" full-height>
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>
        </base-dialog>
        <base-dialog
v-if="dialogFullWidthHeight" v-model="dialogFullWidthHeight" title="Dialog Full Width Height"
            full-height full-width>
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>
        </base-dialog>
        <base-dialog v-if="dialogMaximize" v-model="dialogMaximize" title="Dialog Maximize" maximized can-maximized>
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>
        </base-dialog>
    </q-page>
</template>

<script setup lang="ts">
import type { LabelValue } from '~/types/common';
import { biCopy, biPencil, biThreeDots, biTrash } from '@quasar/extras/bootstrap-icons';
const { t } = useLang();

useHead({
    title: 'Dialog'
})
const dialog = ref<boolean>(false);
const dialog2 = ref<boolean>(false);

const dialogSmall = ref<boolean>(false);
const dialogMedium = ref<boolean>(false);
const dialogFullWidth = ref<boolean>(false);
const dialogFullHeight = ref<boolean>(false);
const dialogFullWidthHeight = ref<boolean>(false);
const dialogMaximize = ref<boolean>(false);
const text = ref();

const menus = ref<LabelValue<number>[]>([
    {
        label: 'Edit',
        description: 'edit this item',
        avatar: '',
        icon: biPencil,
        fetch: false,
        value: 1
    },
    {
        label: 'Delete',
        description: 'Delete this item',
        avatar: '',
        icon: biTrash,
        fetch: false,
        value: 2
    },
    {
        label: 'Copy',
        description: 'Copy this item',
        avatar: '',
        icon: biCopy,
        fetch: false,
        value: 3
    }
]);
const menus2: LabelValue<number>[] = [
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
const showMenu = ref(false);
const onPopConfirmChange = (status: boolean) => {
    console.log('onPopConfirmChange', status)
}
const onMenuClick = (value: number) => {
    console.log('onMenuClick', value);
    showMenu.value=false;
}
const openMenu = (event: any) => {
  if (event) {
    event.stopImmediatePropagation();
  }
  showMenu.value = true;
};
</script>
