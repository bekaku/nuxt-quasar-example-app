<script setup lang="ts">
import { QuasarFilePicker } from '#components';
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
  