<script setup lang="ts">
import {
  biBoxArrowRight,
  biChevronExpand,
  biChevronRight,
  biGear,
  biGlobe2,
  biMoon,
  biPersonSquare,
  biQuestionCircle,
  biSun
} from '@quasar/extras/bootstrap-icons'
import { mdiAccountSwitchOutline } from '@quasar/extras/mdi-v7'
const { screen } = useQuasar()
const authenStore = useAuthenStore()
const { signout } = useAuth()
const { t, currentLangugeName } = useLang()
const { isDark } = useTheme()
const { isSmallScreen } = useAppDevice()
</script>
<template>
  <q-item v-bind="$attrs" clickable class="rounded">
    <q-item-section avatar top>
      <base-avatar
        v-if="authenStore.loginedAvatar"
        class="shadow-5"
        :src="authenStore.loginedAvatar"
        size="36px"
      />
    </q-item-section>
    <q-item-section v-if="screen.gt.xs">
      <q-item-label lines="1">
        <span class="cursor-pointer text-weight-bold">
          {{ authenStore.loginedDisplay }}
        </span>
      </q-item-label>
      <q-item-label caption :lines="1"> Sofware Engineer </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-icon :name="biChevronExpand" size="16px" />
    </q-item-section>
    <q-menu>
      <q-list dense style="min-width: 260px" class="q-pa-xs">
        <q-item v-close-popup clickable class="rounded" :to="`/user/${authenStore.auth?.id}`">
          <q-item-section avatar>
            <base-avatar
              v-if="authenStore.loginedAvatar"
              :src="authenStore.loginedAvatar"
              size="36px"
              rounded
            />
            <q-icon v-else :name="biPersonSquare" />
          </q-item-section>
          <q-item-section>{{ t('base.yourProfile') }}</q-item-section>
        </q-item>
        <q-item clickable class="rounded">
          <q-item-section avatar>
            <q-icon :name="mdiAccountSwitchOutline" />
          </q-item-section>
          <q-item-section> {{ t('authen.seeAllProfiles') }} </q-item-section>
          <q-menu :anchor="!screen.gt.xs ? 'bottom left' : 'top end'" self="top start">
            <UserLoginedItems style="min-width: 260px" />
          </q-menu>
          <q-item-section side> <q-icon :name="biChevronRight" /> </q-item-section>
        </q-item>
        <q-separator class="q-my-xs" />
        <template v-if="isSmallScreen">
          <q-item clickable class="rounded">
            <q-item-section avatar>
              <q-icon :name="isDark ? biMoon : biSun" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ `${t('base.appearance')}: `
                }}<span class="text-weight-medium">{{
                  !isDark ? t('theme.light') : t('theme.dark')
                }}</span>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon :name="biChevronRight" />
            </q-item-section>
            <BaseThemeSwitcher
              :toggle="false"
              :anchor="!screen.gt.xs ? 'bottom left' : 'top end'"
              self="top start"
            />
          </q-item>
          <q-item clickable class="rounded">
            <q-item-section avatar>
              <q-icon :name="biGlobe2" />
            </q-item-section>
            <q-item-section>
              <q-item-label>
                {{ `${t('base.language')}: `
                }}<span class="text-weight-medium">{{ currentLangugeName }}</span>
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-icon :name="biChevronRight" />
            </q-item-section>
            <BaseLangugeSwitcher
              :anchor="!screen.gt.xs ? 'bottom left' : 'top end'"
              self="top start"
            />
          </q-item>

          <q-separator class="q-my-xs" />
        </template>
        <q-item v-close-popup clickable class="rounded">
          <q-item-section avatar>
            <q-icon :name="biQuestionCircle" />
          </q-item-section>
          <q-item-section>{{ t('base.help') }}</q-item-section>
        </q-item>
        <q-item v-close-popup clickable to="/settings" class="rounded">
          <q-item-section avatar>
            <q-icon :name="biGear" />
          </q-item-section>
          <q-item-section>{{ t('base.setting') }}</q-item-section>
        </q-item>
        <q-item v-close-popup clickable class="rounded" @click="signout">
          <q-item-section avatar>
            <q-icon :name="biBoxArrowRight" />
          </q-item-section>
          <q-item-section>{{ t('base.logout') }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-item>
</template>
