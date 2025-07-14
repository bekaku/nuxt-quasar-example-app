<script setup lang="ts">
import UserService from '~/api/UserService'
const { findCurrentUserData } = UserService()
const { t, locale, onSetLocale } = useLang()
const test = ref()
useSeoMeta({
  title: 'Test Page'
})
definePageMeta({
  layout: 'empty'
})
const {
  currentUserId,
  setAuthenToken,
  getCurrentUserToken,
  getAllJwtToken,
  getAllJwtRefreshToken,
  removeAuthToken
} = useAppCookie()
const {onSwithUser} = useAuth()
const testFn = async () => {
  await findCurrentUserData()
}
const logined = async (uid: number) => {
  // currentUserId.value = uid
  await setAuthenToken({
    authenticationToken: `jwt_key_from_server_u_${uid}`,
    refreshToken: `refresh_key_from_server_u_${uid}`,
    userId: uid
  })
}
const showAllJWTCookieds = async () => {
  const cookies = await getAllJwtToken()
  const cookiesRefresh = await getAllJwtRefreshToken()
  console.log({ cookies, cookiesRefresh })
}
const showCurrentUserToken = async () => {
  const curentToken = await getCurrentUserToken()
  console.log('currentToken', curentToken)
}

const logOutCurrent = async () => {
  await removeAuthToken()
}

const swithUserTo = (uid: number) => {
  onSwithUser(uid)
}

const testServerCookie = async () => {
  const res = await $fetch('/api/test-cookie') // call api in internal server path /src/server/api/now.ts
  console.log('/api/test-cookie', res)
}
</script>
<template>
  <BasePage>
    <div>{{ t('app.name') }}</div>

    <p>currentUserId {{ currentUserId }}</p>

    <div class="row q-gutter-lg">
      <BaseButton label="Back" to="/" color="orange-14" />
      <BaseButton label="testServerCookie" @click="testServerCookie" />
      <BaseButton label="Test Fetch" @click="testFn" />

      <BaseButton label="showAllJWTCookieds" @click="showAllJWTCookieds" />
      <BaseButton label="getCurrentUserToken" @click="showCurrentUserToken" />

      <BaseButton label="logined1" color="purple" @click="logined(1)" />
      <BaseButton label="logined2" color="purple" @click="logined(2)" />

      <BaseButton label="swithUserTo1" color="info" @click="swithUserTo(1)" />
      <BaseButton label="swithUserTo2" color="info" @click="swithUserTo(2)" />

      <BaseButton label="logOutCurrent" color="negative" @click="logOutCurrent" />
    </div>
  </BasePage>
</template>
