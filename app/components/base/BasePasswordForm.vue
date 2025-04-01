<script setup lang="ts">
import {
    biCheck,
    biLock,
    biShieldLock,
    biEye,
    biEyeSlash,
} from '@quasar/extras/bootstrap-icons';
import BaseInput from './BaseInput.vue';
const { actionAlign = 'center', showCurrentPassword = false, showLogout = false } = defineProps<{
    submitLabel?: string;
    actionAlign?: 'center' | 'left' | 'right';
    showCurrentPassword?: boolean;
    showLogout?: boolean;
}>();
const { t } = useLang();
const { validatePasswordStrongV2, requireField } = useValidation();
const showPassword = ref(false);

const currentPassword = defineModel<string>('currentPassword');
const newPassword = defineModel<string>('newPassword');
const logoutAllDevice = defineModel<boolean>('logoutAllDevice');
const loading = defineModel<boolean>('loading');
const confirmPassword = ref('');
const emit = defineEmits<{
    'on-submit': [];
}>();
const validateTheSamePwd = (pwd: string) => pwd === newPassword.value;
const isValidPwd = computed(() =>
    newPassword.value ? validatePasswordStrongV2(newPassword.value) : false,
);
const isSamePwd = computed(
    () =>
        confirmPassword.value &&
        newPassword.value &&
        newPassword.value === confirmPassword.value,
);
const onSubmit = () => {
    if (!newPassword.value) {
        return;
    }
    emit('on-submit');
};
</script>
<template>
    <q-form ref="formPwd" @submit="onSubmit">
        <q-card-section>
            <base-alert type="is-warning" :icon="{name:biShieldLock}" :message="t('authen.helper2')" radius class="q-mb-md"/>
            <div class="row">
                <div v-if="showCurrentPassword" class="col-12">
                    <BaseInput v-model="currentPassword" :readonly="loading" autocomplete="off"
                        :type="showPassword ? 'text' : 'password'" :label="t('authen.currentPassword')"
                        :rules="[(val:any) => requireField(val, t('authen.currentPassword'))]">
                        <template #prepend>
                            <q-icon :name="biShieldLock" />
                        </template>
                        <template #append>
                            <q-icon :name="showPassword ? biEye : biEyeSlash" @click="showPassword = !showPassword" />
                        </template>
                    </BaseInput>
                </div>
                <div class="col-12 q-py-sm">
                    <BaseInput v-model="newPassword" class="q-pt-md" :readonly="loading" autocomplete="off"
                        :type="showPassword ? 'text' : 'password'" :label="t('authen.newPassword')" :rules="[
                            (val:any) => requireField(val, t('authen.newPassword')),
                            (val:any) => validatePasswordStrongV2(val) || t('authen.helper2'),
                        ]">
                        <template #prepend>
                            <q-icon :name="biLock" color="grey-9" />
                        </template>
                        <template #append>
                            <q-icon v-if="isValidPwd" :name="biCheck" color="positive" />
                        </template>
                    </BaseInput>
                </div>
                <div class="col-12">
                    <BaseInput v-model="confirmPassword" class="q-pt-md" :readonly="loading"
                        autocomplete="off" :type="showPassword ? 'text' : 'password'"
                        :label="t('authen.confirmPassword')" :rules="[
                            (val:any) => requireField(val, t('authen.confirmPassword')),
                            (val:any) =>
                                validateTheSamePwd(val) || t('error.passwordNotMatchNew'),
                        ]">
                        <template #prepend>
                            <q-icon :name="biLock" color="grey-9" />
                        </template>
                        <template #append>
                            <q-icon v-if="isSamePwd" :name="biCheck" color="positive" />
                        </template>
                    </BaseInput>
                </div>
            </div>
        </q-card-section>
        <q-card-section v-if="showLogout">
            <div>
                <q-checkbox v-model="logoutAllDevice" :label="t('authen.logoutAll')" />
            </div>
        </q-card-section>

        <q-card-actions :align="actionAlign">
            <q-btn unelevated type="submit" color="primary" :label="submitLabel || t('base.okay')" />
        </q-card-actions>

    </q-form>
</template>