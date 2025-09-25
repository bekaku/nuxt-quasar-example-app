<script setup lang="ts">
import { biCopy, biEye, biFloppy, biPencil, biTrash } from '@quasar/extras/bootstrap-icons'
import { CrudAction } from '~/libs/constants'
import type { ICrudAction } from '~/types/common'

const {
  size = '12px',
  viewButton = true,
  editButton = true,
  copyButton = true,
  deleteButton = true,
  button = false,
  autoLink = true,
  crudName,
  crudId,
  isHaveViewPermission,
  isHaveManagePermission
} = defineProps<{
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
  autoLink?: boolean
  crudName?: string
  crudId?: string | number
}>()
const emit = defineEmits<{
  'on-item-click': [type: ICrudAction]
  'on-item-copy': []
  'on-item-delete': []
}>()
const { t } = useLang()
const getViewLink = computed(() => {
  if (isHaveViewPermission && viewButton && crudName && crudId) {
    return `/${pascalToKebab(crudName)}/${CrudAction.VIEW}/${crudId}`
  }
  return
})
const getEditLink = computed(() => {
  if (isHaveManagePermission && editButton && crudName && crudId) {
    return `/${pascalToKebab(crudName)}/${CrudAction.EDIT}/${crudId}`
  }
  return
})
const getCopyLink = computed(() => {
  if (isHaveManagePermission && editButton && crudName && crudId) {
    return `/${pascalToKebab(crudName)}/${CrudAction.COPY}/${crudId}`
  }
  return
})
const onEditBtnBaseClick = (event: any, type: ICrudAction) => {
  appPreventDefult(event)
  emit('on-item-click', type)
}
const onEditBtnClick = (event: any, type: ICrudAction) => {
  onEditBtnBaseClick(event, type)
}
const onCopy = (event: any) => {
  appPreventDefult(event)
  emit('on-item-copy')
}
const onDelete = (event: any) => {
  appPreventDefult(event)
  emit('on-item-delete')
}
</script>
<template>
  <div
    v-if="isHaveManagePermission || isHaveViewPermission"
    :class="{ 'q-gutter-xs': !button, 'q-gutter-md': button }"
  >
    <template v-if="viewButton && isHaveViewPermission">
      <BaseButton
        v-if="autoLink && getViewLink"
        :loading
        :icon="{ name: 'lucide:eye' }"
        flat
        dense
        round
        :size="size"
        :to="getViewLink"
        :tooltip="!button ? t('base.view') : undefined"
      >
      </BaseButton>
      <BaseButton
        v-else
        :loading
        :icon="{ name: 'lucide:eye' }"
        flat
        dense
        round
        :size="size"
        :tooltip="!button ? t('base.view') : undefined"
        @click="onEditBtnBaseClick($event, 'view')"
      >
      </BaseButton>
    </template>
    <template v-if="editButton && isHaveManagePermission">
      <template v-if="!button">
        <BaseButton
          v-if="autoLink && getEditLink"
          :icon="{ name: 'lucide:pencil' }"
          flat
          dense
          round
          :size="size"
          type="button"
          :to="getEditLink"
           :tooltip="t('base.edit')"
        >
        </BaseButton>
        <BaseButton
          v-else
          :icon="{ name: 'lucide:pencil' }"
          flat
          dense
          round
          :size="size"
          type="button"
           :tooltip="t('base.edit')"
          @click="onEditBtnClick($event, 'edit')"
        >
        </BaseButton>
      </template>
      <template v-else>
        <BaseButton
          v-if="crudAction === 'view'"
          :loading
          :icon="{ name: 'lucide:pencil' }"
          :unelevated="button"
          color="primary"
          :outline="false"
          :size="size"
          :label="t('base.edit')"
          type="button"
          @click="onEditBtnClick($event, 'edit')"
        />
        <BaseButton
          v-else
          :loading
          :icon="{ name: 'lucide:save' }"
          unelevated
          color="positive"
          :size="size"
          :label="
            crudAction == 'edit' || crudAction == 'new' || crudAction == 'copy'
              ? t('base.save')
              : undefined
          "
          :tooltip="!button ? t('base.edit') : undefined"
          type="submit"
        >
        </BaseButton>
      </template>
    </template>

    <template v-if="copyButton && isHaveManagePermission">
      <BaseButton
        v-if="autoLink && getCopyLink"
        :loading
        :icon="{ name: 'lucide:copy' }"
        :flat="!button"
        :dense="!button"
        :size="size"
        :outline="button"
        :label="!button || crudAction == undefined ? undefined : t('base.copy')"
        :to="getCopyLink"
        :tooltip="!button ? t('base.copy') : undefined"
      >
      </BaseButton>
      <BaseButton
        v-else
        :loading
        :icon="{ name: 'lucide:copy' }"
        :flat="!button"
        :dense="!button"
        :size="size"
        :outline="button"
        :label="!button || crudAction == undefined ? undefined : t('base.copy')"
        :tooltip="!button ? t('base.copy') : undefined"
        @click="onCopy"
      >
      </BaseButton>
    </template>
    <BaseButton
      v-if="deleteButton && isHaveManagePermission && crudAction !== 'copy' && crudAction !== 'new'"
      color="negative"
      :loading
      :icon="{ name: 'lucide:trash-2' }"
      :flat="!button"
      :outline="false"
      :outline-color="!button ? undefined : 'negative'"
      :dense="!button"
      :round="!button"
      :size="size"
      :label="!button || crudAction == undefined ? undefined : t('base.delete')"
      :tooltip="!button ? t('base.delete') : undefined"
      tooltip-color="negative"
      @click="onDelete"
    >
    </BaseButton>
    <slot name="additionalBtn" />
  </div>
</template>
