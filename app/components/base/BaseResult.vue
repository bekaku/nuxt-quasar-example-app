<script setup lang="ts">
/*
          <base-result
            text-color="text-muted"
            :description="t('commentNotFoundThisPost')"
            :show-icon="false"
          >
            <template #extra>
              <q-icon :icon="mdiAlert" :size="45" color="grey"></q-icon>
            </template>
          </app-result>
const AppResult = defineAsyncComponent(
  () => import('@/components/base/AppResult.vue')
);
*/
import type { IResult } from '~/types/common'
import {
  mdiAlert,
  mdiAlertBoxOutline,
  mdiAllergy,
  mdiCheckBold,
  mdiInboxRemoveOutline,
  mdiInformationVariant,
  mdiPackageVariant,
  mdiPaperclip,
  mdiRobotConfused
} from '@quasar/extras/mdi-v7'
import type { Icon } from '~/types/props'

const {
  status = 'info',
  size = '120px',
  iconSize = '70px',
  hideBg = false,
  showIcon = true
} = defineProps<{
  status?: IResult
  title?: string
  description?: string
  icon?: Icon
  iconSize?: string
  size?: string
  hideBg?: boolean
  showIcon?: boolean
}>()
const { isDark } = useTheme()
const getIcon = (): string => {
  let ic: string | undefined = undefined

  //404, 403, 500, 418, info, success, error, warning
  switch (status) {
    case '404':
      ic = mdiInboxRemoveOutline
      break
    case '403':
      ic = mdiAllergy
      break
    case '500':
    case '400':
      ic = mdiRobotConfused
      break
    case '418':
      ic = mdiPaperclip
      break
    case 'success':
      ic = mdiCheckBold
      break
    case 'warning':
      ic = mdiAlertBoxOutline
      break
    case 'error':
      ic = mdiAlert
      break
    case 'empty':
      ic = mdiPackageVariant
      break
    default:
      ic = mdiInformationVariant
      break
  }

  return ic
}
const getIconColor = () => {
  let color = ''
  switch (status) {
    case '400':
    case '404':
    case '403':
    case '500':
    case '418':
      color = 'amber'
      break
    case 'success':
      color = 'green'
      break
    case 'warning':
      color = 'orange'
      break
    case 'error':
      color = 'red'
      break
    case 'empty':
      color = 'grey-5'
      break
    default:
      color = 'blue'
      break
  }
  return color
}
const getBgColor = () => {
  let color = ''
  switch (status) {
    case '400':
    case '404':
    case '403':
    case '500':
    case '418':
      color = !isDark.value ? 'amber-1' : 'amber-2'
      break
    case 'success':
      color = !isDark.value ? 'green-1' : 'green-2'
      break
    case 'warning':
      color = !isDark.value ? 'orange-1' : 'orange-2'
      break
    case 'error':
      color = !isDark.value ? 'red-1' : 'red-2'
      break
    case 'empty':
      color = !isDark.value ? 'grey-1' : 'grey-8'
      break
    default:
      color = !isDark.value ? 'blue-1' : 'blue-2'
      break
  }
  return color
}
</script>
<template>
  <div class="row items-center q-pa-md">
    <div class="col">
      <div class="column items-center">
        <div class="col text-center">
          <!-- <img v-if="status == 'empty'" src="/icons/empty-box.png" :style="`width: ${iconSize} ; height: auto`" /> -->
          <!-- <img v-else-if="status == 'error'" :style="`width: ${iconSize} ; height: auto`" src="/icons/sad-man.png" /> -->
          <!-- <img
              v-else-if="status == 'warning'"
              src="/icons/warning.png"
              :style="`width: ${iconSize} ; height: auto`"
            /> -->
          <q-avatar v-if="status == '404'" square :style="{ width: size, height: 'auto' }">
            <img src="/icons/sad-man.png" />
          </q-avatar>
          <q-avatar v-else-if="showIcon"  :size="size" :color="!hideBg ? getBgColor() : undefined">
            <BaseIcon
              :name="icon?.name || getIcon()"
              :size="icon?.size || iconSize"
              :color="icon?.color || getIconColor()"
              :icon-set="icon?.iconSet || 'quasar'"
            />
          </q-avatar>
          <!-- <q-avatar
            v-else-if="showIcon"
            :size="iconSize"
            :color="!hideBg ? getBgColor() : undefined"
            :icon="icon ? icon : getIcon()"
            :class="getIconColor()"
          /> -->
        </div>
        <div class="col q-mt-md text-center">
          <slot name="text">
            <div
              v-if="title"
              class="text-h5 text-weight-bold q-mb-sm"
              :class="status == 'empty' ? 'text-grey-6' : ''"
            >
              {{ title }}
            </div>

            <div v-if="description" class="text-muted text-subtitle1">
              {{ description }}
            </div>
          </slot>
        </div>
        <div class="col q-mt-sm">
          <slot name="extra" />
        </div>
      </div>
    </div>
  </div>
</template>
