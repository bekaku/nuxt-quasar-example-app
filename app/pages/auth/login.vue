<script setup lang="ts">
import {
  biChevronExpand,
  biEye,
  biEyeSlash,
  biGlobe,
  biLock,
  biMoon,
  biPerson,
  biSun
} from '@quasar/extras/bootstrap-icons'
useSeoMeta({
  title: 'Login'
})
definePageMeta({
  layout: 'empty',
  // middleware: ["auth"]
  pageName: 'authen.login'
})
useInitPage()
const { signin } = useAuth()
const { t } = useLang()
const { isDark } = useTheme()
const { getDeviceId } = useAppDevice()
const { required } = useValidation()
const email = ref<string | null>('admin@mydomain.com')
const password = ref<string | null>('P@ssw0rd')
const showPassword = ref<boolean>(false)
const loading = ref<boolean>(false)
const loginForm = ref(null)
const rememberMe = ref(false)
const deviceId = ref()
const onSubmit = async () => {
  loading.value = true
  deviceId.value = await getDeviceId()
  try {
    await signin({
      emailOrUsername: email.value,
      password: password.value,
      loginFrom: 'WEB',
      deviceId: deviceId.value ? deviceId.value : null
    })
  } finally {
    loading.value = false
  }
}
const onReset = () => {
  email.value = null
  password.value = null
  showPassword.value = false
}
</script>
<template>
  <BasePage
    :padding="false"
    :class="{ 'bg-white': !isDark, 'app-second-bg-color-theme-dark': isDark }"
  >
    <div class="row items-center q-pa-md" style="height: 100vh">
      <!-- Left Column - Fantasy Background -->
      <div class="col-12 col-md-6 fantasy-bg">
        <div class="overlay flex flex-center text-white">
          <div class="q-pa-xl text-center">
            <h2 class="text-h2 text-weight-bold q-mb-md">Welcome to Our {{ t('app.monogram') }}</h2>
            <p class="text-h5">Embark on your next adventure</p>
          </div>
        </div>
      </div>
      <!-- Right Column - Login Form -->
      <div class="col-12 col-md-6 flex flex-center">
        <div class="q-pa-md" style="width: 70%; max-width: 80%">
          <div class="text-center q-mb-xl">
            <q-avatar size="100px" class="q-mb-md" square>
              <q-img
                :src="isDark ? '/logo/logo-white.png' : '/logo/logo-black.png'"
                spinner-color="white"
                alt="logo"
                style="height: auto; max-width: 120px"
              />
            </q-avatar>
            <div class="text-h4 text-weight-bolder q-my-md">
              {{ t('base.loginTitle') }}
            </div>
            <div class="text-body1 text-grey-6 q-my-md">
              {{ t('base.loginTitle2') }}
            </div>
          </div>

          <q-form ref="loginForm" class="q-gutter-md" @submit.prevent="onSubmit" @reset="onReset()">
            <BaseInput
              v-model="email"
              :readonly="loading"
              :dense="false"
              :label="t('base.emailOrUsername')"
              :rules="[required]"
            >
              <template #prepend>
                <q-icon :name="biPerson" color="grey-9" />
              </template>
            </BaseInput>
            <BaseInput
              v-model="password"
              :readonly="loading"
              :dense="false"
              :type="showPassword ? 'text' : 'password'"
              :label="t('authen.password')"
              :rules="[required]"
            >
              <template #prepend>
                <q-icon :name="biLock" color="grey-9" />
              </template>
              <template #append>
                <q-icon
                  :name="showPassword ? biEye : biEyeSlash"
                  class="cursor-pointer"
                  color="grey-9"
                  @click="showPassword = !showPassword"
                />
              </template>
            </BaseInput>

            <div class="row items-center justify-between">
              <q-checkbox v-model="rememberMe" label="Remember me" />
              <BaseLink to="/auth/forgot-password" color="primary">
                {{ t('authen.forgetPassword') }}
              </BaseLink>
            </div>

            <div class="q-px-sm">
              <BaseButton
                unelevated
                :loading="loading"
                size="lg"
                color="primary"
                class="full-width text-white"
                :label="t('authen.login')"
                type="submit"
              />
            </div>
          </q-form>

          <div class="text-center q-mt-lg">
            Don't have an account?
            <BaseLink to="/signup" color="primary">Sign Up</BaseLink>
            <!-- <BaseLink to="/auth/forgot-password">
                                {{ t('authen.forgetPassword') }}
                            </BaseLink> -->

            <q-separator class="q-my-md" />
            <div class="row items-center q-gutter-x-md justify-center">
              <!-- <q-btn
                size="13px"
                flat
                dense
                no-caps
                no-wrap
                :icon="biGlobe"
                :label="currentLangugeName"
              >
                <q-icon class="q-ml-sm" :name="biChevronExpand" size="14px" />
                <BaseLangugeSwitcher anchor="top left" self="bottom left" close-on-click />
              </q-btn> -->
              <LazyBaseLangugeSwitcherButton anchor="top left" self="bottom left" close-on-click />
              <BaseThemeSwitcher />
              <div :class="isDark ? 'text-grey-5' : 'text-grey-7'">
                {{ `@ ${getYearNow()} ${t('app.monogram')}` }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BasePage>
</template>
<style scoped>
.fantasy-bg {
  background-image: url('https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');
  background-size: cover;
  background-position: center;
  min-height: 90vh;
  border-radius: 20px;
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(16, 0, 43, 0) 0%, rgba(52, 0, 87, 0.6) 100%);

  border-radius: 20px;
}

@media (max-width: 768px) {
  .fantasy-bg {
    min-height: 40vh;
    /* border-radius: 20px 20px 0 0; */
    border-radius: 0 0 0 0;
  }

  .overlay {
    /* border-radius: 20px 20px 0 0; */
    border-radius: 0 0 0 0;
  }
}
@media (max-width: 1180px) {
  .fantasy-bg {
    min-height: 40vh;
    border-radius: 0 0 0 0;
  }
  .overlay {
    border-radius: 0 0 0 0;
  }
}
</style>
