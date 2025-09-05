<script setup lang="ts">
import type { FileManager } from '~/types/models'

const {items} = defineProps<{
  items: FileManager[]
}>()
</script>
<template>
  <div>Grid View


    <p>
        {{ items }}
    </p>
  </div>
</template>
