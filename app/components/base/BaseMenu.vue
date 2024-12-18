  <script setup lang="ts" generic="T">
  import type { LabelValue } from '~/types/common';
  import { biThreeDotsVertical } from '@quasar/extras/bootstrap-icons';

  withDefaults(defineProps<{
    items: LabelValue<T>[];
    icon?: string;
    title?: string;
    width?: string;
    cover?: boolean;
  }>(), {
    icon: biThreeDotsVertical,
    width: '100px',
    cover: true,
  });
  const emit = defineEmits(['on-click']);
  const onClick = (value: T) => {
    emit('on-click', value);
  };
</script>
  <template>
    <q-menu v-bind="$attrs" :cover anchor="top middle">
      <q-list :style="{ minWidth: width }">
        <base-menu-item v-for="(item, index) in items" :key="`app-menu-${item.value}-${index}`" v-close-popup
          :item="item" @click="onClick(item.value)" />
      </q-list>
    </q-menu>
  </template>
<style scoped></style>
