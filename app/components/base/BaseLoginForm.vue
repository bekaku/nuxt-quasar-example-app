<script setup lang="ts">
import {
  biExclamationOctagonFill,
  biEye,
  biEyeSlash,
  biLock,
  biPerson
} from '@quasar/extras/bootstrap-icons'
import UserService from '~/api/UserService'
import type { RefreshTokenResponse } from '~/types/common'
const {
  recoveryPasswordBtn = true,
  verifyDuplicate = false,
  autoRedirect = true,
  redirectTo = '/'
} = defineProps<{
  recoveryPasswordBtn?: boolean
  verifyDuplicate?: boolean
  autoRedirect?: boolean
  redirectTo?: string
}>()
const emit = defineEmits<{
  'on-success': [RefreshTokenResponse | null]
}>()
const { signin } = useAuth()
const { t } = useLang()
const { inputSanitizeHtml } = useBase()
const { required } = useValidation()
const { verifyUserByEmailOrUsername } = UserService()
const { getAllJwtToken } = useAppCookie()
const { sendBroradcastChanelReload } = useAppBroadcastChannels()
const email = ref<string | null>('admin@mydomain.com')
const password = ref<string | null>('P@ssw0rd')
const showPassword = ref<boolean>(false)
const loading = ref<boolean>(false)
const loginForm = ref(null)
const rememberMe = ref(false)
const veryfySuccess = ref<boolean>(!verifyDuplicate)
const showError = ref<boolean>(false)
const errorMessage = ref<string | undefined>()
const redirectTimeout = ref<any>(null)
const validateUsername = computed(() => {
  return !!email.value && email.value.trim().length >= 4
})
const canSubmit = computed(() => {
  return validateUsername.value && !!password.value
})
const onSubmit = async () => {
  if (!email.value || !password.value) {
    return
  }
  loading.value = true
  try {
    const response = await signin({
      emailOrUsername: inputSanitizeHtml(email.value),
      password: inputSanitizeHtml(password.value),
      loginFrom: 'WEB'
    })
    if (autoRedirect && redirectTo && response != null && response.authenticationToken) {
      await sendBroradcastChanelReload()
      redirectTimeout.value = setTimeout(() => {
        window.location.replace(redirectTo !== undefined ? redirectTo : '/')
      }, 350)
    }
    emit('on-success', response)
  } catch (error) {
    console.error('BaseLoginForm', error)
    emit('on-success', null)
  } finally {
    loading.value = false
  }
}
const onVeryfyAccount = async () => {
  if (!email.value) {
    return
  }
  showError.value = false
  loading.value = true
  try {
    const response = await verifyUserByEmailOrUsername(inputSanitizeHtml(email.value))
    if (response && response.userId != null) {
      const allJwts = await getAllJwtToken()
      if (allJwts && allJwts.length > 0) {
        const jwtExist = allJwts.find(jwt => jwt.userId == response.userId)
        if (jwtExist) {
          veryfySuccess.value = false
          showError.value = true
          errorMessage.value = t('error.userNameDuplicateInDevice')
        } else {
          veryfySuccess.value = true
          showError.value = false
          errorMessage.value = undefined
        }
      }
    } else {
      veryfySuccess.value = false
      showError.value = true
      errorMessage.value = t('error.emailOrUsernameNotFound')
    }
  } catch (error) {
    console.error('BaseLoginForm', error)
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
  <q-form ref="loginForm" class="q-gutter-md" @submit.prevent="onSubmit" @reset="onReset()">
    <BaseAlert
      v-if="showError == true && errorMessage"
      :message="errorMessage"
      :icon="{
        name: biExclamationOctagonFill
      }"
      radius
      type="is-danger"
      class="q-mb-sm"
      closeable
    />
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
    <template v-if="veryfySuccess">
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
    </template>
    <div v-if="recoveryPasswordBtn" class="row items-center justify-between">
      <q-checkbox v-model="rememberMe" label="Remember me" />
      <BaseLink to="/auth/forgot-password" color="primary">
        {{ t('authen.forgetPassword') }}
      </BaseLink>
    </div>

    <div class="q-px-sm">
      <template v-if="verifyDuplicate && !veryfySuccess">
        <BaseButton
          :disable="!validateUsername"
          :loading="loading"
          :label="t('base.continue')"
          full
          @click="onVeryfyAccount"
        />
      </template>
      <template v-else-if="veryfySuccess">
        <BaseButton
          unelevated
          :loading="loading"
          size="lg"
          color="primary"
          class="full-width text-white"
          :label="t('authen.login')"
          type="submit"
        />
      </template>
    </div>
  </q-form>
</template>
