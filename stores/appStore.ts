import {defineStore} from 'pinia';
import {ref} from 'vue';
import type {IMenu} from "~/types/common";

export const useAppStore = defineStore('appStore', () => {

    const permissions = ref<string[]>([]);
    const drawers = ref<IMenu[]>([]);
    const leftDrawerOpen = ref<boolean>(true);

    const setPermissions = (items: string[]) => {
        permissions.value = items;
    }
    const isPermited = (code: string): boolean => {
        return permissions.value.find((t: string) => t === code) != undefined;
    }
    const isHavePermission = (codes: string[] | undefined): Promise<boolean> => {
        if (codes == undefined || codes.length == 0) {
            return new Promise((resolve) => resolve(true));
        }
        return new Promise((resolve) => {
            let isHave = false;
            for (const code of codes) {
                if (!isHave) {
                    isHave = isPermited(code);
                    if (isHave) {
                        break;
                    }
                }
            }
            resolve(isHave);
        })
    }

    const setDrawers=(items: IMenu[])=>{
        drawers.value = items;
    }
    const setLeftDrawer=(open: boolean)=>{
        leftDrawerOpen.value = open;
    }
    return {
        permissions,
        setPermissions,
        isHavePermission,
        drawers,
        setDrawers,
        leftDrawerOpen,
        setLeftDrawer
    }
});