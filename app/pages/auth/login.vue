<script setup lang="ts">
useSeoMeta({
  title: 'Login'
})
definePageMeta({
  layout: 'empty',
  // middleware: ["auth"]
  pageName: 'authen.login'
})
useInitPage()
const { t } = useLang()
const { isDark } = useTheme()
const { getQuery } = useBase()
const { appVersion } = useConfiguration()
const redirectTo = ref<string | undefined>(getQuery('continue'))
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
          <BaseLoginForm auto-redirect :redirect-to="redirectTo || '/'" />
          <div class="text-center q-mt-lg">
            Don't have an account?
            <BaseLink to="/signup" color="primary">Sign Up</BaseLink>
            <q-separator class="q-my-md" />
            <div class="row items-center q-gutter-x-md justify-center">
              <LazyBaseLangugeSwitcherButton anchor="top left" self="bottom left" close-on-click />
              <BaseThemeSwitcher />
              <div :class="isDark ? 'text-grey-5' : 'text-grey-7'">
                {{ `@ ${getYearNow()} ${t('app.monogram')} v${appVersion}` }}
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
