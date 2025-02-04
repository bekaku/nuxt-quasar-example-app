  <script setup lang="ts">
  import { biClock, biXCircleFill } from '@quasar/extras/bootstrap-icons';
import type { AppColor } from '~/types/common';
  const { dense = true, disable = false, required = false, editMode=true, } = defineProps<{
    label?: string
    dense?: boolean
    disable?: boolean
    required?: boolean
    color?: AppColor
    editMode?: boolean
  }>();
  const emit = defineEmits(['on-update']);
  const modelValue = defineModel<string>();
  const timeProxy = ref<any>(null);
  const { t } = useLang();
  const clear = () => {
    modelValue.value = ''
  };
  const onClosePicker = () => {
    if (timeProxy.value) {
      timeProxy.value.hide();
    }
    console.log('onClosePicker');
    
  };
  const onSelectd=(value: any)=>{
    onClosePicker();
    emit('on-update', value)
  }
</script>
  <template>
    <q-field :outlined="editMode" :borderless="!editMode" bottom-slots :label="label" stack-label :dense :disable="disable">
      <q-popup-proxy v-if="editMode" ref="timeProxy" transition-show="scale" transition-hide="scale" @hide="onClosePicker">
        <q-time v-model="modelValue" @update:model-value="(value) => onSelectd(value)">
          <div class="row items-center justify-end">
            <q-btn v-close-popup :label="t('base.close')" color="primary" flat />
          </div>
        </q-time>
      </q-popup-proxy>
      <template #prepend>
        <q-icon :name="biClock" :color />
      </template>
      <template #control>
        <div class="self-center full-width no-outline" tabindex="0">
          {{ modelValue }}
        </div>
      </template>
      <!-- <template #append>
        <q-btn flat round :icon="biClock" :disable="disable" :color="color" :dense>
          <q-tooltip>{{ t('base.chooseDate') }}</q-tooltip>
          <q-popup-proxy ref="timeProxy" transition-show="scale" transition-hide="scale">
            <q-time v-model="modelValue" @update:model-value="(value) => onClosePicker(value)">
              <div class="row items-center justify-end">
                <q-btn v-close-popup :label="t('base.close')" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-btn>
        <q-btn v-if="modelValue" flat round :icon="biXCircleFill"  @click="clear" />
      </template> -->
      <template #after>
        <q-btn v-if="modelValue && editMode" flat round :icon="biXCircleFill" @click="clear" />
      </template>
      <template v-if="required && !modelValue && editMode && !disable" #hint>
        <span class="text-negative">
          {{ t('error.validateRequireChoose') }}
        </span>
      </template>
    </q-field>
  </template>