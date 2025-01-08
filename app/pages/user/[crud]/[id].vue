<script setup lang="ts">
import {
    biPerson,
    biSearch,
    biEnvelope,
    biCheck,
    biX,
    biKey,
    biPeople,
    biInfoCircle,
    biPencil,
} from '@quasar/extras/bootstrap-icons';
import RoleService from '~/api/RoleService';
import { UserFormBreadcrumb } from '~/libs/appBreadcrumbs';
import { UserPermission } from '~/libs/appPermissions';
import type { UserDto, Role } from '~/types/models';

definePageMeta({
    pageName: 'model_user',
    requiresPermission: [UserPermission.view],
    breadcrumbs: UserFormBreadcrumb,
})
useInitPage();
const { t } = useLang();
const { required, requireEmail, requireUsername } = useValidation();
const { appLoading } = useBase();
const { isDark } = useTheme();
const { findAllBackendRole } = RoleService();
const roles = ref<Role[]>([]);
const filterText = ref('');
const selectedAll = ref(false);
// update user password
const showChangePasswordForm = ref(false);
const currentPassword = ref<string>('');
const newPassword = ref<string>('');
const rePassword = ref<string>('');
const showPassword = ref(false);
const logoutAllDevice = ref(true);

const initialEntity: UserDto = Object.freeze<UserDto>({
    id: null,
    email: '',
    username: null,
    active: true,
    password: null,
    selectedRoles: [],
});
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
} = useCrudForm<UserDto>(
    {
        crudName: 'user',
        apiEndpoint: '/api',
        fectchDataOnLoad: false
    },
    initialEntity
);
onMounted(() => {
    onLoadData();
});
const onLoadData = async () => {
    appLoading(true);
    const res = await findAllBackendRole();
    if (res) {
        roles.value = res;

    }
    await preFectData();
    appLoading(false);
};
const filteredList = computed(() => {
    const list = roles.value;
    const search = filterText.value
        ? filterText.value.toLowerCase().trim()
        : null;
    if (!search) {
        return list;
    }
    return list.filter(
        (c: Role) => c.name && c.name.toString().toLowerCase().includes(search),
    );
});
const findDisplayRoleById = (id: number) => {
    const item = roles.value.find((p) => p.id === id);
    return item && item.name ? item.name : 'unknown';
};
const removeRole = (index: number) => {
    if (crudEntity.value && crudEntity.value.selectedRoles) {
        crudEntity.value.selectedRoles.splice(index, 1);
    }
};
const onCheckedAll = () => {
    updateSelectedAll(selectedAll.value);
};
const updateSelectedAll = (val: boolean) => {
    crudEntity.value.selectedRoles = [];
    if (val) {
        for (let i = 0; i < roles.value.length; i++) {
            const item = roles.value[i];
            if (item && item.id) {
                crudEntity.value.selectedRoles.push(item.id);
            }
        }
    }
};

