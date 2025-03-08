<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import { useBase } from '@/composables/useBase';
import { onBeforeUnmount, ref } from 'vue';
import type { FileManagerDto } from '~/types/models';
import { biPaperclip, biX } from '@quasar/extras/bootstrap-icons';
import {
    MaxSelectFiles,
    FileExtensionAccept,
    FileTypeAcceptList,
    LimitFileSizeMB,
    LimitFileSize
} from '~/libs/constants';
import { zipFile, isImageFile, getImgUrlFromFile } from '~/utils/fileUtil';

const {
    multiple = false,
    showPreview = true,
    maxFiles = MaxSelectFiles,
    icon = biPaperclip,
    accept = FileExtensionAccept
} = defineProps<{
    multiple: boolean;
    showPreview?: boolean;
    icon?: string;
    label?: string;
    accept?: string;//* = wildcard all extension
    wildcard?: boolean;
    maxFiles?: number;//0 = unlimited pick
}>();
const { appToast } = useBase();
const { t } = useLang();
const modelValue = defineModel<any[]>({ default: () => [] });
const fileItems = defineModel<FileManagerDto[]>('fileItems', { default: () => [] });
const modelImageFiles = ref<any[]>([]);
const emit = defineEmits<{
    'on-file-add': [files: File[]]
}>();
const appFileInputRef = ref();
//file upload

const openFilePicker = () => {

    if (multiple && maxFiles > 0 && modelValue.value && modelValue.value.length == maxFiles) {
        appToast(t('error.limitFile2', { total: maxFiles }), {
            type: 'negative'
        });
        return;
    }

    if (!appFileInputRef.value) {
        return;
    }
    appFileInputRef.value.$el.click();
};
const onClear = (event: any) => {
    if (event) {
        event.stopPropagation();
    }
    onClearProcess();
};
const onClearProcess = () => {
    modelValue.value = [];
    modelImageFiles.value = [];
    fileItems.value = [];
}
const onRejected = (rejectedEntries: any) => {
    appToast(t('error.filesValidationFmt', { total: rejectedEntries.length }), {
        type: 'negative'
    });
};
const validateAndZipFile = async (files: File[]): Promise<any[]> => {
    const list: any[] = [];
    for (const f of files) {
        const type = f.type;
        if (f.size > LimitFileSize) {
            appToast(t('error.limitEachFile2', [f.name, LimitFileSizeMB]), {
                multiLine: false,
                type: 'negative'
            });
        } else {
            const allowType = FileTypeAcceptList.includes(type);
            if (!allowType) {
                const ziped = await zipFile(f);
                if (ziped) {
                    list.push(ziped);
                }
            } else {
                list.push(f);
            }
        }

    }
    return new Promise((resolve) => {
        resolve(list);
    });
};
const onFileAdded = async (files: File[] | File) => {
    const fileList = Array.isArray(files) ? files : [files];
    const finalFiles = await validateAndZipFile(fileList);
    emit('on-file-add', finalFiles);
    if (multiple) {
        if (finalFiles && finalFiles.length > 0) {
            for (const f of finalFiles) {
                await onAddFile(f);
            }
        }
    } else if (finalFiles) {
        modelValue.value = [];
        fileItems.value = [];
        await onAddFile(finalFiles[0]);
    }
    modelImageFiles.value = [];
};
const onAddFile = async (f: any) => {
    const isImg = isImageFile(f);
    let url: string | undefined = undefined;
    if (isImg) {
        url = await getImgUrlFromFile(f);
    }
    onAddFilePreview(f, isImg, url);
};
const onAddFilePreview = (
    f: File,
    isImage: boolean,
    pathUrl: string | undefined = undefined
) => {
    if (modelValue.value) {
        modelValue.value.push(f);
        fileItems.value.push({
            id: 0,
            fileMime: f.type,
            fileName: f.name,
            filePath: pathUrl ? pathUrl : '',
            fileThumbnailPath: '',
            fileSize: f.size + '',
            functionId: 0,
            isImage: isImage,
            file: f
        });
    }
};
const onRemoveNewImage = (index: number) => {
    if (!modelValue.value || modelValue.value.length == 0) {
        return;
    }
    if (multiple) {
        onRemoveProcess(index);
    } else {
        onClearProcess();
    }
};
const onRemoveProcess = (index: number) => {
    modelValue.value = modelValue.value.filter((v: any, i: number) => i != index);
    fileItems.value = fileItems.value.filter((v: any, i: number) => i != index);
    modelImageFiles.value = modelImageFiles.value.filter((v: any, i: number) => i != index);
}
onBeforeUnmount(() => {
    onClearProcess();
});
defineExpose({
    openFilePicker
});
</script>
<template>
    <div v-bind="$attrs">
        <slot>
            <div class="row">
                <div class="col-12 q-pa-md" :class="{ 'col-md-4': showPreview }">
                    <q-list bordered class="app-border-radius">
                        <q-item clickable @click="openFilePicker">
                            <q-item-section side>
                                <q-icon :name="icon" />
                            </q-item-section>
                            <q-item-section>
                                <q-item-label>
                                    {{ label ? label : t('base.chooseFile') }}
                                </q-item-label>
                                <q-item-label v-if="fileItems && fileItems.length > 0">
                                    <div class="q-gutter-xs row" style="max-height: 150px; overflow-y: auto;">
                                        <q-chip v-for="(item, index) in fileItems" :key="`fi-${index}`" removable
                                            class="truncate-chip-labels" @remove="onRemoveNewImage(index)">
                                            <div class="ellipsis">
                                                {{ item.fileName }}
                                            </div>
                                        </q-chip>
                                    </div>
                                </q-item-label>
                            </q-item-section>
                            <q-item-section v-if="modelValue && modelValue.length > 0" side>
                                <q-btn round flat :icon="biX" @click="onClear" />
                            </q-item-section>
                        </q-item>
                    </q-list>
                    <!-- <BaseInput class="cursor-pointer" :icon="icon" :label="label ? label : t('base.chooseFile')" /> -->
                </div>
                <div v-if="showPreview" class="col-12 col-md-8 q-pa-md">
                    <template v-if="fileItems.length > 0 && modelValue && modelValue.length > 0">
                        <LazyBaseFilesPreview :items="fileItems" format-size @on-remove="onRemoveNewImage" />
                    </template>
                </div>
            </div>
        </slot>

        <q-file ref="appFileInputRef" v-model="modelImageFiles" style="display: none" filled :max-files="maxFiles"
            bottom-slots :label="label ? label : t('base.chooseFile')" counter :multiple="multiple"
            :accept="!wildcard ? accept : undefined" @rejected="onRejected" @update:model-value="onFileAdded" />
    </div>
</template>
<style lang="sass" scoped>
.truncate-chip-labels
  max-width: 140px
</style>