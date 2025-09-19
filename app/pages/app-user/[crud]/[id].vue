<script setup lang="ts">
import {
  biCheckCircle,
  biEnvelope,
  biInfoCircle,
  biKey,
  biPencil,
  biPeople,
  biPerson,
  biTrash
} from '@quasar/extras/bootstrap-icons'
import AppRoleService from '~/api/AppRoleService'
import AppUserService from '~/api/AppUserService'
import { UserFormBreadcrumb } from '~/libs/breadcrumbs'
import { UserPermission } from '~/libs/permissions'
import type { LabelValue } from '~/types/common'
import type { AppRole, AppUser } from '~/types/models'

definePageMeta({
  pageName: 'model_user',
  requiresPermission: [UserPermission.view],
  breadcrumbs: UserFormBreadcrumb
})
useInitPage()
const { t } = useLang()
const { required, requireEmail, requireUsername } = useValidation()
const { appLoading } = useBase()
const { isDark } = useTheme()
const { findAllPermissions } = AppRoleService()
const { updateUserPassword } = AppUserService()
const roles = ref<AppRole[]>([])
const selectedAll = ref(false)
// update user password
const showChangePasswordForm = ref(false)
const currentPassword = ref<string>('')
const newPassword = ref<string>('')
const logoutAllDevice = ref(true)

