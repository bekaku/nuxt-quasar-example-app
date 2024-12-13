<template>
    <!-- :readonly="!required"
    :rules="required ? [required] : undefined"
    -->
    <q-field outlined bottom-slots :label="title" stack-label>
      <template #control>
        <div class="self-center full-width no-outline" tabindex="0">
          {{ convertDateFormatToThai(modelValue) }}
        </div>
      </template>
      <template #append>
        <q-btn flat round :icon="biCalendarWeek" :disable="disable" color="primary" dense>
          <q-tooltip>{{ t('base.chooseDate') }}</q-tooltip>
          <q-popup-proxy ref="dateProxy" transition-show="scale" transition-hide="scale">
            <!--          @update:model-value="(value: any) => (dateProxy.hide())"-->
            <q-date
v-model="modelValue" mask="YYYY-MM-DD" :first-day-of-week="0" :locale="datePickerLocale"
              :options="dateList.length > 0 ? limitDates : options" @update:model-value="onClosePicker">
              <div class="row items-center justify-end">
                <q-btn v-close-popup :label="t('base.close')" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-btn>
      </template>
      <template #after>
        <q-btn v-if="modelValue" flat round :icon="biX" size="xs" @click="clear" />
      </template>
      <template v-if="required && !modelValue" #hint>
        <span class="text-negative">
          {{ t('error.validateRequireChoose') }}
        </span>
      </template>
    </q-field>
  </template>
  
  <script setup lang="ts">
  import { biCalendarWeek, biX } from '@quasar/extras/bootstrap-icons';
  import { convertDateFormatToThai } from '~/utils/dateUtil';
  const props = withDefaults(
  defineProps<{
    title?: string;
    minDate?: string;//yyy-mm-dd 2022-06-16
    maxDate?: string;//yyy-mm-dd 2022-06-16
    dateList?:string[]
    dense?:boolean
    disable?:boolean
    required?:boolean
  }>(),
  {
    dateList: ()=>[],
    dense:false,
    disable:false,
    required:false,
  }
);
  const modelValue = defineModel<string | undefined | null>();
  const dateProxy = ref<any>(null);
  const emit = defineEmits(['update:modelValue']);
  const limitDates = props.dateList?.map((item: any) => {
    return item.replaceAll('-', '/');
  });
  
  const { t ,locale} = useLang();
  // const { datePickerLocale } = useDateFns();
  const clear = () => {
    modelValue.value = '';
  };
  const datePickerLocale = computed(() =>
        locale.value
            ? {
                days: t('date.days').split('_'),
                daysShort: t('date.dayShorts').split('_'),
                months: t('date.months').split('_'),
                monthsShort: t('date.monthShorts').split('_'),
                firstDayOfWeek: 1,
            }
            : undefined

    );
  const options = (date: string) => {
    if (props.minDate && props.maxDate) {
      return (
        date >= props.minDate.replaceAll('-', '/') &&
        date <= props.maxDate.replaceAll('-', '/')
      );
    } else if (props.minDate) {
      return date >= props.minDate.replaceAll('-', '/');
    } else if (props.maxDate) {
      return date <= props.maxDate.replaceAll('-', '/');
    }
  
    return true;
  };
  const onClosePicker = (value: any) => {
    if (dateProxy.value) {
      dateProxy.value.hide();
    }
  };
  </script>
  