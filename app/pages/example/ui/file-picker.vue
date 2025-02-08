<script setup lang="ts">
import type { FileManagerDto } from '~/types/models';
import { FileExtensionAccept } from '~/libs/constants';
import { biFileArrowUp, biUpload, biSend, biEmojiSmile, biImage } from '@quasar/extras/bootstrap-icons';
import { BaseFilePicker } from '#components';
const authenStore = useAuthenStore();
const { t } = useLang();
useHead({
    title: 'File picker'
})
const files = ref<File[]>([]);
const filesPreview = ref<FileManagerDto[]>([]);

const filePickerCustomUiRef = useTemplateRef<InstanceType<typeof BaseFilePicker>>('filePickerCustomUiRef');
const customFiles = ref<FileManagerDto[]>([]);

const filePickerCustomUi2Ref = useTemplateRef('filePickerCustomUi2Ref');
const custom2Files = ref<FileManagerDto[]>([]);
const message = ref();
const onFileAdd = (items: File[]) => {
    console.log('onFildAdd', items);
}
const onSubmit = () => {
    console.log('onSubmit', files.value, 'filesPreview', filesPreview.value);
}

//custom ui
const openPicker = () => {
    if (filePickerCustomUiRef.value) {
        filePickerCustomUiRef.value.openFilePicker();
    }
}
const onCustomFileAdd = (items: File[]) => {
    console.log('onCustomFileAdd', items);
}
const onCustomRemove = (index: number) => {
    if (!customFiles.value) {
        return;
    }
    customFiles.value.splice(index, 1);
};
//custom2 ui
const openPicker2 = () => {
    if (filePickerCustomUi2Ref.value) {
        filePickerCustomUi2Ref.value.openFilePicker();
    }
}
const onCustomFileAdd2 = (items: File[]) => {
    console.log('onCustomFileAdd', items);
}
const onCustomRemove2 = (index: number) => {
    if (!custom2Files.value) {
        return;
    }
    custom2Files.value.splice(index, 1);
};
</script>
<template>
    <BasePage>
        <BaseCard>
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> file-picker </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>
                <div class="row">
                    <div class="col-12 q-pa-md">
                        <div class="text-h5">
                            Simple Picker
                        </div>
                        <BaseFilePicker v-model="files" v-model:file-items="filesPreview" multiple
                            :icon="biFileArrowUp" show-preview :accept="FileExtensionAccept"
                            :label="t('base.chooseFile')" @on-file-add="onFileAdd" />
                        <BaseButton class="q-my-md" @click="onSubmit">
                            Submit
                        </BaseButton>
                        <q-separator />
                    </div>
                    <div class="col-12 q-pa-md">
                        <div class="text-h5">
                            Custom Ui
                        </div>
                        <BaseFilePicker ref="filePickerCustomUiRef" v-model:file-items="customFiles" multiple
                            :accept="FileExtensionAccept" @on-file-add="onCustomFileAdd">
                            <BaseButton class="q-my-md" outline :icon="biUpload" label="Open Picker"
                                @click="openPicker" />
                        </BaseFilePicker>
                        <BaseFilesPreview :items="customFiles" format-size col="col-4 col-md-2 q-pa-md"
                            @on-remove="onCustomRemove" />
                        <q-separator />
                    </div>
                    <div class="col-12 q-pa-md">
                        <div class="text-h5 q-pb-md">
                            Custom Ui2
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-6 q-pa-md">
                                <BaseFilePicker ref="filePickerCustomUi2Ref" v-model:file-items="custom2Files"
                                    style="display: none;" multiple :accept="FileExtensionAccept" :max-files="5"
                                    @on-file-add="onCustomFileAdd2" />


                                <q-input v-model="message" dense outlined type="textarea" autogrow label="Type message">
                                    <template v-if="authenStore?.auth?.avatar?.thumbnail" #prepend>
                                        <base-avatar :src="authenStore?.auth?.avatar?.thumbnail" />
                                    </template>
                                    <template #before>
                                        <BaseButton round flat :icon="biImage" color="grey-7" @click="openPicker2" />
                                        <BaseButton round flat :icon="biEmojiSmile" color="grey-7" />
                                    </template>
                                    <template #after>
                                        <BaseButton flat round :icon="biSend" color="primary">
                                            <q-tooltip>
                                                Send
                                            </q-tooltip>
                                        </BaseButton>
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-12 col-md-6 q-pa-md">
                                <q-list v-if="custom2Files != undefined && custom2Files.length > 0">
                                    <base-scroll-area height="250px">
                                        <base-files-preview-item-alt v-for="(f, fileIndex) in custom2Files"
                                            :key="`f-${f.id}-${fileIndex}`" :item="f" :index="fileIndex" dense
                                            format-size image-size="100px" show-delete @on-remove="onCustomRemove2" />
                                    </base-scroll-area>
                                </q-list>
                            </div>
                        </div>

                    </div>
                </div>

            </q-card-section>
        </BaseCard>
    </BasePage>
</template>
<style lang="scss" scoped></style>