<script setup lang="ts">
const { src, fitParent = false, textLayer = false, hideForms = false } = defineProps<{
    src: any;
    fitParent?: boolean;
    textLayer?: boolean;
    width?: number | undefined;
    height?: number | undefined;
    watermarkText?: string | undefined;
    hideForms?: boolean;
}>();
const { $usePDF } = useNuxtApp();
const scale = defineModel('scale', { type: Number, default: 1 });
const page = defineModel('page', { type: Number, default: 1 });
const pagess = defineModel('pagess', { type: Number, default: 1 });
const loading = defineModel('loading', { type: Boolean, default: true });

const firstLoaded = ref(false);
const { pdf, pages, /*info*/ } = $usePDF(src);
const emit = defineEmits(['onPageChange']);

const onLoaded = () => {
    firstLoaded.value = true;
    pagess.value = pages.value;
};
</script>
<template>
<ClientOnly>
    <div class="row justify-center">
      <q-linear-progress
        v-if="!firstLoaded"
        query
        color="primary"
        style="height: 5px;"
      />
        <pdf-vue
          :pdf="pdf"
          :scale="scale"
          :page="page"
          @loaded="onLoaded"
          :fit-parent="fitParent"
          :width="width"
          :height="height"
          :text-layer="textLayer"
          :watermark-text="watermarkText"
          :hide-forms="hideForms"
        />
    </div>
</ClientOnly>
</template>