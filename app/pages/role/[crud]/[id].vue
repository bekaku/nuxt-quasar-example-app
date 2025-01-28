<script setup lang="ts">
import { biCheck2, biPeople, biSearch, biShieldCheck, biShieldLock, biX } from '@quasar/extras/bootstrap-icons';
import PermissionService from '~/api/PermissionService';
import { RoleFormBreadcrumb } from '~/libs/appBreadcrumbs';
import { RolePermission } from '~/libs/appPermissions';
import type { Permission, Role } from '~/types/models';
const { t } = useLang();
const { required } = useValidation();
definePageMeta({
  pageName: 'model.role.table',
  requiresPermission: [RolePermission.view],
  breadcrumbs: RoleFormBreadcrumb,
})
useInitPage();
const { appLoading } = useBase();
const { findAllBackendPermission } = PermissionService();
const entity: Role = Object.freeze<Role>({
  id: null,
  name: '',
  nameEn: null,
  active: true,
  frontEnd: false,
  selectdPermissions: [],
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
} = useCrudForm<Role>(
  {
    crudName: 'role',
    apiEndpoint: '/api',
    fectchDataOnLoad: false
  },
  entity
);
const permissions = ref<Permission[]>([]);
const filterText = ref('');
const selectedAll = ref(false);
onMounted(() => {
  onLoadData();
});
const onLoadData = async () => {
  appLoading(true);
  const response = await findAllBackendPermission();
  if (response) {
    permissions.value = response;
  }

  // const frontends = await findAllFrontendPermission();
  // if (frontends) {
  //   permissions.value.push(...frontends);
  // }

  await preFectData();
  appLoading(false);
};
const filteredList = computed(() => {
  const list = permissions.value;
  const search = filterText.value
    ? filterText.value.toLowerCase().trim()
    : null;
  if (!search) {
    return list;
  }
  return list.filter(
    (c: Permission) =>
      c.description && c.description.toString().toLowerCase().includes(search),
  );
});
const filteredCrudList = computed(() =>
  filteredList.value.filter(
    (c: Permission) => c.operationType === 1 && !c.frontEnd,
  ),
);
const filteredReportList = computed(() =>
  filteredList.value.filter(
    (c: Permission) => c.operationType === 2 && !c.frontEnd,
  ),
);
const filteredOtherList = computed(() =>
  filteredList.value.filter(
    (c: Permission) => c.operationType === 3 && !c.frontEnd,
  ),
);
// const filteredFrontendList = computed(() =>
//   filteredList.value.filter((c: Permission) => c.frontEnd),
// );

const findDisplayPermissionById = (id: number) => {
  const item = permissions.value.find((p) => p.id === id);
  return item && item.description ? item.description : 'unknown';
};
const findCodePermissionById = (id: number) => {
  const item = permissions.value.find((p) => p.id === id);
  return item && item.code ? item.code : 'unknown';
};
const removePermission = (index: number) => {
  if (crudEntity.value && crudEntity.value.selectdPermissions) {
    crudEntity.value.selectdPermissions.splice(index, 1);
  }
};
const onCheckedAll = () => {
  updateSelectedAll(selectedAll.value);
};
const updateSelectedAll = (val: boolean) => {
  crudEntity.value.selectdPermissions = [];
  if (val) {
    for (let i = 0; i < permissions.value.length; i++) {
      const item = permissions.value[i];
      if (item && item.id) {
        crudEntity.value.selectdPermissions.push(item.id);
      }
    }
  }
};
</script>

<template>
  <QuasarPage>
    <BaseCrudForm :icon="biPeople" :title="t('model.role.table')" :crud-name="crudName" :crud-action="crudAction"
      :crud-entity="crudEntity" :full-width="true" :list-permission="[RolePermission.list]"
      :manage-permission="[RolePermission.manage]" :loading="loading" @on-back="onBack" @on-submit="onSubmit"
      @on-delete="onDelete" @on-edit-enable="onEnableEditForm">
      <template #crudFromContent>
        <div class="row">
          <div class="col-12 q-pa-md">
            <QuasarInput v-model="crudEntity.name" :readonly="loading" :edit-mode="isEditMode" :label="t('model.role.name')" type="text"
              :rules="[required]" :maxlength="125" counter>
              <template #hint>
                <span class="text-negative">*</span>
              </template>
            </QuasarInput>
          </div>
          <div class="col-12 col-md-4  q-px-md q-gutter-md">
            <QuasarChekbox v-model="crudEntity.active" :edit-mode="isEditMode" :label="t('model.role.active')" />
          </div>
        </div>
        <q-separator />
        <div class="row">
          <div class="col-12 col-md-6">
            <div class="q-px-md">
              <q-icon :name="biShieldLock" size="sm" color="negative" />
              {{ t('model_permission') }}
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
              <BaseScrollArea height="450px">
                <q-list v-if="filteredList.length > 0" dense>
                  <q-item-label header>{{ t('crudPermission') }}</q-item-label>
                  <q-separator spaced />
                  <q-item v-for="(p, index) in filteredCrudList" :key="index" v-ripple tag="label">
                    <q-item-section avatar>
                      <q-checkbox v-model="crudEntity.selectdPermissions" :disable="!isEditMode" :val="p.id" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{
                        p.description ? p.description : 'unknown'
                      }}</q-item-label>
                      <q-item-label caption>
                        {{
                          p.code
                        }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item-label header>{{
                    t('reportPermission')
                  }}</q-item-label>
                  <q-separator spaced />
                  <q-item v-for="(r, index) in filteredReportList" :key="index" v-ripple tag="label">
                    <q-item-section avatar>
                      <q-checkbox v-model="crudEntity.selectdPermissions" :val="r.id" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{
                        r.description ? r.description : 'unknown'
                      }}</q-item-label>
                      <q-item-label caption>
                        {{
                          r.code
                        }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item-label header>{{ t('otherPermission') }}</q-item-label>
                  <q-separator spaced />
                  <q-item v-for="(o, index) in filteredOtherList" :key="index" v-ripple tag="label">
                    <q-item-section avatar>
                      <q-checkbox v-model="crudEntity.selectdPermissions" :val="o.id" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{
                        o.description ? o.description : 'unknown'
                      }}</q-item-label>
                      <q-item-label caption>
                        {{
                          o.code
                        }}
                      </q-item-label>
                    </q-item-section>
                  </q-item>

                  <!-- <q-item-label header>Frontend</q-item-label>
                  <q-separator spaced />
                  <q-item v-for="(f, index) in filteredFrontendList" :key="index" v-ripple tag="label">
                    <q-item-section avatar>
                      <q-checkbox v-model="crudEntity.selectdPermissions" :val="f.id" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{
                        f.description ? f.description : 'unknown'
                        }}</q-item-label>
                      <q-item-label caption>
                        {{
                          f.code
                        }}
                      </q-item-label>
                    </q-item-section>
                  </q-item> -->
                </q-list>
                <template v-else>
                  <base-result status="empty" :description="t('error.dataNotfound')" />
                </template>
              </BaseScrollArea>
            </q-card-section>
          </div>
          <div class="col-12 col-md-6">
            <div class="q-px-md">
              <q-icon color="positive" :name="biShieldCheck" size="sm" />
              {{ t('permissionGrant') }}
            </div>
            <q-card-section>
              <BaseScrollArea height="450px">
                <q-list v-if="crudEntity.selectdPermissions.length > 0" dense>
                  <q-item
                    v-for="(s, index) in crudEntity.selectdPermissions"
                    :key="index"
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-icon color="primary" :name="biCheck2" />
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{
                        findDisplayPermissionById(s)
                      }}</q-item-label>
                        <q-item-label caption>{{
                          findCodePermissionById(s)
                        }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section v-if="isEditMode" side>
                      <q-btn
                        flat
                        round
                        color="negative"
                        :icon="biX"
                        @click="removePermission(index)"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
                <template v-else>
                  <base-result
                    status="empty"
                    icon-size="55px"
                    :description="t('permissionNotFound')"
                  />
                </template>
              </BaseScrollArea>
            </q-card-section>
          </div>
        </div>
      </template>
    </BaseCrudForm>
  </QuasarPage>
</template>