const initialEntity: AppUser = Object.freeze<AppUser>({
  id: null,
  email: '',
  username: null,
  active: true,
  password: null,
  selectedRoles: []
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
} = useCrudForm<AppUser>(
  {
    crudName: 'AppUser',
    apiEndpoint: '/api',
    fectchDataOnLoad: false
  },
  initialEntity
)
const roleItems = ref<LabelValue<number | string>[]>([])
onMounted(() => {
  onLoadData()
})
const onLoadData = async () => {
  appLoading(true)
  const res = await findAllPermissions()
  if (res) {
    roles.value = res
    for (const r of res) {
      roleItems.value.push({
        label: r.name,
        value: r.id || 0
      })
    }
  }
  await preFectData()
  appLoading(false)
}
const getRoleById = (id: number | string): LabelValue<number | string> | undefined => {
  return roleItems.value.find(p => p.value === id)
}
const removeRole = (index: number) => {
  if (crudEntity.value && crudEntity.value.selectedRoles) {
    crudEntity.value.selectedRoles.splice(index, 1)
  }
}
const onCheckedAll = () => {
  updateSelectedAll(selectedAll.value)
}
const updateSelectedAll = (val: boolean) => {
  crudEntity.value.selectedRoles = []
  if (val) {
    for (let i = 0; i < roles.value.length; i++) {
      const item = roles.value[i]
      if (item && item.id) {
        crudEntity.value.selectedRoles.push(item.id)
      }
    }
  }
}

//change password
const onChangePassword = async () => {
  showChangePasswordForm.value = false
  if (crudEntity.value && crudEntity.value.id) {
    appLoading()
    try {
      await updateUserPassword(
        {
          password: newPassword.value,
          logoutAllDevice: logoutAllDevice.value
        },
        crudEntity.value.id
      )
    } catch (error: any) {
      console.error(error)
    } finally {
      appLoading(false)
      newPassword.value = ''
      currentPassword.value = ''
      logoutAllDevice.value = true
    }
  }
}
</script>
<template>
  <BasePage>
    <BaseCrudForm
      :icon="biPerson"
      :title="t('model_user')"
      :crud-name="crudName"
      :crud-action="crudAction"
      :crud-entity="crudEntity"
      :list-permission="{
        permissions: [UserPermission.list]
      }"
      :manage-permission="{
        permissions: [UserPermission.manage]
      }"
      :loading="loading"
      @on-back="onBack"
      @on-submit="onSubmit"
      @on-delete="onDelete"
      @on-edit-enable="onEnableEditForm"
    >
      <template #crudFromContent>
        <div class="row">
          <div v-if="crudEntity.avatar" class="col-12 q-pa-md text-center">
            <LazyBaseAvatar size="125px" rounded :src="crudEntity.avatar.thumbnail" />
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <BaseInput
              v-model="crudEntity.email"
              :edit-mode="isEditMode"
              :label="t('model_user_email')"
              :readonly="loading"
              type="email"
              :rules="[required, requireEmail]"
              :maxlength="100"
              counter
            >
              <template #prepend>
                <q-icon :name="biEnvelope" />
              </template>
            </BaseInput>
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <BaseInput
              v-model="crudEntity.username"
              :edit-mode="isEditMode"
              :label="t('model_user_username')"
              :readonly="loading"
              :rules="[requireUsername]"
              :maxlength="20"
              counter
            >
              <template #prepend>
                <q-icon :name="biPerson" />
              </template>
            </BaseInput>
            <q-banner class="q-my-sm" :class="isDark ? 'bg-grey-9' : 'bg-grey-3'" dense>
              <template #avatar>
                <q-icon :name="biInfoCircle" color="primary" />
              </template>
              <p>
                {{
                  `${t('helper.username1')}, ${t('helper.username2')}, ${t(
                    'helper.username3'
                  )}, ${t('helper.username4')}, ${t('helper.username5')}`
                }}
              </p>
            </q-banner>
          </div>
          <div v-if="crudAction == 'new'" class="col-12 col-md-6 q-pa-md">
            <BaseInput
              v-model="crudEntity.password"
              type="password"
              :edit-mode="isEditMode"
              :label="t('model_user_login_password')"
              :readonly="loading"
              :rules="[required]"
            >
              <template #prepend>
                <q-icon :name="biKey" />
              </template>
            </BaseInput>
          </div>
          <div v-if="crudAction == 'view' || crudAction == 'edit'" class="col-12 col-md-6 q-pa-md">
            <BaseButton
              :label="t('base.changePassword')"
              :icon="biKey"
              @click="showChangePasswordForm = true"
            />
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <BaseCheckbox
              v-model="crudEntity.active"
              :edit-mode="isEditMode"
              :label="t('base.enable')"
            />
          </div>
        </div>
        <q-separator />
        <div class="row">
          <div class="col-12 col-md-6">
            <BaseTextHeader :icon="{ name: 'lucide:user' }" :title="t('model_role')" />
            <q-card-section>
              <BaseCommandPalette
                v-model="crudEntity.selectedRoles"
                :readonly="!isEditMode"
                multiple
                scroll-height="200px"
                :use-checkbox="isEditMode"
                :items="roleItems"
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
            <BaseTextHeader :icon="{ name: 'lucide:check' }" :title="t('userRoleSelected')" />
            <q-card-section v-if="crudEntity.selectedRoles">
              <BaseScrollArea height="250px">
                <q-list v-if="crudEntity.selectedRoles.length > 0" dense>
                  <template v-for="(s, index) in crudEntity.selectedRoles" :key="`${index}-${s}`">
                    <BaseLabelValueItem v-if="getRoleById(s)" :item="getRoleById(s)">
                      <template v-if="isEditMode" #end>
                        <BaseButton
                          flat
                          :icon="biTrash"
                          round
                          text-color="negative"
                          @click="removeRole(index)"
                        />
                      </template>
                    </BaseLabelValueItem>
                  </template>
                </q-list>
                <template v-else>
                  <base-result status="empty" :description="t('userRoleNotFound')" />
                </template>
              </BaseScrollArea>
            </q-card-section>
          </div>
        </div>
      </template>
    </BaseCrudForm>
    <BaseDialog
      v-if="showChangePasswordForm"
      v-model="showChangePasswordForm"
      :title="t('base.changePassword')"
      :icon="{ name: 'lucide:pencil-line' }"
    >
      <BasePasswordForm
        v-model:current-password="currentPassword"
        v-model:new-password="newPassword"
        v-model:logout-all-device="logoutAllDevice"
        v-model:loading="loading"
        show-current-password
        show-logout
        :submit-label="t('updatePassword')"
        action-align="left"
        @on-submit="onChangePassword"
      />
    </BaseDialog>
  </BasePage>
</template>
