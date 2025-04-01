<script setup lang="ts">
import { biX } from '@quasar/extras/bootstrap-icons';
import { additionalMenu } from '~/libs/navs';
import type { LabelValue } from '~/types/common';
const { drawers } = useAppStore()
const { t } = useLang();

const modelValue = defineModel<boolean>({ default: false });
const commandPaletteModel = ref<string>()
const loading = ref<boolean>(true);

const menuItems = ref<LabelValue<string>[]>([]);
const emit = defineEmits<{
    'on-click': [value: string]
}>()
onMounted(async () => {
    await onSetMenu();
    loading.value = false
})

const onSetMenu = (): Promise<boolean> => {
    const initialMenuItems: LabelValue<any>[] = drawers.concat(additionalMenu);
    return new Promise((resolve) => {
        for (const menuLevel1 of initialMenuItems) {
            if (menuLevel1.children != undefined && menuLevel1.children.length > 0) {
                for (const p of menuLevel1.children) {
                    if (p.children != undefined && p.children.length > 0) {
                        const parentItem: LabelValue<string> =
                        {
                            ...p,
                            label: p.label && p.translateLabel !== false ? t(p.label) : p.label || '',
                            children: []
                        }
                        // {
                        //     label: p.label && p.translateLabel !== false ? t(p.label) : p.label || '',
                        //     description: p.description,
                        //     icon: p.icon,
                        //     iconSet: p.iconSet,
                        //     iconSize: p.iconSize,
                        //     value: p.to,
                        //     children: []
                        // }
                        const childs: LabelValue<string>[] = [];
                        for (const item of p.children) {
                            childs.push({
                                ...item,
                                label: item.label && item.translateLabel !== false ? t(item.label) : item.label || '',
                                value: item.to
                            })
                            // childs.push({
                            //     label: item.label && item.translateLabel !== false ? t(item.label) : item.label || '',
                            //     description: item.description,
                            //     icon: item.icon,
                            //     iconSet: item.iconSet,
                            //     iconSize: item.iconSize,
                            //     value: item.to
                            // })
                        }
                        parentItem.children = childs;
                        menuItems.value.push(parentItem);
                    } else {
                        menuItems.value.push({
                           ...p,
                           label: p.label && p.translateLabel !== false ? t(p.label) : p.label || '',
                           value: p.to
                        })
                        // menuItems.value.push({
                        //     label: p.label && p.translateLabel !== false ? t(p.label) : p.label || '',
                        //     description: p.description,
                        //     icon: p.icon,
                        //     iconSet: p.iconSet,
                        //     iconSize: p.iconSize,
                        //     value: p.to
                        // })
                    }
                }
            }
        }
        resolve(true);
    })
}
const onClickItem = (val: string | undefined) => {
    if (val != undefined) {
        // appNavigateTo(val);
        // modelValue.value = false;
        emit('on-click', val)
    }
}
</script>
<template>
    <BaseDialog v-model="modelValue" :show-toolbar="false" :padding="false" dialog-style="width: 756px; max-width: 80vw;">
        <BaseCommandPalette v-model="commandPaletteModel" :loading="loading" :bordered="false" class="q-pt-sm" :multiple="false"
            :items="menuItems" @on-click="onClickItem">
            <template #inputAppend>
                <BaseButton round flat :icon="biX" @click="modelValue = false" />
            </template>
        </BaseCommandPalette>
    </BaseDialog>
</template>