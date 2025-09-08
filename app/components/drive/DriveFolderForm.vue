<script setup lang="ts">
import type { FileManager } from '~/types/models'

const { folder } = defineProps<{
  folder?: FileManager
}>()
const { required } = useValidation()
const modelValue = defineModel<boolean>({ default: false })
const name = ref<string>(folder?.fileName || '')
const isNew = computed(() => !folder)
const emit = defineEmits<{
  'on-update': [folder?: FileManager]
  'on-create': [name: string]
}>()
const onSubmit = () => {
  if (isNew.value) {
    emit('on-create', name.value)
  } else {
    emit('on-update', folder)
  }
}
</script>
<template>
  <BaseDialog
    v-if="modelValue"
    v-model="modelValue"
    :title="isNew ? $t('drive.newFolder') : $t('drive.changName')"
    :icon="{
      name: isNew ? 'lucide:folder-plus' : 'lucide:folder-pen',
      iconSet: 'nuxt'
    }"
    dialog-style="width: 400px;"
  >
    <BaseCardSection>
      <q-form class="q-gutter-md" @submit="onSubmit">
        <BaseInput
          v-bind="$attrs"
          v-model="name"
          :debounce="500"
          :placeholder="$t('drive.typeNewFolder')"
          dense
          :rules="[required]"
        />

        <BaseCardActions align-items="right" class="q-mt-md">
          <BaseButton
            type="submit"
            :label="isNew ? $t('base.create') : $t('base.update')"
            color="primary"
          />
        </BaseCardActions>
      </q-form>
    </BaseCardSection>
  </BaseDialog>
</template>
