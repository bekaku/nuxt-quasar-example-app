<script setup lang="ts">
definePageMeta({
  layout: 'empty',
  pageName: 'authen.addProfile'
})
useInitPage()
const { t } = useLang()
const { isDark } = useTheme()
</script>
<template>
  <BasePage :full="false" class="row justify-center items-center">
    <div class="full-width">
      <BaseCard flat :bordered="false">
        <q-card-section>
          <div class="row">
            <div class="col-12 col-md-7 q-pa-md">
              <div class="row items-center justify-center" style="height: 100%">
                <div>
                  <q-img
                    :src="isDark ? '/logo/logo-white.png' : '/logo/logo-black.png'"
                    spinner-color="white"
                    alt="logo"
                    style="height: auto; max-width: 120px"
                  />
                  <div class="text-h5 q-pt-md">
                    {{ t('authen.addProfile') }}
                  </div>
                  <p class="text-muted">{{ t('app.name') }}</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-5 q-pa-md">
              <BaseLoginForm
                ref="loginFormRef"
                :recovery-password-btn="false"
                verify-duplicate
                auto-redirect
              />
              <div class="row justify-center items-center q-pt-sm q-gutter-md">
                <BaseLink to="/" color="primary">
                  {{ t('base.home') }}
                </BaseLink>
                <BaseLink to="/auth/forgot-password" color="primary">
                  {{ t('authen.forgetPassword') }}
                </BaseLink>
                <BaseLangugeSwitcherButton anchor="top left" self="bottom left" close-on-click />
              </div>
            </div>
          </div>
        </q-card-section>
      </BaseCard>
    </div>
  </BasePage>
</template>