//change password
const onChangePassword=()=>{
    console.log('onChangePassword');
}
</script>
<template>
    <q-page padding>

        <BaseCrudForm :icon="biPerson" :title="t('model_user')" :crud-name="crudName" :crud-action="crudAction"
            :crud-entity="crudEntity" :full-width="false" :list-permission="[UserPermission.list]"
            :manage-permission="[UserPermission.manage]" :loading="loading" @on-back="onBack" @on-submit="onSubmit"
            @on-delete="onDelete" @on-edit-enable="onEnableEditForm">
            <template #crudFromContent>
                <div class="row">
                    <div v-if="crudEntity.avatar" class="col-12 q-pa-md text-center">
                        <LazyBaseAvatar size="125px" rounded :src="crudEntity.avatar.thumbnail" />
                    </div>
                    <div class="col-12 col-md-6 q-pa-md">
                        <QuasarInput v-model="crudEntity.email" :edit-mode="isEditMode" :label="t('model_user_email')"
                            :readonly="loading" type="email" :rules="[required, requireEmail]" :maxlength="100" counter>
                            <template #prepend>
                                <q-icon :name="biEnvelope" />
                            </template>
                        </QuasarInput>
                    </div>
                    <div class="col-12 col-md-6 q-pa-md">
                        <QuasarInput v-model="crudEntity.username" :edit-mode="isEditMode"
                            :label="t('model_user_username')" :readonly="loading" :rules="[requireUsername]"
                            :maxlength="20" counter>
                            <template #prepend>
                                <q-icon :name="biPerson" />
                            </template>
                        </QuasarInput>
                        <q-banner class="q-my-sm" :class="isDark ? 'bg-grey-9' : 'bg-grey-3'" dense>
                            <template #avatar>
                                <q-icon :name="biInfoCircle" color="primary" />
                            </template>
                            <p>
                                {{
                                    `${t('helper.username1')}, ${t('helper.username2')}, ${t(
                                        'helper.username3',
                                    )}, ${t('helper.username4')}, ${t('helper.username5')}`
                                }}
                            </p>
                        </q-banner>
                    </div>
                    <div v-if="crudAction == 'new'" class="col-12 col-md-6 q-pa-md">
                        <QuasarInput v-model="crudEntity.password" type="password" :edit-mode="isEditMode"
                            :label="t('model_user_login_password')" :readonly="loading" :rules="[required]">
                            <template #prepend>
                                <q-icon :name="biKey" />
                            </template>
                        </QuasarInput>

                    </div>
                    <div v-if="crudAction == 'view' || crudAction == 'edit'" class="col-12 col-md-6 q-pa-md">
                        <QuasarButton :label="t('base.changePassword')" color="primary" flat :icon="biKey"
                            @click="showChangePasswordForm = true" />
                    </div>
                    <div class="col-12 col-md-6 q-pa-md">
                        <QuasarToggle v-model="crudEntity.active" :edit-mode="isEditMode" :label="t('base.enable')" />
                    </div>
                </div>
                <q-separator />
                <div class="row">
                    <div class="col-12 col-md-6">
                        <div class="q-px-md">
                            <q-icon :name="biPeople" size="sm" />
                            {{ t('model_role') }}
                        </div>
                        <q-card-section>
                            <QuasarInput v-model="filterText" :label="t('base.search')" type="text">
                                <template #prepend>
                                    <q-checkbox v-if="isEditMode" v-model="selectedAll" @click="onCheckedAll">
                                        <q-tooltip>
                                            {{
                                                !selectedAll
                                                    ? t('base.selectAll')
                                                    : t('base.deselectAll')
                                            }}
                                        </q-tooltip>
                                    </q-checkbox>
                                </template>
                                <template #append>
                                    <q-icon :name="biSearch" />
                                </template>
                            </QuasarInput>
                            <BaseScrollArea height="250px">
                                <q-list v-if="filteredList.length > 0" dense>
                                    <q-item v-for="(p, index) in filteredList" :key="index" v-ripple tag="label">
                                        <q-item-section avatar>
                                            <q-checkbox  v-model="crudEntity.selectedRoles" :disable="!isEditMode"  :val="p.id" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>{{
                                                p.name ? p.name : 'unknown'
                                                }}</q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                            </BaseScrollArea>
                        </q-card-section>
                    </div>
                    <div class="col-12 col-md-6">
                        <div class="q-px-md">
                            <q-icon color="positive" :name="biCheck" size="sm" />
                            {{ t('userRoleSelected') }}
                        </div>
                        <q-card-section v-if="crudEntity.selectedRoles">
                            <BaseScrollArea height="250px">
                                <q-list v-if="crudEntity.selectedRoles.length > 0" dense>
                                    <q-item v-for="(s, index) in crudEntity.selectedRoles" :key="index" v-ripple>
                                        <q-item-section avatar>
                                            <q-icon color="primary" :name="biCheck" />
                                        </q-item-section>
                                        <q-item-section>
                                            <q-item-label>{{ findDisplayRoleById(s) }}</q-item-label>
                                        </q-item-section>
                                        <q-item-section v-if="isEditMode" side>
                                            <q-btn flat round color="negative" :icon="biX" @click="removeRole(index)" />
                                        </q-item-section>
                                    </q-item>
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
        <base-dialog v-if="showChangePasswordForm" v-model="showChangePasswordForm" :title="t('base.changePassword')" :icon="biPencil">
            <q-card-section class="q-pt-none">
                <base-password-form
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
            </q-card-section>
        </base-dialog>
    </q-page>
</template>