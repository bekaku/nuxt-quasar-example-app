<script setup lang="ts">
import { biCalendarWeek, biXCircleFill } from '@quasar/extras/bootstrap-icons';
import type { AppColor } from '~/types/common';
import { convertDateFormatToThai } from '~/utils/dateUtil';
const {
  autoClose = true,
  dateList = [],
  dense = true,
  disable = false,
  required = false,
  editMode = true,
  minDate,
  maxDate,
  range = false,
  showFormatDate = false,
  formatDateText = FORMAT_DATE4,
} =
  defineProps<{
    autoClose?: boolean;
    label?: string;
    minDate?: string;//yyy-mm-dd 2022-06-16
    maxDate?: string;//yyy-mm-dd 2022-06-16
    dateList?: string[]
    dense?: boolean
    disable?: boolean
    required?: boolean
    color?: AppColor;
    editMode?: boolean
    range?: boolean
    showFormatDate?: boolean
    formatDateText?: string
  }>();
const modelValue = defineModel<string | undefined | null>({ default: null });
const start = defineModel<string | undefined | null>('start', { default: null });
const end = defineModel<string | undefined | null>('end', { default: null });
const modelValueRange = ref<any>({ from: start.value, to: end.value })
const { formatDate } = useDateFns();


const dateProxy = ref<any>(null);
const dateRangeProxy = ref<any>(null);
const emit = defineEmits(['on-update', 'on-update-range']);

const { t, locale } = useLang();
const clear = () => {
  modelValue.value = '';
  start.value = '';
  end.value = '';
  modelValueRange.value = null;
};
const onDateSelect = (value: any) => {
  if (dateProxy.value && autoClose) {
    dateProxy.value.hide();
  }
  emit('on-update', value)
};
const onDateRangeSelect = (value: any) => {
  emit('on-update-range', value)
};
// const onOpenPicker = () => {
//   if (dateProxy.value) {
//     dateProxy.value.show();
//   }
// }
const getFormarText=(dateString: string | undefined | null,)=>{
return formatDate(dateString, formatDateText, locale.value)
}
</script>
<template>
  <q-field v-bind="$attrs" :outlined="editMode" :borderless="!editMode" bottom-slots :label="label" stack-label :dense
    :disable="disable" class="cursor-pointer">
    <template #label>
      <slot name="label">
        {{ label }} <template v-if="required"><span class="text-negative">*</span></template>
      </slot>
    </template>
    <template v-if="!range">
      <q-popup-proxy v-if="editMode" ref="dateProxy" transition-show="scale" transition-hide="scale">
        <BaseDate v-model="modelValue" :min-date :max-date :date-list :color @on-update="onDateSelect" />
      </q-popup-proxy>
    </template>
    <template v-else>
      <q-popup-proxy v-if="editMode" ref="dateRangeProxy" transition-show="scale" transition-hide="scale">
        <BaseDate v-model="modelValueRange" range :color @on-update-range="onDateRangeSelect" />
      </q-popup-proxy>
    </template>
    <template #control>
      <div class="self-center full-width no-outline" tabindex="0">
        <template v-if="!showFormatDate">
          {{ !range ? convertDateFormatToThai(modelValue) : `${modelValueRange?.from ?
            convertDateFormatToThai(modelValueRange.from) : ''}-${modelValueRange?.to ?
              convertDateFormatToThai(modelValueRange.to) : ''}` }}
        </template>
        <template v-else>
          {{ !range ? getFormarText(modelValue) : `${modelValueRange?.from ?
            getFormarText(modelValueRange.from) : ''} - ${modelValueRange?.to ?
            getFormarText(modelValueRange.to) : ''}` }}
        </template>
      </div>
    </template>
    <template #prepend>
      <q-icon :name="biCalendarWeek" :color />
    </template>
    <template #after>
      <q-btn v-if="(modelValue || (start && end)) && editMode" flat round :icon="biXCircleFill" @click="clear" />
    </template>
    <template v-if="required && !modelValue && editMode && !disable" #hint>
      <span class="text-negative">
        {{ t('error.validateRequireChoose') }}
      </span>
    </template>
  </q-field>
</template>