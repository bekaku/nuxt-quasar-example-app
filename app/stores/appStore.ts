import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { LabelValue } from "~/types/common";

export const useAppStore = defineStore('appStore', () => {

    const { isMobileOrTablet } = useAppDevice();
    const permissions = ref<string[]>([]);
    const drawers = ref<LabelValue<any>[]>([]);
    const drawerOpen = ref<boolean>(!isMobileOrTablet);
    const expandDrawer = ref<boolean>(!isMobileOrTablet);

    const setPermissions = (items: string[]) => {
        permissions.value = items;
    }

    const setDrawers = (items: LabelValue<any>[]) => {
        drawers.value = items;
    }
    const setDrawerOpen = (open: boolean) => {
        drawerOpen.value = open;
    }
    const setExpandDrawer = (open: boolean) => {
        expandDrawer.value = open;
    }
    return {
        permissions,
        setPermissions,
        drawers,
        setDrawers,
        drawerOpen,
        setDrawerOpen,
        expandDrawer,
        setExpandDrawer
    }
});