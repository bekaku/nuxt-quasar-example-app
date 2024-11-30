<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import { biArrowDown, biArrowUp } from '@quasar/extras/bootstrap-icons';
import { onMounted, ref, useTemplateRef } from 'vue';
import type { VirtualScrollerUpdate } from '~/types/common';
const { t } = useLang();

useHead({
    title: `Virtual scroller | ${t('app.name')}`
})

const dataList = ref<any[]>([])
const maxSize = 10000
const updateItem = ref<VirtualScrollerUpdate>();
const scrollerTestRef = useTemplateRef<any>('scrollerTestRef');

onMounted(() => {
    for (let i = 0; i < maxSize; i++) {
        dataList.value.push({
            id: (i + 1),
            label: 'Option ' + (i + 1)
        })
    }
})
const onVirtualScrollUpdate = (item: VirtualScrollerUpdate) => {
    console.log('onVirtualScrollUpdate', item);
    updateItem.value = item;
};
const onScrollTo = (index: number) => {
    if (scrollerTestRef.value) {
        scrollerTestRef.value.onScrollToItem(index);
    }
}
const scrollToBottom = () => {
    if (scrollerTestRef.value) {
        scrollerTestRef.value.onScrollToBottom();
    }
};
</script>
<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Virtual scroller </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section class="q-gutter-y-lg">
                <div>
                    <p v-if="updateItem">({{
                        `${updateItem.viewStartIndex}-[${updateItem.visibleStartIndex}-${updateItem.visibleEndIndex}]-${updateItem.viewEndIndex}`}})
                    </p>
                </div>
                <q-card-actions>
                    <q-btn :icon="biArrowDown" no-caps label="Scroll to bottom" @click="scrollToBottom" />
                    <q-btn :icon="biArrowUp" no-caps label="Scroll to top" @click="onScrollTo(0)" />
                </q-card-actions>
                <BaseVirtualScroller id="scroll-chat-target-id" ref="scrollerTestRef" class="q-pa-sm" key-field="id"
                    :items="dataList" :min-item-size="24" scroll-area-height="250px" @on-update="onVirtualScrollUpdate">
                    <template #slotBefore>
                        Before Slot
                    </template>
                    <template v-slot="{ item, index, /*active */ }">
                        <q-item :key="index" dense clickable>
                            <q-item-section>
                                <q-item-label>
                                    #{{ index }} - {{ item.label }}
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </template>
                    <template #slotAfter>
                        After Slot
                    </template>
                </BaseVirtualScroller>
            </q-card-section>
        </q-card>

    </q-page>
</template>
<style lang="scss" scoped></style>