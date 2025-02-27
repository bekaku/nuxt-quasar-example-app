<script setup lang="ts">
/*
 
        <base-loadmore
          v-if="!isInfiniteDisabled"
          :loading="commentLoading"
          :frist-loaded="fristLoaded"
          :is-infinite-disabled="isInfiniteDisabled"
          :label="t('viewMorReply')"
          @on-next-page="loadNextPage"
          button
          color="text-muted"
          :show-icon="false"
          class="q-ml-md"
        >
        </base-loadmore>
*/
import { biChevronDown } from '@quasar/extras/bootstrap-icons';
withDefaults(
    defineProps<{
        fristLoaded?: boolean
        showIcon?: boolean
        icon?: string
        isInfiniteDisabled?: boolean
        loading?: boolean
        button?: boolean
        small?: boolean
        fullWidth?: boolean
        label?: string
        color?: string
        fill?: 'default' | 'solid' | 'clear' | 'outline'
    }>(),
    {
        fristLoaded: false,
        showIcon: true,
        icon: biChevronDown,
        isInfiniteDisabled: false,
        loading: false,
        button: true,
        small: false,
        fullWidth: false,
        fill: 'solid'
    }
);
const { t } = useLang();
defineEmits(['on-next-page']);
</script>
<template>
    <div class="row justify-center">
        <q-btn :disable="isInfiniteDisabled" :label="label || t('base.loadMore')" class="text-capitalize q-ma-sm"
            :class="color + ' ' + (fullWidth ? 'full-width' : '')" :icon="showIcon ? icon : undefined" flat
            :loading="loading" @click="$emit('on-next-page')" />
    </div>
</template>