<script setup lang="ts">
import { biFileBarGraph, biFileEarmark, biPencil, biShieldCheck, biUiChecks } from '@quasar/extras/bootstrap-icons';
import { PermissionPermission } from '~/libs/appPermissions';
import type { LabelValue } from '~/types/common';
import type { Permission } from '~/types/models';
definePageMeta({
    pageName: 'model_permission',
    requiresPermission: [PermissionPermission.view],
})
useInitPage();
// const { getParam } = useBase();
// const crud = ref<ICrudAction | undefined>(getParam<ICrudAction>('crud'));
// const id = ref<number | undefined>(getParam<number>('id'));
// console.log(`Permission/:crud/:id => crud : ${crud.value} - id : ${id.value}`);
const entity: Permission = Object.freeze<Permission>({
    id: null,
    code: '',
    remark: null,
    description: null,
    operationType: 1,
    frontEnd: false,
});
const {
    crudAction,
    onBack,
    loading,
    onSubmit,
    crudEntity,
    onDelete,
    crudName,
    onEnableEditForm,
    isEditMode
} = useCrudForm<Permission>(
    {
        crudName: 'permission',
        apiEndpoint: '/api',
    },
    entity,
);
const { required } = useValidation();
const { t } = useLang();
const radios: LabelValue<number>[] = [
    { label: 'Crud', value: 1, icon: biUiChecks },
    { label: 'Report', value: 2, icon: biFileBarGraph },
    { label: 'Other', value: 3, icon: biFileEarmark },
]
const onSubmitCuntom = () => {
    console.log('onSubmitCuntom');
}
</script>
<template>
    <q-page padding>
        <base-crud-form :crud-action="crudAction" :loading="loading" :crud-entity="crudEntity" :crud-name="crudName"
            :icon="biShieldCheck" :title="t('model_permission')" :full-width="false" @on-back="onBack"
            @on-edit-enable="onEnableEditForm" @on-submit="onSubmitCuntom" @on-delete="onDelete">
            <template #crudFromContent>
                <div class="row">
                    <div class="col-12 col-md-6 q-pa-md">
                        <QuasarInput v-model="crudEntity.code" :edit-mode="isEditMode" :icon="biShieldCheck"
                            :label="t('model_permission_name')" :rules="[required]" :maxlength="125" />
                    </div>
                    <div class="col-12 col-md-6 q-pa-md">
                        <QuasarInput v-model="crudEntity.remark" :edit-mode="isEditMode" :icon="biPencil"
                            :label="t('model_permission_description')" :maxlength="255" />
                    </div>
                    <div class="col-12 col-md-6 q-pa-md">
                        <QuasarToggle v-model="crudEntity.frontEnd" :disable="!isEditMode" label="Frontend" />
                    </div>
                    <div class="col-12 col-md-6 q-pa-md">
                        <div class="q-px-sm">Permission type</div>
                        <QuasarRadio v-model="crudEntity.operationType" :disable="!isEditMode" :items="radios"
                            :inline="false" />
                    </div>
                </div>
            </template>
        </base-crud-form>
    </q-page>

</template>