  <script setup lang="ts">
  import type { FileManagerDto } from '~/types/models';
  
  const { showDelete = true, col = 'col-3 q-pa-md', } = defineProps<{
    showDelete?: boolean;
    col?: string;
    items: FileManagerDto[];
    formatSize?: boolean;
  }>()
  const emit = defineEmits(['on-remove']);
  const onRemove = (index: number) => {
    emit('on-remove', index);
  };
  </script>
  <template>
    <div v-if="items.length > 0" class="row">
      <div v-for="(f, index) in items" :key="`f-${index}-${f.fileName}`" :class="col" class="div-style q-pa-md">
        <base-files-preview-item :item="f" :index="index" :show-delete="showDelete" :format-size="formatSize" @on-remove="onRemove" />
      </div>
    </div>
  </template>
  <style lang="scss" scoped></style>
  