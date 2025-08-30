<script setup lang="ts">
import type { LabelValue } from '~/types/common'
const { col = 'col-md-12 q-px-md', readonly = false } = defineProps<{
  col?: string
  readonly?: boolean
}>()
const { t } = useLang()
const cascadeLoading = ref(false)
const provinceItems = ref<LabelValue<number | string>[]>([])
const provinceSeleted = ref<number | string>()
const districtItems = ref<LabelValue<number | string>[]>([])
const districtSeleted = ref<number | string>()
const subdistrictItems = ref<LabelValue<number | string>[]>([])

const modelValue = defineModel<number | string>()
const initialed = ref(false)

// const getSelected = computed(() => {
//   if (!modelValue.value || subdistrictItems.value.length == 0) {
//     return undefined
//   }

//   return subdistrictItems.value.find(i => i.value == modelValue.value)
// })
const getSelectedDisplay = computed(() => {
  if (!modelValue.value || subdistrictItems.value.length == 0) {
    return undefined
  }

  const province = provinceItems.value.find(i => i.value == provinceSeleted.value)
  const district = districtItems.value.find(i => i.value == districtSeleted.value)
  const subdistrict = subdistrictItems.value.find(i => i.value == modelValue.value)
  if (province && district && subdistrict) {
    return `${t('base.subDistrict')} ${subdistrict.label}, ${t('base.district')} ${district.label}, ${t('base.province')} ${province.label}, ${subdistrict.additionalValue}`
  }
  return undefined
})
const onLoadProvinceItems = async () => {
  cascadeLoading.value = true
  const provinces = await $fetch('/api/provinces')
  for (const p of provinces) {
    provinceItems.value.push({
      label: p.name_th,
      value: p.id,
      description: p.name_en
    })
  }
  cascadeLoading.value = false
  return new Promise(resolve => resolve(undefined))
}

const onLoadDistrictItems = async () => {
  districtSeleted.value = undefined
  districtItems.value = []
  subdistrictItems.value = []
  modelValue.value = undefined
  if (!provinceSeleted.value) {
    return
  }
  cascadeLoading.value = true
  await onLoadDistrictItemsProcess(provinceSeleted.value)
  cascadeLoading.value = false
}
const onLoadDistrictItemsProcess = async (provinceId: number | string) => {
  const disticts = await $fetch(`/api/district?provinceId=${provinceId}`)
  return new Promise(resolve => {
    for (const d of disticts) {
      districtItems.value.push({
        label: d.name_th,
        value: d.id,
        description: d.name_en
      })
    }
    resolve(undefined)
  })
}

const onLoadSubdistrictItems = async () => {
  subdistrictItems.value = []
  modelValue.value = undefined
  if (!districtSeleted.value) {
    return
  }
  cascadeLoading.value = true
  await onLoadSubdistrictItemsProcess(districtSeleted.value)
  cascadeLoading.value = false
}
const onLoadSubdistrictItemsProcess = async (districtId: number | string) => {
  const subdisticts = await $fetch(`/api/subdistrict?districtId=${districtId}`)
  return new Promise(resolve => {
    for (const d of subdisticts) {
      subdistrictItems.value.push({
        label: d.name_th,
        value: d.id,
        description: `${d.name_en}, ${d.zip_code}`,
        additionalValue: d.zip_code
      })
    }
    resolve(undefined)
  })
}
const onInitialDefultValue = async (): Promise<void> => {
  const subdistictInitial = await $fetch(`/api/subdistrict/initial/${modelValue.value}`)
  console.log('subdistictInitial', subdistictInitial)
  if (
    subdistictInitial &&
    subdistictInitial.subdistrictId &&
    subdistictInitial.districtId &&
    subdistictInitial.provinceId
  ) {
    await onLoadSubdistrictItemsProcess(subdistictInitial.districtId)
    await onLoadDistrictItemsProcess(subdistictInitial.provinceId)
    districtSeleted.value = subdistictInitial.districtId
    await onLoadProvinceItems()
    provinceSeleted.value = subdistictInitial.provinceId
  }
  return new Promise(resolve => resolve(undefined))
}
/*
const onInitialDefultValueBak = async (): Promise<void> => {
  const subdistict = await $fetch(`/api/subdistrict/${modelValue.value}`)
  if (subdistict && subdistict.amphure_id) {
    await onLoadSubdistrictItemsProcess(subdistict.amphure_id)
    const distict = await $fetch(`/api/district/${subdistict.amphure_id}`)
    if (distict && distict.province_id) {
      await onLoadDistrictItemsProcess(distict.province_id)
      districtSeleted.value = subdistict.amphure_id
      await onLoadProvinceItems()
      provinceSeleted.value = distict.province_id
    }
  }
  return new Promise(resolve => resolve(undefined))
}
*/
onMounted(async () => {
  if (modelValue.value) {
    await onInitialDefultValue()
    initialed.value = true
  } else {
    initialed.value = true
    onLoadProvinceItems()
  }
})
watch(provinceSeleted, () => {
  if (initialed.value) {
    onLoadDistrictItems()
  }
})
watch(districtSeleted, () => {
  if (initialed.value) {
    onLoadSubdistrictItems()
  }
})
</script>
<template>
  <div class="row">
    <div class="col-12" :class="col">
      <BaseSelect
        v-model="provinceSeleted"
        can-filter
        :readonly="readonly || !initialed"
        :items="provinceItems"
        dense
        :lazy-loading="cascadeLoading || !initialed"
        :clearable="!readonly && !cascadeLoading && initialed"
        :multiple="false"
        :label="t('base.province')"
      />
    </div>
    <div class="col-12" :class="col">
      <BaseSelect
        v-model="districtSeleted"
        can-filter
        :items="districtItems"
        dense
        :readonly="readonly || !initialed"
        :lazy-loading="cascadeLoading || !initialed"
        :clearable="!readonly && !cascadeLoading && initialed"
        :multiple="false"
        :label="t('base.district')"
      />
    </div>
    <div class="col-12" :class="col">
      <BaseSelect
        v-model="modelValue"
        can-filter
        :items="subdistrictItems"
        dense
        :lazy-loading="cascadeLoading || !initialed"
        :readonly="readonly || !initialed"
        :clearable="!readonly && !cascadeLoading && initialed"
        :multiple="false"
        :label="t('base.subDistrict')"
      />
    </div>
    <div class="col-12" :class="col">
      <q-item>
        <q-item-section side>
          <BaseIcon :name="getSelectedDisplay ? 'lucide:check' : 'lucide:inbox'" icon-set="nuxt" />
        </q-item-section>
        <q-item-section>
          <q-item-label caption>
            {{ getSelectedDisplay || t('helper.pleaseSelectAddress') }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>
