<script setup lang="ts">
definePageMeta({
  // middleware: ["auth"]
  pageName: 'base.home' //custom meta
  // requiresPermission: ['role_manage'],//custom meta
})
useInitPage()
const { getPageMeta, getPageMetaByKey } = useBase()
if (!import.meta.server) {
  console.log('getPageMeta', getPageMeta())
  console.log(
    'getPageMetaByKey',
    'pageName: ',
    getPageMetaByKey('pageName'),
    ', requiresPermission: ',
    getPageMetaByKey('requiresPermission')
  )
}
const dateRangeStart = ref<string>('2025-01-01')
const dateRangeEnd = ref<string>('2025-02-15')
</script>
<template>
  <BasePage scroll-event show-to-top>
    <BaseCard title="Dashboard">
      <template #toolbarEnd>
        <div class="row items-center">
          <BaseDatePicker
            v-model:start="dateRangeStart"
            v-model:end="dateRangeEnd"
            :clearable="false"
            show-format-date
            label="Range"
            range
          >
            <template #after>
              <BaseButton label="Download" light />
            </template>
          </BaseDatePicker>
        </div>
      </template>
    </BaseCard>
  </BasePage>
</template>
