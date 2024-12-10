<template>
    <div class="row justify-center">
        <q-btn @click="$emit('on-next-page')" :disable="isInfiniteDisabled" :label="label"
            class="text-capitalize q-ma-sm" :class="color + ' ' + (fullWidth ? 'full-width' : '')"
            :icon="showIcon ? icon : undefined" flat :loading="loading">
        </q-btn>
    </div>
</template>
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
defineEmits(['on-next-page']);
</script>