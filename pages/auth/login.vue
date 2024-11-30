<script setup lang="ts">
import { biChevronExpand, biEye, biEyeSlash, biGlobe, biLock, biPerson } from '@quasar/extras/bootstrap-icons';
useSeoMeta({
    title: 'Login'
})
definePageMeta({
    layout: 'empty',
    middleware: ["auth"]
})
const { singin } = useAuth();
const { t, currentLangugeName } = useLang();
const { dark } = useTheme();
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
    await singin({
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
            <div class="col-12 col-md-6 bg-primary">
                <q-card square flat class="q-pb-lg bg-primary" v-if="!screen.sm && !screen.xs"
                    :style="`max-width: 480px; height: ${cardHeight}`">
                    <q-card-section>
                        <q-carousel autoplay infinite v-model="slide" transition-prev="scale" transition-next="scale"
                            swipeable animated control-color="white" navigation height="500px"
                            class="bg-primary text-white rounded-borders">
                            <q-carousel-slide name="style" class="column no-wrap flex-center">
                                <div class="q-mt-md text-center">
                                    <img src="/logo/logo-white.png" style="height: 175px; width: auto" />
                                    <div class="text-h3 text-weight-bolder">Nuxt 3 Quasar</div>
                                    <div class="text-subtitle1 q-mt-lg">
                                        Lorem Ipsum is simply dummy text of the printing and
                                        typesetting industry.
                                    </div>
                                </div>
                            </q-carousel-slide>
                            <q-carousel-slide name="tv" class="column no-wrap flex-center">
                                <img src="/logo/logo-white.png" style="height: 175px; width: auto" />
                                <div class="text-subtitle1 q-mt-md text-center">
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry.
                                </div>
                            </q-carousel-slide>
                            <q-carousel-slide name="layers" class="column no-wrap flex-center">
                                <img src="/logo/logo-white.png" style="height: 205px; width: auto" />
                                <div class="text-subtitle1 q-mt-md text-center">
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry.
                                </div>
                            </q-carousel-slide>
                            <q-carousel-slide name="map" class="column no-wrap flex-center">
                                <img src="/logo/logo-white.png" style="height: 175px; width: auto" />
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
                    <!-- <q-toolbar class="q-py-xs" style="background: none" :class="dark.isActive
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
                        <q-img :src="dark.isActive
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
                    <q-form @submit="onSubmit" @reset="onReset()" ref="loginForm" class="q-px-sm">
                        <q-card-section>
                            <q-input :readonly="loading" outlined v-model="email" :label="t('base.emailOrUsername')"
                                :rules="[required]">
                                <template v-slot:prepend>
                                    <q-icon :name="biPerson" color="grey-9" />
                                </template>
                            </q-input>
                            <q-input class="q-pt-lg" :readonly="loading" outlined v-model="password"
                                :type="showPassword ? 'text' : 'password'" :label="t('authen.password')"
                                :rules="[required]">
                                <template v-slot:prepend>
                                    <q-icon :name="biLock" color="grey-9" />
                                </template>
                                <template v-slot:append>
                                    <q-icon :name="showPassword ? biEye : biEyeSlash"
                                        @click="showPassword = !showPassword" class="cursor-pointer" color="grey-9" />
                                </template>
                            </q-input>
                        </q-card-section>
                        <q-card-actions>
                            <q-btn unelevated :loading="loading" size="lg" color="primary" class="full-width text-white"
                                :label="t('authen.login')" type="submit" />
                        </q-card-actions>
                    </q-form>
                    <q-card-section class="text-center q-pa-sm">
                        <NuxtLink to="/auth/forgot-password" class="app-text-link">
                            {{ t('authen.forgetPassword') }}
                        </NuxtLink>

                        <q-separator class="q-my-md" />
                        <div class="row items-center q-gutter-x-md justify-center">
                            <div :class="dark.isActive ? 'text-grey-5' : 'text-grey-7'">
                                {{ `@ ${getYearNow()} ${t('app.monogram')}` }}
                            </div>
                            <q-btn size="13px" flat no-caps no-wrap :icon="biGlobe" :label="currentLangugeName">
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