<script setup lang="ts">
import type { FileManager } from '~/types/models'

const { file } = defineProps<{
  file: FileManager
}>()
const contentUniqeId = useId()
const { formatDistanceFromNow } = useDateFns()
const { locale } = useLang()
const getViews = computed(() => readableNumber(file.view || 0))
</script>
<template>
  <div v-bind="$attrs" class="row">
    <div class="col">
      <div class="text-h6 text-weight-bold">
        {{ file.title || file.fileName }}
      </div>
      <div class="row items-center q-gutter-sm q-pa-sm text-muted">
        <span v-if="file.createdDate">{{
          formatDistanceFromNow(file.createdDate, locale, true)
        }}</span>

        <BaseButton rounded dense flat light class="cursor-inherit">
          <BaseIcon name="lucide:eye" />
          <span class="q-ml-sm">
            {{ `${getViews} ${file.view && file.view > 1 ? $t('drive.views') : $t('drive.view')}` }}
          </span>
        </BaseButton>
        <BaseButton rounded flat dense light>
          <BaseIcon name="lucide:share-2" />
          <span class="q-ml-sm">{{ $t('base.share') }}</span>
        </BaseButton>
        <BaseButton rounded flat dense light>
          <BaseIcon name="lucide:download" />
          <span class="q-ml-sm">{{ $t('base.download') }}</span>
        </BaseButton>
      </div>
      <UserItem
        :avatar="{
          src: 'https://cdn.quasar.dev/img/avatar3.jpg',
          size: '42px',
          badge: { color: 'positive', cssStyle: { top: '30px' } }
        }"
        name="John Doe"
        description="Software engineer"
      >
      </UserItem>
      <div class="q-py-md">
        <BaseContentItem
          v-if="file.description"
          wrap-text
          :content="file.description"
          :content-id="`${contentUniqeId}-file-${file.id}`"
          :is-escape-html="false"
          :hashtag-urlify="false"
          :limit="3"
          show-more
        />
      </div>
    </div>
  </div>
</template>
