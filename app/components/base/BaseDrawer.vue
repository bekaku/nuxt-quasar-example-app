<script setup lang="ts">
const {
  overlay = false,
  bordered = false,
  miniToOverlay = true,
  mini = false,
  width = 270,
  tranparent = true,
  showHeader = true
} = defineProps<{
  overlay?: boolean
  miniToOverlay?: boolean
  mini?: boolean
  bordered?: boolean
  width?: number
  tranparent?: boolean
  showHeader?: boolean
}>()
const modelValue = defineModel<boolean>({ default: true })
defineEmits<{
  mouseover: []
  mouseout: []
  hide: []
}>()
const { isDark } = useTheme()
</script>
<template>
  <q-drawer
    v-model="modelValue"
    :width="width"
    :overlay="overlay"
    :bordered="bordered"
    :mini-to-overlay="miniToOverlay"
    :mini="mini"
    :class="{ 'base-sidebar': !tranparent }"
    @mouseover="$emit('mouseover')"
    @mouseout="$emit('mouseout')"
    @hide="$emit('hide')"
  >
    <q-scroll-area class="fit">
      <slot name="header">
        <div v-show="showHeader">
          <div class="row justify-center q-pa-sm">
            <q-btn flat dense round to="/" class="btn--no-hover">
              <q-avatar style="height: auto; width: 44px" square>
                <img alt="logo" :src="!isDark ? '/logo/logo-black.png' : '/logo/logo-white.png'" />
              </q-avatar>
            </q-btn>
          </div>
          <q-separator />
          <slot name="headerBottom"/>
        </div>
      </slot>
      <slot />
    </q-scroll-area>
  </q-drawer>
</template>
