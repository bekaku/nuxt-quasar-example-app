<script setup lang="ts" generic="T">
import { biArrowLeft, biFile } from '@quasar/extras/bootstrap-icons'
import { useRbac } from '~/composables/useRbac'
import type { ICrudAction } from '~/types/common'
import type { RBACProps } from '~/types/props'
const {
  crudName,
  managePermission,
  addPermission,
  editPermission,
  deletePermission,
  byPassPermission = false,
  listPermission,
  icon = biFile,
  loading = false,
  showBack = true,
  showActionText = true,
  fullWidth = true,
  editButton = true,
  deleteButton = true,
  canSubmit = true,
  copyButton = false,
  buttonSize = 'md',
  crudAction
} = defineProps<{
  crudName?: string
  listPermission?: RBACProps
  managePermission?: RBACProps
  addPermission?: RBACProps
  editPermission?: RBACProps
  deletePermission?: RBACProps
  byPassPermission?: boolean
  title?: string
  icon?: string
  loading?: boolean
  showBack?: boolean
  showDelete?: boolean
  showEdit?: boolean
  crudAction?: ICrudAction
  showActionText?: boolean
  fullWidth?: boolean
  editButton?: boolean
  deleteButton?: boolean
  copyButton?: boolean
  canSubmit?: boolean
  buttonSize?: string
  crudEntity?: T
}>()
const emit = defineEmits(['on-back', 'on-submit', 'on-delete', 'on-edit-enable'])
const { t } = useLang()
const { hasPermission } = useRbac()

const isHaveAddPermission = computed(() => {
  if (byPassPermission) {
    return true
  }
  return addPermission && addPermission?.permissions && addPermission?.permissions?.length > 0
    ? hasPermission(addPermission)
    : crudName
      ? hasPermission({ permissions: [`${pascalToSnake(crudName)}_add`] })
      : true
})
const isHaveEditPermission = computed(() => {
  if (byPassPermission) {
    return true
  }
  return editPermission && editPermission?.permissions && editPermission?.permissions?.length > 0
    ? hasPermission(editPermission)
    : crudName
      ? hasPermission({ permissions: [`${pascalToSnake(crudName)}_edit`] })
      : true
})
const isHaveDeletePermission = computed(() => {
  if (byPassPermission) {
    return true
  }
  return deletePermission &&
    deletePermission?.permissions &&
    deletePermission?.permissions?.length > 0
    ? hasPermission(deletePermission)
    : crudName
      ? hasPermission({ permissions: [`${pascalToSnake(crudName)}_delete`] })
      : true
})
const isHaveListPermission = computed(() => {
  if (byPassPermission) {
    return true
  }
  return listPermission && listPermission?.permissions && listPermission?.permissions.length > 0
    ? hasPermission(listPermission)
    : crudName
      ? hasPermission({ permissions: [`${pascalToSnake(crudName)}_list`] })
      : true
})

const onItemClick = (/*type: ICrudAction*/) => {
  if (crudAction == 'view') {
    emit('on-edit-enable')
  }
}
const onSubmit = () => {
  emit('on-submit')
}
</script>
<template>
  <div v-bind="$attrs" class="row" :class="{ 'content-limit': !fullWidth }">
    <div class="col">
      <BaseCard>
        <q-card-section>
          <slot name="crudFromToolbar">
            <q-toolbar class="q-mb-lg">
              <BaseButton
                v-if="isHaveListPermission && showBack"
                flat
                round
                :icon="{ name: 'lucide:chevron-left' }"
                :tooltip="t('base.back')"
                @click="$emit('on-back')"
              >
              </BaseButton>
              <q-toolbar-title>
                <template v-if="crudAction && showActionText">
                  {{
                    crudAction === 'new'
                      ? t('base.addNew')
                      : crudAction === 'copy'
                        ? t('base.copy')
                        : crudAction === 'edit'
                          ? t('base.edit')
                          : ''
                  }}
                </template>
                {{ title }}
              </q-toolbar-title>
              <slot name="toolbarAction">
                <q-icon size="md" :name="icon" />
              </slot>
            </q-toolbar>
          </slot>
          <slot name="crudFrom">
            <q-form class="q-gutter-md" @submit="onSubmit">
              <slot name="crudFromContent" />
              <slot name="crudAction">
                <q-separator />
                <q-card-section align="center" class="q-gutter-sm">
                  <BaseCrudActionButton
                    button
                    :allow-permission="{
                      add: byPassPermission || isHaveAddPermission,
                      edit: byPassPermission || isHaveEditPermission,
                      delete: byPassPermission || isHaveDeletePermission
                    }"
                    :size="buttonSize"
                    :view-button="false"
                    :loading
                    :copy-button="crudAction == 'new' ? false : copyButton"
                    :edit-button="editButton"
                    :delete-button="deleteButton"
                    :crud-action="crudAction"
                    @on-item-click="onItemClick"
                    @on-item-delete="$emit('on-delete')"
                  />
                </q-card-section>
              </slot>
            </q-form>
          </slot>
        </q-card-section>
      </BaseCard>
    </div>
  </div>
</template>
