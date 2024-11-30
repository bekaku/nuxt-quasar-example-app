<script setup lang="ts">
import type { Breadcrumb } from '~/types/common';
import { useQuasar } from 'quasar';

const { lines = 1 } = defineProps<{
  items: Breadcrumb[];
  lines?: number;
}>();
const appStore = useAppStore();
const { dark } = useQuasar();
const { t } = useLang();
const { getCurrentPath } = useBase();
const canShow = (item: Breadcrumb) => {
  if (item.permissions == undefined) {
    return true;
  }
  return appStore.isHavePermission(item.permissions);
};
</script>

<template>
  <template v-for="(item, index) in items" :key="`menu-${index}-${item.to}`">
    <q-item v-if="canShow(item)" :to="item.to" active-class="q-item-no-link-highlighting"
            :class="item.to == getCurrentPath(false) ? 'text-primary' : dark.isActive ? 'text-white' : 'text-black'">
      <q-item-section side>
        <q-icon :class="item.to == getCurrentPath(false) ? 'text-primary' : dark.isActive ? 'text-white' : 'text-black'"
                :name="item.icon" />
      </q-item-section>
      <q-item-section>
        <q-item-label :lines="lines">{{ item.translateLabel ? t(item.label) : item.label }}</q-item-label>
      </q-item-section>
      <slot name="side" v-bind="{ item }"></slot>
    </q-item>
  </template>
</template>

<style scoped lang="scss">

</style>
