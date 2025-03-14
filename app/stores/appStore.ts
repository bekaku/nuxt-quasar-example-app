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
    const isPermited = (code: string): boolean => {
        return permissions.value.find((t: string) => t === code) != undefined;
    }
    const isHavePermission = (codes: string[] | undefined): boolean => {
        if (codes == undefined || codes.length == 0) {
            return true;
        }
        let isHave = false;
        for (const code of codes) {
            if (!isHave) {
                isHave = isPermited(code);
                if (isHave) {
                    break;
                }
            }
        }
        return isHave
    }
    const isHavePermissionLazy = (codes: string[] | undefined): Promise<boolean> => {
        return new Promise((resolve) => {
            const isHave = isHavePermission(codes)
            resolve(isHave);
        })
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
        isHavePermission,
        isHavePermissionLazy,
        drawers,
        setDrawers,
        drawerOpen,
        setDrawerOpen,
        expandDrawer,
        setExpandDrawer
    }
});