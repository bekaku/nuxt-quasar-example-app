<script setup lang="ts">
import { biX } from '@quasar/extras/bootstrap-icons';
import { additionalMenu } from '~/libs/navs';
import type { IMenu, LabelValue } from '~/types/common';
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
    const initialMenuItems: IMenu[] = drawers.concat(additionalMenu);
    return new Promise((resolve) => {
        for (const menuLevel1 of initialMenuItems) {
            if (menuLevel1.pages != undefined && menuLevel1.pages.length > 0) {
                for (const p of menuLevel1.pages) {
                    if (p.items != undefined && p.items.length > 0) {
                        const parentItem: LabelValue<string> =
                        {
                            label: p.title && p.translate !== false ? t(p.title) : p.title || '',
                            description: p.caption,
                            icon: p.icon,
                            children: []
                        }
                        const childs: LabelValue<string>[] = [];
                        for (const item of p.items) {
                            childs.push({
                                label: item.title && item.translate !== false ? t(item.title) : item.title || '',
                                description: item.caption,
                                icon: item.icon,
                                value: item.to
                            })
                        }
                        parentItem.children = childs;
                        menuItems.value.push(parentItem);
                    } else {
                        menuItems.value.push({
                            label: p.title && p.translate !== false ? t(p.title) : p.title || '',
                            description: p.caption,
                            icon: p.icon,
                            value: p.to
                        })
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
    <BaseDialog v-model="modelValue" :show-toolbar="false" dialog-style="width: 756px; max-width: 80vw;">
        <quasar-command-palette v-model="commandPaletteModel" :loading="loading" class="q-pt-sm" :multiple="false"
            :items="menuItems" @on-click="onClickItem">
            <template #inputAppend>
                <QuasarButton round :icon="biX" @click="modelValue = false" />
            </template>
        </quasar-command-palette>
    </BaseDialog>
</template>