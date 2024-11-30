<script setup lang="ts" generic="T">
/*
<base-virtual-scroller
            ref="scrollerTestRef"
            class="q-pa-sm"
            key-field="id"
            :items="dataList"
            :min-item-size="24"
            :scroll-area-height="scrollAreaHeight"
            @on-update="onVirtualScrollUpdate"
          >
            <template #slotBefore>
            </template>
            <template v-slot="{ item, index, active }">
              <div
                :key="`message-${item.id}-${index}`"
                :item="item"
              >
                {{item.message}}
              </div>
            </template>
            <template #slotAfter>
            </template>
          </base-virtual-scroller>

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
*/
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import { ref } from 'vue';

const { minItemSize = 54, emitUpdate = true, scrollAreaHeight = '65vh', items, keyField = 'id' } = defineProps<{
  minItemSize?: number;
  emitUpdate?: boolean;
  scrollAreaHeight?: string;
  keyField?: string;
  items: T[]
}>();


const appScrollerRef = ref<any>();
// const emit = defineEmits<{
//   onUpdate: [val: VirtualScrollerUpdate];
// }>();

const emit = defineEmits(['on-update']);
const onScrollToItem = (index: number | undefined) => {
  if (index == undefined) {
    return;
  }
  if (appScrollerRef.value) {
    appScrollerRef.value.scrollToItem(index);
  }
};
const onScrollToBottom = () => {
  if (appScrollerRef.value) {
    appScrollerRef.value.scrollToBottom();
  }
};
const onUpdate = (viewStartIndex: number, viewEndIndex: number, visibleStartIndex: number, visibleEndIndex: number) => {
  // console.log(`${viewStartIndex}-[${visibleStartIndex}-${visibleEndIndex}]-${viewEndIndex}`);
  // if (visibleEndIndex == viewEndIndex) {
  //   console.log('isBottom');
  // } else if (viewStartIndex == 0 && visibleStartIndex == 0) {
  //   console.log('isTop');
  // } else {
  //   console.log('scrolling');
  // }
  const isScrollingToTop = !(visibleEndIndex == viewEndIndex);
  emit('on-update', {
    viewStartIndex, viewEndIndex, visibleStartIndex, visibleEndIndex, isScrollingToTop
  });
};
const onResize = () => {
};
defineExpose({
  onScrollToBottom, onScrollToItem
});
</script>

<template>
  <DynamicScroller v-bind="$attrs" ref="appScrollerRef" :items="items" :emit-update="emitUpdate" :key-field="keyField"
    :min-item-size="minItemSize" :style="{ height: 'auto', maxHeight: scrollAreaHeight }" @resize="onResize"
    @update="onUpdate">
    <template #before>
      <slot name="slotBefore"></slot>
    </template>
    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem :item="item" :active="active" :data-index="index">
        <slot v-bind="{ item, index, active }"></slot>
      </DynamicScrollerItem>
    </template>
    <template #after>
      <slot name="slotAfter"></slot>
    </template>
  </DynamicScroller>
</template>

<style scoped lang="scss"></style>