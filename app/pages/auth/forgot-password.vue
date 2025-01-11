<script setup lang="ts">
import AuthenService from '~/api/AuthenService';
import type { AppException, ForgotPasswordRequest, ResponseMessage } from '~/types/common';
import {
    bi123,
    biArrowLeft,
    biEnvelope,
    biKey,
    biPersonVcard,
} from '@quasar/extras/bootstrap-icons';
definePageMeta({
    layout: 'empty',
    pageName: 'authen.forgetPassword',
})
useInitPage();
const { requestVerifyCodeToResetPwd, sendVerifyCodeToResetPwd, resetPassword } =
    AuthenService();
const { requireEmail } = useValidation();
const { appLoading, appToast, appNavigateTo } = useBase();
const { t } = useLang();
const stepper = ref();
const step = ref(1);
const entity = ref<ForgotPasswordRequest>({
    email: '',
    token: '',
    newPassword: '',
    confirmPassword: '',
});
const loading = ref(false);
const requestVerifyCode = async () => {
    if (!entity.value.email) {
        return;
    }
    appLoading();
    const res = await requestVerifyCodeToResetPwd(entity.value);
    appLoading(false);
    if (res && res.status && res.status == 200) {
        const responseData = res.data as ResponseMessage;
        if (responseData.message) {
            appToast(responseData.message, {
                type: 'positive',
                multiLine: false,
            });
        }
        if (stepper.value) {
            stepper.value.next();
        }
    } else if (res && res.data) {
        notifyError(res.data as AppException);
    }
};
const verifyCode = async (code?: string) => {
    if (!code || !entity.value.email) {
        return;
    }
    entity.value.token = code;
    appLoading();
    const res = await sendVerifyCodeToResetPwd(entity.value);
    appLoading(false);
    if (res && res.status != undefined && res.status != 200) {
        notifyError(res.data as AppException);
    } else {
        if (stepper.value) {
            stepper.value.next();
        }
    }
};
const notifyError = (error: AppException) => {
    if (error.errors) {
        appToast(error.errors.toString(), {
            type: 'negative',
            multiLine: false,
        });
    }
};
const setNewPassword = async () => {
    if (!entity.value.token || !entity.value.email || !entity.value.newPassword) {
        return;
    }
    appLoading();
    const res = await resetPassword(entity.value);
    appLoading(false);
    if (res && res.status && res.status == 200) {
        const responseData = res.data as ResponseMessage;
        if (responseData.message) {
            appToast(responseData.message, {
                type: 'positive',
                multiLine: false,
            });
        }
        appNavigateTo('/auth/login', { replace: true })
    } else if (res && res.data) {
        notifyError(res.data as AppException);
    }
};
</script>
<template>
    <q-page class="window-height row justify-center items-center content-limit">
        <div class="row context">
            <div class="col-12">
                <QuasarCard style="max-width: 580px;">
                    <q-toolbar>
                        <QuasarButton to="/auth/login" :icon="biArrowLeft" round flat/>
                        <q-toolbar-title>
                            {{ t('authen.forgetPassword') }}
                        </q-toolbar-title>
                    </q-toolbar>
                    <q-separator/>
                    <q-card-section>
                        <q-stepper ref="stepper" v-model="step" flat color="primary" animated>
                            <q-step :name="1" :title="t('authen.verification')" :icon="biPersonVcard" :done="step > 1">
                                <q-form ref="formStep1" class="q-px-sm" @submit="requestVerifyCode">
                                    <div class="q-pa-md text-center">
                                        <div class="text-body1">
                                            {{ t('authen.forgotPwdTitle') }}
                                        </div>
                                        <div class="text-subtitle2 text-muted">
                                            {{ t('authen.forgotPwdSubtitle') }}
                                        </div>
                                    </div>

                                    <QuasarInput v-model="entity.email" :label="t('base.email')"
                                        :rules="[requireEmail]">
                                        <template #prepend>
                                            <q-icon :name="biEnvelope" />
                                        </template>
                                    </QuasarInput>

                                    <q-card-actions align="center">
                                        <QuasarButton unelevated type="submit" color="primary"
                                            :label="t('base.continue')" />
                                    </q-card-actions>
                                </q-form>
                            </q-step>

                            <q-step :name="2" :title="t('authen.verificationCode')" :icon="bi123" :done="step > 2">
                                <div class="q-pa-md text-center">
                                    <div class="text-body1 text-center">
                                        {{ t('authen.login_main_helper4') }}
                                    </div>
                                    <div class="text-subtitle2 text-muted">
                                        {{ t('authen.login_main_helper5') }}
                                    </div>
                                    <div class="text-subtitle2 text-warning">
                                        {{ t('authen.login_main_helper6') }}
                                    </div>
                                </div>

                                <QuasarInputOtp :input-length="6" @on-submit="verifyCode" />
                                <q-card-actions align="center">
                                    <QuasarButton flat color="primary" class="q-ml-sm" :label="t('base.previous')"
                                        @click="step = 1" />
                                </q-card-actions>
                            </q-step>

                            <q-step :name="3" :title="t('authen.setPassword')" :icon="biKey" :done="step > 3">
                                <BasePasswordForm v-model:new-password="entity.newPassword" v-model:loading="loading"
                                    @on-submit="setNewPassword" />
                            </q-step>
                        </q-stepper>
                    </q-card-section>
                </QuasarCard>
            </div>
        </div>
    </q-page>
</template>