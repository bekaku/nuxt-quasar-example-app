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
  dark = false,
  rbac
} = defineProps<ButtonProps>()
const { isDark } = useTheme()
</script>
<template>
  <BaseRbac :rbac>
    <q-btn
      v-bind="$attrs"
      :outline
      :label="!outline ? label : undefined"
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
      :icon="!outline ? icon : undefined"
      :icon-right="!outline ? iconRight : undefined"
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
        'defult-outline': label && !outlineColor && outline,
        'full-width': full,
        'text-capitalize': textCapitalize,
        'btn-dark': dark,
        'btn-light': light
      }"
    >
      <template v-if="outline">
        <div
          :class="`text-${textColor ? textColor : outlineColor ? outlineColor : !isDark ? 'black' : 'white'}`"
        >
          <q-icon v-if="icon" :name="icon" class="q-mr-sm" />{{ label }}
          <q-icon v-if="iconRight" :name="iconRight" class="q-ml-sm" />
        </div>
      </template>
      <slot />
    </q-btn>
  </BaseRbac>
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
