  <script setup>
  import {
  biArrowClockwise,
  biArrowCounterclockwise,
  biArrowLeftRight,
  biArrowsAngleContract, biArrowsAngleExpand,
  biArrowsCollapse,
  biCheck,
  biCrop,
  biFileImage,
  biX,
  biZoomIn,
  biZoomOut
} from '@quasar/extras/bootstrap-icons';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.css';
import { ref, watch } from 'vue';
import { blobToFile } from '~/utils/fileUtil';
  const props = defineProps({
    dialog: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: undefined,
    },
    ratio: {
      type: Number,
      default: 1,//1,4/3,16/9
    },
  });
  const emit = defineEmits(['on-close', 'on-okay', 'on-cropend']);
  const { t } = useLang();
  const { appToast } = useBase();
  const { isDark } = useTheme();
  const canvasImg = ref(null); // ref to <canvas ref="canvasImg" width="120" height="100"></canvas>
  const cropper = ref(null);
  const originalimagFile = ref(null);
  const horizontalScale = ref(1);
  const verticalScale = ref(1);
  const show = ref(false);
  const maximizedToggle = ref(false);
  const loading = ref(false);
  const priviewImage = ref(null);
  const onClose = () => {
    clearCropper();
    originalimagFile.value = null;
    emit('on-close');
    maximizedToggle.value = false;
  };
  const clearCropper = () => {
    if (cropper.value) {
      cropper.value.clear();
      cropper.value.destroy();
    }
  };
  const onInitCroper = () => {
    clearCropper();
    const options = {
      aspectRatio: props.ratio,
      preview: '.cropper-img-preview',
      ready: function (/*e*/) {
        /* */
        onCropend();
      },
      cropstart: function (/*e*/) {
        /* */
      },
      cropmove: function (/*e*/) {
        /* */
      },
      cropend: function (/*e*/) {
        /* */
        onCropend();
      },
      crop: function (/*e*/) {
        /* */
      },
      zoom: function (/*e*/) {
        /* */
      },
    };
    cropper.value = new Cropper(canvasImg.value, options);
  };
  const onFileAdded = (file) => {
    if (file) {
      // originalimagFile.value = files[0];
      if (/^image\/\w+/.test(originalimagFile.value.type)) {
        canvasImg.value.src = URL.createObjectURL(originalimagFile.value);
        onInitCroper();
      } else {
        appToast('Please choose an image file.', { type: 'negative' });
      }
    }
  };

  const flipHorizontal = () => {
    if (cropper.value) {
      verticalScale.value = verticalScale.value * -1;
      cropper.value.scaleX(verticalScale.value);
    }
  };
  const flipVertical = (/*e*/) => {
    if (cropper.value) {
      horizontalScale.value = horizontalScale.value * -1;
      cropper.value.scaleY(horizontalScale.value);
    }
  };
  // const blobToFile = (blob, originalFile) => {
  //   return new Promise((resolve) => {
  //     const file = new File([blob], originalFile.name, {
  //       lastModified: originalFile.lastModified,
  //       type: originalFile.type,
  //     });
  //     resolve(file);
  //   });
  // };
  const onCropend = () => {
    if (cropper.value) {
      priviewImage.value = cropper.value
        .getCroppedCanvas()
        .toDataURL('image/jpeg');
        emit('on-cropend', priviewImage.value)
    }
  }
  const onOkay = () => {
    if (cropper.value && cropper.value.cropped) {
      loading.value = true;
      cropper.value.getCroppedCanvas().toBlob(async (blob) => {
        const f = await blobToFile(blob, originalimagFile.value.name);
        loading.value = false;
        // emit('on-okay', f);
        emit('on-okay', f);
        onClose();
      }, 'image/jpeg'); // image/png, image/jpeg
    }
  };
  const onRejected = (rejectedEntries) => {
    appToast(t('error.filesValidationFmt', { total: rejectedEntries.length }), {
      type: 'negative',
    });
  };
  /*
      watchEffect(() => {
        show.value = props.dialog;
        // if (props.dialog && props.url) {
  
        //   onFileUrlChange(props.url);
        // }
      });
      */
  watch(
    () => props.dialog,
    (dialog) => {
      show.value = dialog;
    },
  );
