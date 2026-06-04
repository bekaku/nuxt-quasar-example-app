<script setup lang="ts">
import type { FileManager } from '~/types/models'
import { getExtensionFromFileName } from '~/utils/fileUtil'

const { file } = defineProps<{
  file?: FileManager
}>()
const { required } = useValidation()
const modelValue = defineModel<boolean>({ default: false })
const name = ref<string>(file?.fileName || '')
const extension = ref<string>('')
const isNew = computed(() => !file)
const emit = defineEmits<{
  'on-update': [name?: string]
  'on-create': [name: string]
}>()

watchEffect(() => {
  if (file) {
    const ext = getExtensionFromFileName(file.fileName)
    if (ext) {
      extension.value = ext
      name.value = file.fileName.replace(ext, '')
    }
  }
})
const onSubmit = () => {
  console.log('d', `${name.value}${extension.value}`)
  if (isNew.value) {
    emit('on-create', name.value)
  } else {
    emit('on-update', `${name.value}${extension.value}`)
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
    :dialog-style="{
      width: '480px',
      maxWidth: '80%'
    }"
  >
    <BaseCardSection>
      <q-form class="q-gutter-md" @submit="onSubmit">
        <BaseInput
          v-bind="$attrs"
          v-model="name"
          :debounce="500"
          :label="isNew ? $t('drive.typeNewFolder') : $t('drive.changName')"
          :placeholder="isNew ? $t('drive.typeNewFolder') : $t('drive.changName')"
          dense
          required
          :rules="[required]"
        >
          <template #after>
            <span class="text-body1">{{ extension }}</span>
          </template>
        </BaseInput>

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
