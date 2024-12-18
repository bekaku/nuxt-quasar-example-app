<script setup lang="ts">
import type { IHrefTarget } from '~/types/common';
const { external = false, color = 'text-muted' } = defineProps<{
    label: string
    external?: boolean
    href?: string
    target?: IHrefTarget
    to?: string
    color?: string
    colorDark?: string
}>();
const { isDark } = useTheme();
// const { appGoto } = useBase();
// const onOpen = (event: any) => {
//   if (props.to) {
//     appGoto(props.to);
//   } else if (props.href) {
//     openUrlInNewTab(props.href, props.external ? '_blank' : '_self', event);
//   }
//   if (event) {
//     event.stopImmediatePropagation();
//   }
// };
</script>
<template>
    <q-btn type="a" align="left" :class="!isDark ? color : colorDark"
        class="text-capitalize app-text-link btn--no-hover" dense flat :to="to" :href="href ? href : undefined"
        :target="external ? '_blank' : undefined" :label="label">
        <slot />
    </q-btn>
</template>
<style lang="scss" scoped></style>