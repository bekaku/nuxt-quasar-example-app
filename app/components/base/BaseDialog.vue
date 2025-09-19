<script setup lang="ts">
/*
  <base-dialog
  v-if="modelValue"
    v-model="modelValue"
    title="post"
    @on-close="onClose"
    :persistent="false"
    transition-show="fade"
    transition-hide="fade"
    :dialog-style="{
      width: '756px',
      maxWidth: '80vw'
    }"
  >
  </base-dialog>
*/
import { biArrowsAngleContract, biArrowsAngleExpand, biX } from '@quasar/extras/bootstrap-icons'
import type { IconProps } from '~/types/props'

const {
  persistent = false,
  fullWidth = false,
  fullHeight = false,
  maximized = false,
  icon = {
    name: 'lucide:app-window-mac',
    iconSet: 'nuxt'
  },
  transitionShow = 'fade', //fade, slide-down
  transitionHide = 'fade',
  canMaximized = false,
  autoClose = true,
  showToolbar = true,
  padding = true
} = defineProps<{
  persistent?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
  maximized?: boolean
  canMaximized?: boolean
  icon?: IconProps
  title?: string
  transitionShow?: string
  transitionHide?: string
  width?: string
  maxWidth?: string
  dialogStyle?: Object
  autoClose?: boolean
  showToolbar?: boolean
  padding?: boolean
}>()

const modelValue = defineModel<boolean>({ default: false })
const emit = defineEmits(['on-close', 'on-hide', 'on-before-hide'])
const { t } = useLang()
const { isDark } = useTheme()
const maximizeModel = ref(maximized)
const onClose = () => {
  emit('on-close')
  onCloseModel()
}
const onHide = () => {
  emit('on-hide')
  onCloseModel()
}
const onCloseModel = () => {
  if (autoClose) {
    modelValue.value = false
  }
}
</script>
<template>
  <q-dialog
    :model-value="modelValue"
    :persistent="persistent"
    :maximized="maximizeModel"
    :transition-show="transitionShow"
    :transition-hide="transitionHide"
    :full-width="fullWidth"
    :full-height="fullHeight"
    @hide="onHide"
    @before-hide="$emit('on-before-hide')"
  >
    <q-card v-bind="$attrs" :style="dialogStyle">
      <slot name="toolBar">
        <q-bar
          v-if="showToolbar"
          class="q-py-lg"
          :style="{ background: !isDark ? 'var(--color-zinc-100)' : 'var(--color-zinc-800)' }"
        >
          <slot name="icon">
            <BaseIcon v-if="icon" v-bind="{ ...icon }" />
          </slot>

          <div>
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <q-space />
          <slot name="toolbarAction">
            <q-btn
              v-if="canMaximized"
              round
              flat
              :icon="!maximizeModel ? biArrowsAngleExpand : biArrowsAngleContract"
              @click="maximizeModel = !maximizeModel"
            >
              <BaseTooltip>{{
                !maximizeModel ? t('base.maximize') : t('base.minimize')
              }}</BaseTooltip>
            </q-btn>
            <q-btn round flat :icon="biX" @click="onClose">
              <BaseTooltip>{{ t('base.close') }}</BaseTooltip>
            </q-btn>
          </slot>
        </q-bar>
      </slot>
      <div :class="{ 'q-pa-md': padding }">
        <slot />
      </div>
    </q-card>
  </q-dialog>
</template>
