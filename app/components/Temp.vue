<script setup lang="ts" generic="T">
import type { QuasarFilePicker } from '#components';
// const { count = 0, message = 'hello' } = defineProps<{
//   count?: number
//   message?: string
// }>();
const props = withDefaults(
  defineProps<{
    height?: number;
    autofocus?: boolean;
  }>(),
  {
    height: 450,
    autofocus: false
  }
);
const emit = defineEmits<{
  'on-close': []
  change: [id: number]
  update: [value: string]
}>()

// const emit = defineEmits(['on-close', 'update:modelValue']);
const filePickerCustomUiRef = useTemplateRef<InstanceType<typeof QuasarFilePicker>>('filePickerCustomUiRef');
const onClick = async (index: number, event: any) => {
  if (event) {
    // event.stopPropagation();
    event.preventDefault();
    // event.stopImmediatePropagation();
  }
  console.log('onRemove', index);
};

// <comp-use-model v-model="testModel" v-model:count="count"></comp-use-model>
// const count = defineModel('count', { type: Number, default: 0 });
// const count = defineModel('count', { type: Object as PropType<ISortMode>, default: {} });
//const count = defineModel('count',{default: 0});
// const modelValue = defineModel<number>();
// const modelValue = defineModel<number[]>({ default: [] });
//const count = defineModel<number>('count',{default: 0});
//const open = defineModel<boolean>('open');
/*
How to access to a child method from the parent

//call from parent
const childComponentRef = ref()
const childComponentRef = useTemplateRef<InstanceType<typeof ChildComponent>>('childComponentRef')
 childComponentRef.value.onTestClickFromParent()
<template>
    <ChildComponent ref="childComponentRef" />
</template>
 */
const onTestClickFromParent = (from: string) => {
  console.log('onTestClickFromParent', from);
};
defineExpose({
  onTestClickFromParent
});
/*
To disable all rules on a specific line
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
*/
</script>
<template>
  <q-card v-bind="$attrs" flat class="full-height">

    <!-- 
      <slot name="additionalBaseTool" v-bind="{ item: item, index: index }">
      </slot> 
      
       <template #additionalBaseTool="{ item, index }">
       </template>
-->
  </q-card>
</template>
<style scoped lang="scss">
.text-holder-fitcontent {
  background-color: var(--dark-100);
  // line-clamp: v-bind(lines);
}

body.body--dark {
  .text-holder-fitcontent {
    background-color: var(--dark-900);
  }
}
</style>