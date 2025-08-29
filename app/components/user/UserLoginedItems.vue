<script setup lang="ts">
import { biCheckCircleFill, biDot, biPlusCircle } from '@quasar/extras/bootstrap-icons'
import AppUserService from '~/api/AppUserService'
import type { LoginedProfileItem } from '~/types/common'
const { height = '175px' } = defineProps<{
  height?: string
}>()
const { findLoginedProfile } = AppUserService()
const authenStore = useAuthenStore()
const { onSwithUser } = useAuth()
const { loginedItems, alreadyFetchLoginedProfile } = storeToRefs(authenStore)
const { auth, setLoginedItems, setFetchLoginedProfile } = authenStore
const { t } = useLang()
const { appConfirm } = useBase()
const { getAllJwtRefreshToken } = useAppCookie()
const loading = ref<boolean>(true)
onMounted(async () => {
  await onSetProfiles()
  loading.value = false
})
const onSetProfiles = async () => {
  if (loginedItems.value.length > 0 || !auth || !auth.id || alreadyFetchLoginedProfile.value) {
    return new Promise(resolve => resolve(false))
  }
  const jwtCookies = await getAllJwtRefreshToken()
  if (jwtCookies && jwtCookies.length > 0) {
    const finalItems: LoginedProfileItem[] = []
    const otherUserTokens = jwtCookies.filter(cookie => cookie.userId != auth.id)
    if (otherUserTokens.length > 0) {
      for (const item of otherUserTokens) {
        if (item.value) {
          const res = await findLoginedProcess(item.value)
          if (res) {
            finalItems.push(res)
          }
        }
      }
      if (finalItems.length > 0) {
        setLoginedItems(finalItems)
      }
    }
  }
  setFetchLoginedProfile(true)
  return new Promise(resolve => resolve(true))
}
const findLoginedProcess = async (jwtToken: string): Promise<LoginedProfileItem | null> => {
  if (!jwtToken) {
    return new Promise(resolve => resolve(null))
  }
  try {
    const response = await findLoginedProfile({
      refreshToken: jwtToken
    })
    return new Promise(resolve => resolve(response))
  } catch (error) {
    console.warn('findLoginedProcess Error', error)
    return new Promise(resolve => resolve(null))
  }
}
const onSwithUserProcess = async (index: number) => {
  const switchToUser = loginedItems.value[index]
  if (switchToUser && switchToUser.user && switchToUser.user.id) {
    const conf = await appConfirm(
      t('app.monogram'),
      t('authen.switchProfileConfirm', {
        name: switchToUser.user?.username || switchToUser.user?.email || ''
      })
    )
    if (conf) {
      onSwithUser(switchToUser.user.id)
    }
  }
}
</script>
<template>
  <q-list v-bind="$attrs" dense class="q-pa-xs">
    <q-item-label header>
      {{ t('authen.allProfiles') }}
    </q-item-label>
    <BaseScrollArea :height>
      <UserItem
        v-if="auth"
        :name="auth.username || ''"
        :avatar="{
          src: auth.avatar?.thumbnail,
          size: '40px'
        }"
        :description="auth.email || ''"
        dense
        :name-lines="1"
        :description-lines="1"
      >
        <template #end>
          <q-icon :name="biCheckCircleFill" color="primary" />
        </template>
      </UserItem>
      <SkeletonItem v-if="loading" :show="loading" dense :show-header="false" :items="2" />
      <template v-else-if="loginedItems.length > 0">
        <UserItem
          v-for="(item, index) in loginedItems"
          :key="`${index}-${item.user?.id}`"
          :name="item.user?.username || ''"
          :avatar="{ src: item.user?.avatar?.thumbnail, size: '40px' }"
          :description="item.user?.email || ''"
          clickable
          v-close-popup
          @click="onSwithUserProcess(index)"
        >
          <template
            v-if="
              item.notificationCount &&
              (item.notificationCount.totalNotify > 0 || item.notificationCount.totalNewMessage > 0)
            "
            #bottom
          >
            <q-item-label caption>
              <q-icon :name="biDot" color="negative" size="20px" />
              {{
                item.notificationCount.totalNotify + item.notificationCount.totalNewMessage > 99
                  ? '99+'
                  : item.notificationCount.totalNotify + item.notificationCount.totalNewMessage
              }}
              {{ t('base.notifications') }}
            </q-item-label>
          </template>
          <BaseTooltip>
            {{ t('authen.switchProfile') }}
          </BaseTooltip>
        </UserItem>
      </template>
    </BaseScrollArea>
    <q-item clickable v-close-popup to="/auth/add-account" class="rounded">
      <q-item-section avatar>
        <q-icon :name="biPlusCircle" />
      </q-item-section>
      <q-item-section> {{ t('authen.addProfile') }} </q-item-section>
    </q-item>
  </q-list>
</template>
