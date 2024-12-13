<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import { biArrowDown, biArrowUp } from '@quasar/extras/bootstrap-icons';
import { onMounted, ref, useTemplateRef } from 'vue';
import type { VirtualScrollerUpdate } from '~/types/common';
const { t } = useLang();

useHead({
    title: 'Virtual scroller'
})

const dataList = ref<any[]>([])
const maxSize = 10000
const updateItem = ref<VirtualScrollerUpdate>();
const scrollerDynamicRef = useTemplateRef<any>('scrollerDynamicRef');


const scrollerRecycleRef = useTemplateRef<any>('scrollerRecycleRef')
const chatInfinityScrollRef = useTemplateRef<any>('chatInfinityScrollRef');
const items = ref<any[]>([]);
const loading = ref(false);
const scrollPosition = ref<number>(10);
onMounted(() => {
    for (let i = 0; i < maxSize; i++) {
        dataList.value.push({
            id: (i + 1),
            label: 'Option ' + (i + 1)
        })
    }
    generateItems();
})
const onVirtualScrollUpdate = (item: VirtualScrollerUpdate) => {
    // console.log('onVirtualScrollUpdate', item);
    updateItem.value = item;
};
const onScrollTo = (index: number) => {
    if (scrollerDynamicRef.value) {
        scrollerDynamicRef.value.onScrollToItem(index);
    }
}
const scrollToBottom = () => {
    if (scrollerDynamicRef.value) {
        scrollerDynamicRef.value.onScrollToBottom();
    }
};


//Recycle
const generateItems = () => {
    let count = items.value.length;
    for (let i = 0; i < 40; i++) {
        count++;
        items.value.push({
            id: count,
            label: 'Option ' + count
        })
    }
};
const scrollTo = () => {
    if (scrollerRecycleRef.value) {
        scrollerRecycleRef.value.onScrollToItem(scrollPosition.value || 0);
    }
}
const stopInfinityScroll = () => {
    if (chatInfinityScrollRef.value) {
        chatInfinityScrollRef.value.stop();
    }
};
const resumeInfinityScroll = () => {
    if (chatInfinityScrollRef.value) {
        chatInfinityScrollRef.value.resume();
    }
};
const onInfinite = (index: number, done: any) => {
    setTimeout(() => {
        generateItems();
        done();
    }, 500);
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
                <div class="text-h5">
                    Dynamic Scroller
                </div>
                <div>
                    <p v-if="updateItem">({{
                        `${updateItem.viewStartIndex}-[${updateItem.visibleStartIndex}-${updateItem.visibleEndIndex}]-${updateItem.viewEndIndex}`
                        }})
                    </p>
                </div>
                <q-card-actions>
                    <q-btn :icon="biArrowDown" no-caps label="Scroll to bottom" @click="scrollToBottom" />
                    <q-btn :icon="biArrowUp" no-caps label="Scroll to top" @click="onScrollTo(0)" />
                </q-card-actions>
                <BaseVirtualScrollerDynamic
ref="scrollerDynamicRef" class="q-pa-sm"
                    key-field="id" :items="dataList" :min-item-size="24" scroll-area-height="200px"
                    @on-update="onVirtualScrollUpdate">
                    <template #slotBefore>
                        Before Slot
                    </template>
                    <template #default="{ item, index, /*active */ }">
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
                </BaseVirtualScrollerDynamic>
            </q-card-section>

            <q-card-section class="q-gutter-y-lg">
                <div class="text-h5">
                    Recycle Scroller + infinite-scroll
                </div>

                <div>
                    <q-input v-model="scrollPosition" label="Scroll to" type="number">
                        <template #append>
                            <q-btn label="Go" color="primary" @click="scrollTo" />
                        </template>
                    </q-input>
                </div>
                <BaseVirtualScrollerRecycle
id="scroll-chat-target-id" ref="scrollerRecycleRef"
                    style="padding-bottom:65px" :items="items" scroll-area-height="200px" :min-item-size="42">
                    <template #slotBefore>
                        Slot before
                    </template>
                    <template #default="{ item, index, }">
                        <q-item clickable>
                            <q-item-section avatar>
                                <q-avatar>
                                    <img src="https://cdn.quasar.dev/img/avatar.png">
                                </q-avatar>
                            </q-item-section>
                            <q-item-section>
                                {{ item.label }}
                            </q-item-section>
                            <q-item-section side>
                                <q-chip>
                                    #{{ index  }}
                                </q-chip>
                            </q-item-section>
                        </q-item>
                    </template>

                    <template #slotAfter>
                        Slot after
                    </template>
                </BaseVirtualScrollerRecycle>
                <q-infinite-scroll
ref="chatInfinityScrollRef" scroll-target="#scroll-chat-target-id"
                    @load="onInfinite">
                    <template #loading>
                        <div class="row justify-center q-my-md">
                            <q-spinner color="primary" name="dots" size="40px" />
                        </div>
                    </template>
                </q-infinite-scroll>
            </q-card-section>
        </q-card>

    </q-page>
</template>
<style lang="scss" scoped></style>