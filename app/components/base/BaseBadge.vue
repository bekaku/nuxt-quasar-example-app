<script setup lang="ts">
import type { BadgeProps } from '~/types/props';
const { floating = true} = defineProps<BadgeProps>();
</script>
<template>
  <q-badge v-bind="$attrs" :floating :color :rounded :transparent :class="cssClass" :style="cssStyle">
    <slot>
      {{ text }}
    </slot>
  </q-badge>
</template>
