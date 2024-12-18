  <script setup lang="ts">
  /*
  <base-pop-confirm
          :title="t('base.deleteConfirm')"
          confirm-color="negative"
          @onChange="$emit('resend-approve',$event)"
        >
        </base-pop-confirm>
  */

  const { t } = useLang();
  const { isDark } = useTheme();

  withDefaults(defineProps<{
    title?: string;
    width?: string;
    showConfirm?: boolean;
    disableConfirm?: boolean;
    confirmColor?: string;
    labelConfirm?: string;
    showCancel?: boolean;
    dark?: boolean;
    labelCancel?: string;
    cancelColor?: string;
  }>(), {
    dark: false,
    showConfirm: true,
    disableConfirm: false,
    showCancel: true,
    confirmColor: 'primary',
    cancelColor: 'primary',
    width: '250px'
  });
  const emit = defineEmits<{
    'on-change': [boolean];
    'on-okay': [];
    'on-cancel': [];
  }>();
  const onChange = (status: boolean) => {
    emit('on-change', status);
    if (status) {
      emit('on-okay');
    } else {
      emit('on-cancel');
    }
  };
</script>
  <template>
    <q-menu :style="{ width: width }" :dark="dark || isDark">
      <div class="q-pa-md">
        <div class="q-mb-md">
          <slot>
            {{ title }}
          </slot>
        </div>
        <div class="q-mb-md text-center">
          <q-btn v-if="showConfirm" v-close-popup no-caps :color="confirmColor" :disable="disableConfirm"
            :label="labelConfirm ? labelConfirm : t('base.okay')" push @click="onChange(true)" />
          <q-btn v-if="showCancel" v-close-popup no-caps class="q-ml-sm" flat :color="cancelColor"
            :label="labelCancel ? labelCancel : t('base.cancel')" @click="onChange(false)" />
        </div>
        <slot name="bottom" />
      </div>
    </q-menu>
  </template>
<style scoped></style>
