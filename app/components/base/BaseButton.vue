<script setup lang="ts">
import type { ButtonProps } from '~/types/props'
const {
  outline = false,
  noCaps = true,
  unelevated = true,
  glossy = false,
  flat = false,
  stack = false,
  round = false,
  push = false,
  rounded = false,
  loading = false,
  disable = false,
  dense = false,
  full = false,
  color = 'primary',
  light = false,
  textCapitalize = true,
  dark = false
} = defineProps<ButtonProps>()
const { isDark } = useTheme()
</script>
<template>
  <q-btn
    v-bind="$attrs"
    :outline
    :color="
      light && dark
        ? undefined
        : flat && label == undefined
          ? undefined
          : outline && outlineColor == undefined
            ? undefined
            : outlineColor || color
    "
    :text-color="light ? (isDark ? 'white' : 'black') : textColor"
    :no-caps="noCaps"
    :unelevated
    :glossy
    :flat
    :href
    :stack
    :round
    :square
    :push
    :rounded
    :align
    :size
    :loading
    :to
    :disable
    :dense
    :target
    :type
    :class="{
      'defult-outline': !outlineColor && outline,
      'full-width': full,
      'text-capitalize': textCapitalize,
      'btn-dark': dark,
      'btn-light': light,
      'q-px-sm': dense
    }"
  >
    <slot>
      <div
        class="row items-center"
        :class="
          outline
            ? `text-${textColor ? textColor : outlineColor ? outlineColor : !isDark ? 'black' : 'white'}`
            : ''
        "
      >
        <BaseIcon v-if="icon" v-bind="{ ...icon }" />
        <span v-if="label" class="q-mx-sm">{{ label }}</span>
        <BaseIcon v-if="iconRight" v-bind="{ ...iconRight }" />
      </div>
    </slot>
    <LazyBaseTooltip v-if="tooltip" :color="tooltipColor">
      {{ tooltip }}
    </LazyBaseTooltip>
  </q-btn>
</template>
<style scoped lang="scss">
.defult-outline {
  color: var(--app-main-border-color) !important;
}
.default-button {
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    0 1px 1px 0 rgb(0 0 0 / 0.05) !important;
  // border-radius: 1rem;
}
.btn-dark {
  background-color: var(--color-zinc-900) !important;
}
.btn-light {
  background-color: var(--color-zinc-100) !important;
}
body.body--dark {
  .btn-dark {
    background-color: var(--color-zinc-950) !important;
  }
  .btn-light {
    background-color: var(--color-zinc-600) !important;
  }
}
</style>
