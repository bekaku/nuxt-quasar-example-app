<script setup lang="ts">
import type { OgMeta } from '~/types/common';
import { catchUrlFromText } from '~/utils/appUtil';

const props = withDefaults(
    defineProps<{
        content: string;
        short?: boolean;
        textLines?: number;
        descriptionLines?: number;
        showBg?: boolean;
        imageSize?: string;
        imageMaxHeight?: string;
    }>(),
    {
        short: false,
        showBg: true,
        textLines: 1,
        descriptionLines: 2,
        imageSize: '80px',
        imageMaxHeight: '250px'
    }
);
const opengraphItem = ref<OgMeta>();
const showOg = ref(false);
onMounted(async () => {
    if (props.content) {
        const matches = catchUrlFromText(props.content);
        if (matches && matches.length > 0) {
            // if (!isLinkFromWebApp(matches[0])) {
            const res = await $fetch<OgMeta>(`/api/meta?url=${encodeURIComponent(matches[0])}`);
            if (res) {
                opengraphItem.value = res;
                showOg.value = true;
            }
            // }
        }
    }
});
</script>
<template>
    <LazyBaseOpenGraphItem v-if="opengraphItem && showOg" v-bind="$attrs" :item="opengraphItem" :short="short"
        :text-lines="textLines" :description-lines="textLines" :show-bg="showBg" :image-size="imageSize"
        :image-max-height="imageMaxHeight" />
</template>
