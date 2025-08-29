<script setup lang="ts">
import { biPeople, biShieldCheck, biShieldLock, biTrash } from '@quasar/extras/bootstrap-icons'
import PermissionService from '~/api/PermissionService'
import { RoleFormBreadcrumb } from '~/libs/breadcrumbs'
import { RolePermission } from '~/libs/permissions'
import type { LabelValue } from '~/types/common'
import type { Permission, AppRole } from '~/types/models'
const { t } = useLang()
const { required } = useValidation()
definePageMeta({
  pageName: 'model.role.table',
  requiresPermission: [RolePermission.view],
  breadcrumbs: RoleFormBreadcrumb
})
useInitPage()
const { appLoading } = useBase()
const { findAllPermission } = PermissionService()
const entity: AppRole = Object.freeze<AppRole>({
  id: null,
  name: '',
  nameEn: null,
  active: true,
  frontEnd: false,
  selectdPermissions: []
})
const {
  crudAction,
  crudEntity,
  crudName,
  isEditMode,
  loading,
  onBack,
  onDelete,
  onEnableEditForm,
  onSubmit,
  preFectData
} = useCrudForm<AppRole>(
  {
    crudName: 'AppRole',
    apiEndpoint: '/api',
    fectchDataOnLoad: false
  },
  entity
)
const permissions = ref<Permission[]>([])
const selectedAll = ref(false)
const permissionItems = ref<LabelValue<number| string>[]>([])
onMounted(() => {
  onLoadData()
})
const onLoadData = async () => {
  appLoading(true)
  const response = await findAllPermission()
  if (response) {
    permissions.value = response
    permissionItems.value.push({
      label: t('crudPermission'),
      children: response
        .filter(c => c.operationType === 'CRUD')
        .map(c => {
          return {
            label: c.description || 'unknow',
            value: c.id || 0,
            description: c.code
          }
        })
    })
    // permissionItems.value.push({
    //   label: t('reportPermission'),
    //   children: response.filter(c => c.operationType === 2)
    //     .map(c => {
    //       return {
    //         label: c.description || 'unknow',
    //         value: c.id || 0,
    //         description: c.code
    //       }
    //     })
    // })
    // permissionItems.value.push({
    //   label: t('otherPermission'),
    //   children: response.filter(c => c.operationType === 3)
    //     .map(c => {
    //       return {
    //         label: c.description || 'unknow',
    //         value: c.id || 0,
    //         description: c.code
    //       }
    //     })
    // })
  }

  // const frontends = await findAllFrontendPermission();
  // if (frontends) {
  //   permissions.value.push(...frontends);
  // }

  await preFectData()
  appLoading(false)
}
const getPermissionById = (id: number | string): LabelValue<number | string> | undefined => {
  return permissionItems.value
    .find(p => p.children?.find(r => r.value === id))
    ?.children?.find(t => t.value == id)
}
const removePermission = (index: number) => {
  if (crudEntity.value && crudEntity.value.selectdPermissions) {
    crudEntity.value.selectdPermissions.splice(index, 1)
  }
}
const onCheckedAll = () => {
  updateSelectedAll(selectedAll.value)
}
const updateSelectedAll = (val: boolean) => {
  crudEntity.value.selectdPermissions = []
  if (val) {
    for (let i = 0; i < permissions.value.length; i++) {
      const item = permissions.value[i]
      if (item && item.id) {
        crudEntity.value.selectdPermissions.push(item.id)
      }
    }
  }
}
</script>

<template>
  <BasePage>
    <BaseCrudForm
      :icon="biPeople"
      :title="t('model.role.table')"
      :crud-name="crudName"
      :crud-action="crudAction"
      :crud-entity="crudEntity"
      :full-width="true"
      :list-permission="{
        permissions: [RolePermission.list]
      }"
      :manage-permission="{
        permissions: [RolePermission.manage]
      }"
      :loading="loading"
      @on-back="onBack"
      @on-submit="onSubmit"
      @on-delete="onDelete"
      @on-edit-enable="onEnableEditForm"
    >
      <template #crudFromContent>
        <div class="row">
          <div class="col-12 q-pa-md">
            <BaseInput
              v-model="crudEntity.name"
              required
              :readonly="loading"
              :edit-mode="isEditMode"
              :label="t('model.role.name')"
              type="text"
              :rules="[required]"
              :maxlength="125"
              counter
            />
          </div>
          <div class="col-12 col-md-4 q-px-md q-gutter-md">
            <BaseCheckbox
              v-model="crudEntity.active"
              :edit-mode="isEditMode"
              :label="t('model.role.active')"
            />
          </div>
        </div>
        <q-separator />
        <div class="row">
          <div class="col-12 col-md-6">
            <BaseTextHeader :icon="{ name: biShieldLock }" :title="t('model_permission')" />
            <q-card-section>
              <BaseCommandPalette
                v-model="crudEntity.selectdPermissions"
                :readonly="!isEditMode"
                multiple
                :items="permissionItems"
                :use-checkbox="isEditMode"
              >
                <template #inputAppend>
                  <BaseCheckbox
                    v-if="isEditMode"
                    v-model="selectedAll"
                    :show-label="false"
                    @click="onCheckedAll"
                  >
                    <BaseTooltip>
                      {{ !selectedAll ? t('base.selectAll') : t('base.deselectAll') }}
                    </BaseTooltip>
                  </BaseCheckbox>
                </template>
              </BaseCommandPalette>
            </q-card-section>
          </div>
          <div class="col-12 col-md-6">
            <BaseTextHeader :icon="{ name: biShieldCheck }" :title="t('permissionGrant')" />
            <q-card-section>
              <BaseScrollArea height="450px">
                <q-list v-if="crudEntity.selectdPermissions.length > 0">
                  <template
                    v-for="(s, index) in crudEntity.selectdPermissions"
                    :key="`${index}-${s}`"
                  >
                    <BaseLabelValueItem v-if="getPermissionById(s)" :item="getPermissionById(s)">
                      <template v-if="isEditMode" #end>
                        <BaseButton
                          flat
                          :icon="biTrash"
                          round
                          text-color="negative"
                          @click="removePermission(index)"
                        />
                      </template>
                    </BaseLabelValueItem>
                  </template>
                </q-list>
                <template v-else>
                  <base-result status="empty" :description="t('permissionNotFound')" />
                </template>
              </BaseScrollArea>
            </q-card-section>
          </div>
        </div>
      </template>
    </BaseCrudForm>
  </BasePage>
</template>
