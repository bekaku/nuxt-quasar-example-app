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
        :icon="biEye"
        flat
        dense
        round
        :size="size"
        :to="getViewLink"
      >
        <BaseTooltip v-if="!button">
          {{ t('base.view') }}
        </BaseTooltip>
      </BaseButton>
      <BaseButton
        v-else
        :loading
        :icon="biEye"
        flat
        dense
        round
        :size="size"
        @click="onEditBtnBaseClick($event, 'view')"
      >
        <BaseTooltip v-if="!button">
          {{ t('base.view') }}
        </BaseTooltip>
      </BaseButton>
    </template>
    <template v-if="editButton && isHaveManagePermission">
      <template v-if="!button">
        <BaseButton
          v-if="autoLink && getEditLink"
          :icon="biPencil"
          flat
          dense
          round
          :size="size"
          type="button"
          :to="getEditLink"
        >
          <BaseTooltip>
            {{ t('base.edit') }}
          </BaseTooltip>
        </BaseButton>
        <BaseButton
          v-else
          :icon="biPencil"
          flat
          dense
          round
          :size="size"
          type="button"
          @click="onEditBtnClick($event, 'edit')"
        >
          <BaseTooltip>
            {{ t('base.edit') }}
          </BaseTooltip>
        </BaseButton>
      </template>
      <template v-else>
        <BaseButton
          v-if="crudAction === 'view'"
          :loading
          :icon="biPencil"
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
          :icon="biFloppy"
          unelevated
          color="positive"
          :size="size"
          :label="
            crudAction == 'edit' || crudAction == 'new' || crudAction == 'copy'
              ? t('base.save')
              : undefined
          "
          type="submit"
        >
          <BaseTooltip v-if="!button">
            {{ t('base.edit') }}
          </BaseTooltip>
        </BaseButton>
      </template>
    </template>

    <template v-if="copyButton && isHaveManagePermission">
      <BaseButton
        v-if="autoLink && getCopyLink"
        :loading
        :icon="biCopy"
        :flat="!button"
        :dense="!button"
        :size="size"
        :outline="button"
        :label="!button || crudAction == undefined ? undefined : t('base.copy')"
        :to="getCopyLink"
      >
        <BaseTooltip v-if="!button">
          {{ t('base.copy') }}
        </BaseTooltip>
      </BaseButton>
      <BaseButton
        v-else
        :loading
        :icon="biCopy"
        :flat="!button"
        :dense="!button"
        :size="size"
        :outline="button"
        :label="!button || crudAction == undefined ? undefined : t('base.copy')"
        @click="onCopy"
      >
        <BaseTooltip v-if="!button">
          {{ t('base.copy') }}
        </BaseTooltip>
      </BaseButton>
    </template>
    <BaseButton
      v-if="deleteButton && isHaveManagePermission && crudAction !== 'copy' && crudAction !== 'new'"
      color="negative"
      :loading
      :icon="biTrash"
      :flat="!button"
      :outline="false"
      :outline-color="!button ? undefined : 'negative'"
      :dense="!button"
      :round="!button"
      :size="size"
      :label="!button || crudAction == undefined ? undefined : t('base.delete')"
      @click="onDelete"
    >
      <BaseTooltip v-if="!button" color="negative">
        {{ t('base.delete') }}
      </BaseTooltip>
    </BaseButton>
    <slot name="additionalBtn" />
  </div>
</template>