</script>
  <template>
    <q-dialog v-model="show" persistent :maximized="maximizedToggle">
      <q-card style="min-width: 80%" flat bordered>
        <q-bar class="bg-transparent q-my-xs">
          <q-icon :name="biCrop" />
          <div>{{ title || '' }}</div>

          <q-space />
          <q-btn round flat :icon="!maximizedToggle ? biArrowsAngleExpand : biArrowsAngleContract"
            @click="maximizedToggle = !maximizedToggle">
            <q-tooltip>{{
              !maximizedToggle ? t('maximize') : t('minimize')
            }}</q-tooltip>
          </q-btn>

          <q-btn round flat :icon="biX" @click="onClose">
            <q-tooltip>{{ t('base.close') }}</q-tooltip>
          </q-btn>
        </q-bar>
        <div class="row">
          <div class="col-12 col-md-5">
            <q-card-section>
              <q-file v-model="originalimagFile" dense outlined bottom-slots :label="t('base.chooseFile')" counter
                max-files="1" accept=".jpg, .png, image/*" :max-file-size="1048576 * 10" @rejected="onRejected"
                @update:model-value="onFileAdded">
                <template #prepend>
                  <q-icon :name="biFileImage" />
                </template>
                <template #hint>
                  {{
                    t('error.filesValidationSizeAndType', {
                      size: 10,
                      extension: '.jpg, .png',
                    })
                  }}
                </template>
              </q-file>
            </q-card-section>
            <template v-if="originalimagFile">
              <slot name="preview">
                <q-card-section class="text-center">
                  <q-avatar rounded size="275px" class="shadow-5">
                    <div class="cropper-img-preview" style="overflow: hidden; width: 275px; height: 275px" />
                  </q-avatar>
                </q-card-section>
                <q-card-section class="q-gutter-sm text-center">
                  <q-avatar size="128px" class="shadow-5">
                    <div class="cropper-img-preview" style="overflow: hidden; width: 128px; height: 128px" />
                  </q-avatar>
                  <q-avatar size="64px" class="shadow-5">
                    <div class="cropper-img-preview" style="overflow: hidden; width: 64px; height: 64px" />
                  </q-avatar>
                  <q-avatar size="32px" class="shadow-5">
                    <div class="cropper-img-preview" style="overflow: hidden; width: 32px; height: 32px" />
                  </q-avatar>
                </q-card-section>
              </slot>
              <div class="q-pa-md">
                <q-btn :icon="biCheck" :label="t('base.okay')" class="full-width" color="primary" unelevated
                  :loading="loading" @click="onOkay" />
              </div>
            </template>
          </div>
          <div class="col-12 col-md-7">
            <q-card-section>
              <div :class="!isDark ? 'bg-grey-1' : 'bg-grey-10'">
                <img ref="canvasImg" style="display: block; max-width: 100%; height: 550px" alt="">
              </div>
            </q-card-section>
            <q-card-section v-if="originalimagFile" class="q-gutter-sm">
              <!--                                <q-btn dense label="Drag" flat @click="cropper.setDragMode('move')"/>-->
              <q-btn :icon="biZoomIn" dense :label="t('zoomIn')" flat @click="cropper.zoom(0.1)" />
              <q-btn :icon="biZoomOut" dense :label="t('zoomOut')" flat @click="cropper.zoom(-0.1)" />

              <q-btn :label="t('rotateLeft')" dense :icon="biArrowCounterclockwise" flat @click="cropper.rotate(-45)" />
              <q-btn :label="t('rotateRight')" dense :icon="biArrowClockwise" flat @click="cropper.rotate(45)" />

              <q-btn :label="t('flipHorizontal')" dense :icon="biArrowLeftRight" flat @click="flipHorizontal" />
              <q-btn :label="t('flipVorizontal')" dense :icon="biArrowsCollapse" flat @click="flipVertical" />
            </q-card-section>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </template>