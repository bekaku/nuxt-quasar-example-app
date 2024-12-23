<script setup lang="ts">
import { biCopy, biEye, biFloppy, biPencil, biTrash } from '@quasar/extras/bootstrap-icons';
import type { ICrudAction } from '~/types/common';

withDefaults(defineProps<{
    isHaveManagePermission?: boolean
    isHaveViewPermission?: boolean
    viewButton?: boolean
    editButton?: boolean
    copyButton?: boolean
    deleteButton?: boolean
    size?: string
    button?: boolean
    crudAction?: ICrudAction
    loading?: boolean
}>(), {
    size: "12px",
    viewButton: true,
    editButton: true,
    copyButton: true,
    deleteButton: true,
    button: false,
});
const emit=defineEmits<{
    'on-item-click': [type: ICrudAction]
    'on-item-copy': []
    'on-item-delete': []
}>()
const { t } = useLang();
const onEditBtnBaseClick=(type: ICrudAction)=>{
    emit('on-item-click', type)
}
const onEditBtnClick=(type: ICrudAction)=>{
    onEditBtnBaseClick(type)
}
</script>
<template>

    <div v-if="isHaveManagePermission || isHaveViewPermission"
        :class="{ 'q-gutter-xs': !button, 'q-gutter-md': button }">
        <QuasarButton v-if="editButton && isHaveViewPermission" :loading :icon="biEye" flat dense round :size="size"
            @click="onEditBtnBaseClick('view')">
            <q-tooltip v-if="!button">
                {{
                    t('base.view')
                }}
            </q-tooltip>
        </QuasarButton>
        <template v-if="editButton && isHaveManagePermission">
            <QuasarButton :loading
                :icon="!button ? biPencil : crudAction == 'new' || crudAction == 'edit' || crudAction == 'copy' ? biFloppy : biPencil"
                :flat="!button" :dense="!button" :unelevated="button" :outline="button && crudAction == 'view'"
                :color="!button || crudAction == 'view' ? undefined : 'primary'" :round="!button" :size="size"
                :label="!button || crudAction == undefined ? undefined
                    : crudAction == 'view' ? t('base.edit') : crudAction == 'edit' || crudAction == 'new' || crudAction == 'copy' ? t('base.save') : undefined"
                :type="crudAction == 'copy' || crudAction == 'edit' || crudAction == 'new' ? 'submit' : 'button'"
                @click="onEditBtnClick('edit')">
                <q-tooltip v-if="!button">
                    {{
                        t('base.edit')
                    }}
                </q-tooltip>
            </QuasarButton>
        </template>

        <QuasarButton v-if="copyButton && isHaveManagePermission" :loading :icon="biCopy" :flat="!button"
            :dense="!button" :size="size" :outline="button"
            :label="!button || crudAction == undefined ? undefined : t('base.copy')" @click="$emit('on-item-copy')">
            <q-tooltip v-if="!button">
                {{ t('base.copy') }}
            </q-tooltip>
        </QuasarButton>
        <QuasarButton v-if="deleteButton && isHaveManagePermission" color="negative" :loading :icon="biTrash"
            :flat="!button" :outline="button" :outline-color="!button ? undefined : 'negative'" :dense="!button"
            :round="!button" :size="size" :label="!button || crudAction == undefined ? undefined : t('base.delete')"
            @click="$emit('on-item-delete')">
            <q-tooltip v-if="!button" class="bg-negative">
                {{ t('base.delete') }}
            </q-tooltip>
        </QuasarButton>
        <slot name="additionalBtn" />
    </div>
</template>