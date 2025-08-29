import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import type { LabelValue } from "~/types/common";
import type { FavoriteMenu } from '~/types/models';

export const useAppStore = defineStore('appStore', () => {
    const { initialAppNav } = useMenu();
    const { isMobileOrTablet } = useAppDevice();
    const permissions = ref<string[]>([]);
    const drawers = ref<LabelValue<any>[]>([]);
    const drawerOpen = ref<boolean>(!isMobileOrTablet);
    const expandDrawer = ref<boolean>(!isMobileOrTablet);

    const favoriteMenus = ref<FavoriteMenu[]>([]);
    const favoritDrawers = ref<LabelValue<any>[]>([]);

    const setPermissions = async (items: string[]) => {
        permissions.value = items;
        await initialAppNav();
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
    const setFavoriteMenus = (items?: FavoriteMenu[]) => {
        favoriteMenus.value = items || [];
    }
    const addFavoriteMenus = (item: FavoriteMenu) => {
        favoriteMenus.value.push(item)
    }
    return {
        permissions,
        setPermissions,
        drawers,
        setDrawers,
        drawerOpen,
        setDrawerOpen,
        expandDrawer,
        setExpandDrawer,
        favoriteMenus,
        setFavoriteMenus,
        addFavoriteMenus,
        favoritDrawers
    }
});