<script setup lang="ts">
/*
  <base-dialog
  v-if="modelValue"
    v-model="modelValue"
    title="post"
    @on-close="onClose"
    :persistent="false"
    transition-show="fade"
    transition-hide="fade"
    dialog-style="width: 756px; max-width: 80vw;"
  >
  </base-dialog>
*/
import { biArrowsAngleContract, biArrowsAngleExpand, biFile, biX } from '@quasar/extras/bootstrap-icons';

const {
  persistent = false,
  fullWidth = false,
  fullHeight = false,
  maximized = false,
  icon = biFile,
  transitionShow = 'fade',//fade, slide-down
  transitionHide = 'fade',
  canMaximized = false,
  autoClose = true,
  showToolbar = true,
} =
  defineProps<{
    persistent?: boolean;
    fullWidth?: boolean;
    fullHeight?: boolean;
    maximized?: boolean;
    canMaximized?: boolean;
    icon?: string;
    title?: string;
    transitionShow?: string;
    transitionHide?: string;
    width?: string;
    maxWidth?: string;
    dialogStyle?: string;
    autoClose?: boolean;
    showToolbar?: boolean;
  }>();

const modelValue = defineModel<boolean>({ default: false });
const emit = defineEmits(['on-close', 'on-before-hide']);
const { t } = useLang();
const { isDark } = useTheme();
const maximizeModel = ref(maximized);
const onClose = () => {
  emit('on-close');
  if (autoClose) {
    modelValue.value = false;
  }
};
</script>
<template>
  <q-dialog :model-value="modelValue" :persistent="persistent" :maximized="maximizeModel"
    :transition-show="transitionShow" :transition-hide="transitionHide" :full-width="fullWidth"
    :full-height="fullHeight" @hide="onClose" @before-hide="$emit('on-before-hide')">
    <!-- <div v-bind="$attrs" :style="dialogStyle">
        <slot></slot>
      </div> -->
    <q-card v-bind="$attrs" flat :style="dialogStyle" :class="{ 'bg-grey-1': !isDark, 'app-second-bg-color-theme-dark': isDark }">
      <slot name="toolBar">
        <q-bar v-if="showToolbar" class="q-mb-xs" :class="{ 'bg-white': !isDark, 'bg-dark-900': isDark }">
          <slot name="icon">
            <q-icon v-if="icon" :name="icon" />
          </slot>

          <div>
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <q-space />
          <slot name="toolbarAction">
            <q-btn v-if="canMaximized" round flat :icon="!maximizeModel ? biArrowsAngleExpand : biArrowsAngleContract"
              @click="maximizeModel = !maximizeModel">
              <q-tooltip>{{ !maximizeModel ? t('base.maximize') : t('base.minimize') }}</q-tooltip>
            </q-btn>
            <q-btn round flat :icon="biX" @click="onClose">
              <q-tooltip>{{ t('base.close') }}</q-tooltip>
            </q-btn>
          </slot>
        </q-bar>
      </slot>
      <slot />
    </q-card>
  </q-dialog>
</template>