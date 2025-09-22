<script setup lang="ts">
defineProps<{
  progress: DownloadProgress
  error?: string | null
  isDownloading?: boolean
}>()
</script>
<template>
  <div class="row">
    <div class="col-12">
      <q-item>
        <q-item-section avatar>
          <BaseIcon name="lucide:download" size="36px" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ $t('drive.donwloadingTitle', [progress.filename]) }}
          </q-item-label>
          <q-item-label caption> {{ $t('drive.donwloadingTitle2') }} </q-item-label>
          <q-item-label>
            <q-linear-progress
              stripe
              rounded
              :value="progress.percentage / 100"
              :color="error ? 'negative' : 'primary'"
              class="q-mt-sm"
            />
          </q-item-label>
          <q-item-label caption>
            {{
              $t('drive.donwloadingTitle3', {
                speed: progress.speed,
                loaded: formatBytes(progress.loaded),
                total: formatBytes(progress.total),
                percent: progress.percentage.toFixed(1)
              })
            }}
          </q-item-label>
          <q-item-label v-if="error" class="text-negative">
            {{ error }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>
