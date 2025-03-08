<script setup lang="ts">
import type { AppColor, IPagination } from '~/types/common';
import {
    mdiChevronLeft,
    mdiChevronRight,
    mdiSkipNext,
    mdiSkipPrevious
} from '@quasar/extras/mdi-v7';
import { biChevronExpand } from '@quasar/extras/bootstrap-icons';
const { maxPages = 7, boundaryNumbers = false, boundaryLink = false, directionLink = true, outline = false, canChangePerpage = true } = defineProps<{
    maxPages?: number
    boundaryNumbers?: boolean
    boundaryLink?: boolean
    directionLink?: boolean
    outline?: boolean
    canChangePerpage?: boolean
    color?: AppColor
}>();
const { t } = useLang();
const { isDark } = useTheme();
const modelValue = defineModel<IPagination>();
const emit = defineEmits<{
    'update-current': [value: number | undefined]
    'update-perpage': [value: number | undefined]
}>()
watch(
    () => modelValue.value?.current,
    (v) => {
        emit('update-current', v);
    }
);
watch(
    () => modelValue.value?.itemsPerPage,
    (v) => {
        emit('update-perpage', v);
    }
);
</script>
<template>
    <div v-if="modelValue" class="row justify-between items-center" :style="{ background: !isDark ? 'var( --color-zinc-50)': 'var( --color-zinc-800)' }">
        <div class="flex q-pa-md text-muted">
            {{ t('base.total') }} {{ modelValue.totalElements }}
        </div>
        <div class="flex q-pa-md">
            <q-select v-if="canChangePerpage" v-model="modelValue.itemsPerPage" dense outlined
                :label="t('paging.rowsPerPage')" class="q-mx-lg" :options="modelValue.perPageList" option-value="value"
                option-label="text" emit-value map-options style="min-width: 155px; max-width: 200px"
                :dropdown-icon="biChevronExpand" />

            <q-pagination v-model="modelValue.current" :direction-links="directionLink" :boundary-links="boundaryLink"
                :outline="outline" :boundary-numbers="boundaryNumbers" :max="modelValue.totalPages"
                :max-pages="maxPages" :color="color || (isDark ? 'primary' : 'black')" :icon-first="mdiSkipPrevious"
                :icon-last="mdiSkipNext" :icon-next="mdiChevronRight" :icon-prev="mdiChevronLeft" />
        </div>
    </div>
</template>