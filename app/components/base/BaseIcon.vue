<script setup lang="ts">
import type { Icon } from '~/types/props'
/*
https://iconify.design/, https://icones.js.org/ , https://quasar.dev/vue-components/icon
<BaseIcon name="lucide:cookie" icon-set="nuxt" />
<BaseIcon :name="mdiAbTesting" icon-set="quasar" />
*/
const { iconSet = 'quasar', size = '24px' } = defineProps<Icon>()
</script>
<template>
  <Icon
    v-if="iconSet == 'nuxt'"
    v-bind="$attrs"
    :name="name"
    :size="size"
    :class="color != undefined ? `text-${color}` : ''"
  />
  <q-icon
    v-else-if="iconSet == 'quasar'"
    v-bind="$attrs"
    :name="name"
    :size="size"
    :color="color"
  />
</template>
