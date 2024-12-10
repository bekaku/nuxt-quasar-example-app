<template>
    <q-field outlined bottom-slots :label="title" stack-label>
      <template v-slot:control>
        <div class="self-center full-width no-outline" tabindex="0">
          {{ modelValue }}
        </div>
      </template>
      <template v-slot:append>
        <q-icon v-if="!disable" :name="biClock" color="primary" class="cursor-pointer">
          <q-tooltip>{{ t('base.chooseDate') }}</q-tooltip>
          <q-popup-proxy ref="q-date-search" transition-show="scale" transition-hide="scale">
            <q-time v-model="modelValue" @update:model-value="(value) => $emit('update:modelValue', value)">
              <div class="row items-center justify-end">
                <q-btn v-close-popup :label="t('base.close')" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
      <template v-slot:after>
        <q-btn v-if="modelValue" flat round :icon="biX" size="xs" @click="clear" />
      </template>
      <template v-slot:hint v-if="required && !modelValue">
        <span class="text-negative">
          {{ t('error.validateRequireChoose') }}
        </span>
      </template>
    </q-field>
  </template>
  
  <script setup lang="ts">
  import { biClock, biX } from '@quasar/extras/bootstrap-icons';
  defineProps({
    title: {
      type: String,
      default: '',
    },
    dense: {
      type: Boolean,
      default: false,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    required: {
      type: Boolean,
      default: false,
    },
  });
  const emit = defineEmits(['update:modelValue']);
  const modelValue = defineModel<string>();
  const { t } = useLang();
  const clear = () => {
    modelValue.value = ''
  };
  </script>
  