<script setup lang="ts">
import { biChevronExpand, biEye, biEyeSlash, biGlobe, biLock, biMoon, biPerson, biSun } from '@quasar/extras/bootstrap-icons';
useSeoMeta({
    title: 'Login'
})
definePageMeta({
    layout: 'empty',
    // middleware: ["auth"]
    pageName: 'authen.login',
})
useInitPage();
const { signin } = useAuth();
const { t, currentLangugeName } = useLang();
const { isDark } = useTheme();
const { getDeviceId } = useDevice();
const { required } = useValidation();
const { screen } = useQuasar();
const cardHeight = ref('700px');
const email = ref<string | null>('admin@mydomain.com');
const password = ref<string | null>('P@ssw0rd');
const showPassword = ref<boolean>(false);
const loading = ref<boolean>(false);
const loginForm = ref(null);
const slide = ref('style');
const deviceId = ref();
const onSubmit = async () => {
    loading.value = true;
    deviceId.value = await getDeviceId();
    await signin({
        emailOrUsername: email.value,
        password: password.value,
        loginFrom: 'WEB',
        deviceId: deviceId.value ? deviceId.value : null,
    });
    loading.value = false;
};
const onReset = () => {
    email.value = null;
    password.value = null;
    showPassword.value = false;
};
</script>
<template>
    <q-page class="window-height row justify-center items-center">
        <div class="row context">
            <div v-if="!screen.sm && !screen.xs"  class="col-12 col-md-6 bg-fansy">
                <q-card square flat class="q-pb-lg bg-fansy"
                    :style="`max-width: 480px; height: ${cardHeight}`">
                    <q-card-section>
                        <q-carousel v-model="slide" autoplay infinite transition-prev="scale" transition-next="scale"
                            swipeable animated control-color="white" navigation height="500px"
                            class="bg-transparent text-white rounded">
                            <q-carousel-slide name="style" class="column no-wrap flex-center">
                                <div class="q-mt-md text-center">
                                    <img src="/logo/logo-white.png" style="height: 175px; width: auto">
                                    <div class="text-h3 text-weight-bolder">Nuxt 3 Quasar</div>
                                    <div class="text-subtitle1 q-mt-lg">
                                        Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry.
                                    </div>
                                </div>
                            </q-carousel-slide>
                            <q-carousel-slide name="tv" class="column no-wrap flex-center">
                                <img src="/logo/logo-white.png" style="height: 175px; width: auto">
                                <div class="text-subtitle1 q-mt-md text-center">
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry.
                                </div>
                            </q-carousel-slide>
                            <q-carousel-slide name="layers" class="column no-wrap flex-center">
                                <img src="/logo/logo-white.png" style="height: 205px; width: auto">
                                <div class="text-subtitle1 q-mt-md text-center">
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry.
                                </div>
                            </q-carousel-slide>
                            <q-carousel-slide name="map" class="column no-wrap flex-center">
                                <img src="/logo/logo-white.png" style="height: 175px; width: auto">
                                <div class="text-subtitle1 q-mt-md text-center">
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry.
                                </div>
                            </q-carousel-slide>
                        </q-carousel>
                    </q-card-section>
                </q-card>
            </div>
            <div class="col-12 col-md-6">
                <q-card square flat bordered class="q-pa-lg"
                    :style="`max-width: 480px; height: ${cardHeight};min-width:350px`">
                    <!-- <q-toolbar class="q-py-xs" style="background: none" :class="isDark
                        ? 'app-second-bg-color-theme-dark text-white'
                        : 'text-black'
                        ">
                        <q-space />
                        <q-btn flat no-wrap :icon="biGlobe" :label="currentLangugeName">
                            <q-icon class="q-ml-sm" :name="biChevronExpand" size="16px" />
                            <BaseThemeSwitcher />
                        </q-btn>
                    </q-toolbar> -->
                    <q-card-section class="text-center">
                        <q-img :src="isDark
                            ? '/logo/logo-white.png'
                            : '/logo/logo-black.png'
                            " spinner-color="white" style="height: auto; max-width: 120px" />
                        <div class="text-h4 text-weight-bolder q-my-md">
                            {{ t('base.loginTitle') }}
                        </div>
                        <div class="text-body1 text-grey-6 q-my-md">
                            {{ t('base.loginTitle2') }}
                        </div>
                    </q-card-section>
                    <q-form ref="loginForm" class="q-px-sm" @submit.prevent="onSubmit" @reset="onReset()">
                        <q-card-section>
                            <BaseInput v-model="email" :readonly="loading" :dense="false" :label="t('base.emailOrUsername')"
                                :rules="[required]">
                                <template #prepend>
                                    <q-icon :name="biPerson" color="grey-9" />
                                </template>
                            </BaseInput>
                            <BaseInput v-model="password" class="q-pt-lg" :readonly="loading" :dense="false"
                                :type="showPassword ? 'text' : 'password'" :label="t('authen.password')"
                                :rules="[required]">
                                <template #prepend>
                                    <q-icon :name="biLock" color="grey-9" />
                                </template>
                                <template #append>
                                    <q-icon :name="showPassword ? biEye : biEyeSlash" class="cursor-pointer"
                                        color="grey-9" @click="showPassword = !showPassword" />
                                </template>
                            </BaseInput>
                        </q-card-section>
                        <q-card-actions>
                            <BaseButton unelevated :loading="loading" size="lg" color="primary" class="full-width text-white"
                                :label="t('authen.login')" type="submit" />
                        </q-card-actions>
                    </q-form>
                    <q-card-section class="text-center q-pa-sm">
                        <BaseLink to="/auth/forgot-password">
                            {{ t('authen.forgetPassword') }}
                        </BaseLink>
                        

                        <q-separator class="q-my-md" />
                        <div class="row items-center q-gutter-x-md justify-center">
                            <div :class="isDark ? 'text-grey-5' : 'text-grey-7'">
                                {{ `@ ${getYearNow()} ${t('app.monogram')}` }}
                            </div>
                            <q-btn size="13px" flat dense no-caps no-wrap :icon="biGlobe" :label="currentLangugeName">
                                <q-icon class="q-ml-sm" :name="biChevronExpand" size="14px" />
                                <BaseLangugeSwitcher anchor="top left" self="bottom left" close-on-click />
                            </q-btn>
                            <q-btn size="13px" dense flat no-caps no-wrap :icon="isDark ? biMoon : biSun">
                                <q-icon class="q-ml-sm" :name="biChevronExpand" size="14px" />
                                <BaseThemeSwitcher anchor="top left" self="bottom left" close-on-click />
                            </q-btn>
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    </q-page>
</template>
<style lang="scss" scoped>
.bg-fansy {
    background: #FF4E50;  /* fallback for old browsers */
background: -webkit-linear-gradient(to bottom, #F9D423, #FF4E50);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to bottom, #F9D423, #FF4E50); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */


}
</style>