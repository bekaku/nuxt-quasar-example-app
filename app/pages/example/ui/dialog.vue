<script setup lang="ts">
import { biPencil, biTrash } from '@quasar/extras/bootstrap-icons';
const { t } = useLang();

useHead({
    title: 'Dialog'
})
const { appConfirm } = useBase();

const dialog = ref<boolean>(false);
const dialog2 = ref<boolean>(false);

const dialogSmall = ref<boolean>(false);
const dialogMedium = ref<boolean>(false);
const dialogFullWidth = ref<boolean>(false);
const dialogFullHeight = ref<boolean>(false);
const dialogFullWidthHeight = ref<boolean>(false);
const dialogMaximize = ref<boolean>(false);
const dialogConfirmToClose = ref<boolean>(false);
const text = ref();

const onPopConfirmChange = (status: boolean) => {
    console.log('onPopConfirmChange', status)
}

const onConfirmToClose = async () => {
    const conf = await appConfirm(t('app.monogram'), 'Are you sure to close this dialog?');
    if (conf) {
        dialogConfirmToClose.value = false;
    }
}
</script>
<template>
    <QuasarPage>
        <QuasarCard>
            <q-card-section class="q-gutter-md">
                <div class="text-h6">Dialog</div>
                <q-separator />


                <QuasarButton outline label="Dialog" @click="dialog = true" />
                <QuasarButton outline label="Dialog persistent" @click="dialog2 = true" />
                <QuasarButton outline label="Dialog Confirm to close" @click="dialogConfirmToClose = true" />

                <p>Size</p>
                <QuasarButton outline label="Small" @click="dialogSmall = true" />
                <QuasarButton outline label="Medium" @click="dialogMedium = true" />
                <QuasarButton outline label="Full Width" @click="dialogFullWidth = true" />
                <QuasarButton outline label="Full Height" @click="dialogFullHeight = true" />
                <QuasarButton outline label="Full Width and Height" @click="dialogFullWidthHeight = true" />
                <QuasarButton outline label="Maximize" @click="dialogMaximize = true" />
            </q-card-section>

            <q-card-section class="q-gutter-md">
                <div class="text-h6">Popover confirm</div>
                <q-separator />
                <QuasarButton label="Delete item" color="negative" :icon="biTrash">
                    <base-pop-confirm :title="t('base.deleteConfirm')" confirm-color="negative"
                        @on-change="onPopConfirmChange" />
                </QuasarButton>

                <QuasarButton label="Custom label">
                    <base-pop-confirm title="Custom label" confirm-color="teal" label-confirm="Custom confirm"
                        cancel-color="grey" label-cancel="Blaa" @on-change="onPopConfirmChange" />
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
                <div class="text-h6">Popover</div>
                <q-separator />
                <QuasarButton label="Show popover">
                    <QuasarPopover width="250px">
                        <q-banner>
                            <template #avatar>
                                <q-icon :name="biPencil" color="primary" />
                            </template>
                            You have lost connection to the internet. This app is offline.
                        </q-banner>
                    </QuasarPopover>
                </QuasarButton>
                <QuasarButton label="Handles right-click" color="red-4">
                    <QuasarPopover width="450px" context-menu >
                        <q-banner>
                            <template #avatar>
                                <q-icon :name="biPencil" color="primary" />
                            </template>
                            You have lost connection to the internet. This app is offline.
                        </q-banner>
                    </QuasarPopover>
                </QuasarButton>

            </q-card-section>
        </QuasarCard>

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
        <base-dialog v-if="dialogMedium" v-model="dialogMedium" title="Dialog Medium"
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
        <base-dialog v-if="dialogFullWidthHeight" v-model="dialogFullWidthHeight" title="Dialog Full Width Height"
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

        <base-dialog v-if="dialogConfirmToClose" v-model="dialogConfirmToClose" title="Confirm to close title"
            :icon="biPencil" :auto-close="false" persistent @on-close="onConfirmToClose">
            <q-card-section class="q-pt-none">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas
                eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus
                minima, porro labore.
            </q-card-section>
        </base-dialog>
    </QuasarPage>
</template>