<script setup lang="ts">
import {
  biFileBarGraph,
  biFileEarmark,
  biPencil,
  biShieldCheck,
  biUiChecks
} from '@quasar/extras/bootstrap-icons'
import { PermissionFormBreadcrumb } from '~/libs/breadcrumbs'
import { PermissionPermission } from '~/libs/permissions'
import { TabTest } from '~/libs/tabs'
import type { LabelValue } from '~/types/common'
import type { Permission, PermissionType } from '~/types/models'
definePageMeta({
  pageName: 'model_permission',
  requiresPermission: [PermissionPermission.view],
  breadcrumbs: PermissionFormBreadcrumb,
  tabs: TabTest
})
useInitPage()
// const { getParam } = useBase();
// const crud = ref<ICrudAction | undefined>(getParam<ICrudAction>('crud'));
// const id = ref<number | undefined>(getParam<number>('id'));
// console.log(`Permission/:crud/:id => crud : ${crud.value} - id : ${id.value}`);
const entity: Permission = Object.freeze<Permission>({
  id: null,
  code: '',
  remark: null,
  description: null,
  operationType: 'CRUD'
})
const {
  crudAction,
  loading,
  crudEntity,
  crudName,
  isEditMode,
  onDelete,
  onBack,
  onEnableEditForm,
  onSubmit
} = useCrudForm<Permission>(
  {
    crudName: 'Permission',
    apiEndpoint: '/api'
  },
  entity
)
const { required } = useValidation()
const { t } = useLang()
const radios: LabelValue<PermissionType>[] = [
  { label: 'Crud', value: 'CRUD', icon: { name: 'lucide:list-checks' } },
  { label: 'Report', value: 'REPORT', icon: { name: 'lucide:chart-bar-decreasing' } },
  { label: 'Other', value: 'OTHER', icon: { name: 'lucide:file' } }
]
</script>
<template>
  <BasePage>
    <BaseCrudForm
      :crud-action="crudAction"
      :loading="loading"
      :crud-entity="crudEntity"
      :crud-name="crudName"
      :icon="biShieldCheck"
      :title="t('model_permission')"
      @on-back="onBack"
      @on-edit-enable="onEnableEditForm"
      @on-submit="onSubmit"
      @on-delete="onDelete"
    >
      <template #crudFromContent>
        <div class="row">
          <div class="col-12 col-md-6 q-pa-md">
            <BaseInput
              v-model="crudEntity.code"
              :edit-mode="isEditMode"
              :icon="{ name: 'lucide:shield-check' }"
              :label="t('model_permission_name')"
              :rules="[required]"
              :maxlength="125"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <BaseInput
              v-model="crudEntity.description"
              :edit-mode="isEditMode"
              :icon="{ name: 'lucide:pencil-line' }"
              :label="t('model_permission_description')"
              :maxlength="255"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <div class="q-px-sm">Permission type</div>
            <BaseRadio
              v-model="crudEntity.operationType"
              :edit-mode="isEditMode"
              :items="radios"
              :inline="false"
            />
          </div>
        </div>
      </template>
    </BaseCrudForm>
  </BasePage>
</template>
