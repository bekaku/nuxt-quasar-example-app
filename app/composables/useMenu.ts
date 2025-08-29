import { appNavs } from '~/libs/navs';
import type { LabelValue } from "~/types/common";
import { useRbac } from './useRbac';
import type { RBACProps } from '~/types/props';
import type { FavoriteMenu } from '~/types/models';
import { biStar, biStarFill } from '@quasar/extras/bootstrap-icons';
export const useMenu = () => {
    const appStore = useAppStore();
    const { setDrawers, drawers } = appStore;
    const { favoriteMenus } = storeToRefs(appStore)
    const { hasPermissionLazy } = useRbac();

    const getFavoriteMenuItems = computed<LabelValue<any>[]>(() => {
        const items: LabelValue<any>[] = [];
        for (const menu of favoriteMenus.value) {
            const result = findByUrl(drawers, menu.url)
            if (result) {
                items.push(result)
            }
        }
        if (items.length > 0) {
            return [
                {
                    label: '',
                    children: [
                        {
                            label: 'base.faveoriteMenuTitle',
                            icon: { name: biStarFill , color: 'yellow' },
                            children: items
                        }
                    ]
                }
            ]

        }
        return items
    })
    const initialAppNav = async (): Promise<boolean> => {
        const aclFinal: LabelValue<any>[] = [];
        let menu: LabelValue<any> | null = {};
        for (const menuLevel1 of appNavs) {
            menu = {};
            //Level 1
            if (menuLevel1) {
                if (menuLevel1?.label) {
                    menu.label = menuLevel1.label;
                }
                if (menuLevel1?.border) {
                    menu.border = menuLevel1.border;
                }
                if (menuLevel1?.translateLabel != undefined) {
                    menu.translateLabel = menuLevel1.translateLabel;
                }
                if (menuLevel1?.icon != undefined) {
                    menu.icon = menuLevel1.icon;
                }
                //child pages
                const filterPages: LabelValue<any>[] = [];
                if (menuLevel1?.children && menuLevel1.children.length > 0) {
                    for (const p of menuLevel1.children) {
                        if (p) {
                            //if have child pages
                            if (p?.children && p.children.length > 0) {
                                const childs = await getFilterItems(p.children);
                                if (childs.length > 0) {
                                    const menuHaveChild = await setMenuPage(p);
                                    menuHaveChild.children = childs;
                                    filterPages.push(menuHaveChild);
                                }
                            } else {
                                const isPermised = await isPermited(p.rbac);
                                if (isPermised) {
                                    filterPages.push(p);
                                }
                            }
                        }
                    }
                    menu.children = [...filterPages];
                }
                if (menu.children && menu.children.length > 0) {
                    aclFinal.push(menu);
                }
            }
        }
        if (aclFinal && aclFinal.length > 0) {
            setDrawers(aclFinal);
        }

        return new Promise((resolve) => resolve(true));
    }
    const getFilterItems = async (pageItems: LabelValue<any>[]): Promise<LabelValue<any>[]> => {
        const childs: LabelValue<any>[] = [];
        for (const item of pageItems) {
            if (item) {
                const isPermised = await isPermited(item.rbac);
                if (isPermised) {
                    childs.push(item);
                }
            }
        }
        return new Promise((resolve) => {
            resolve(childs)
        });
    }
    const setMenuPage = (p: LabelValue<any>): Promise<LabelValue<any>> => {
        // const menuHaveChild: LabelValue<any> = {};

        // if (p?.label) {
        //     menuHaveChild.label = p.label;
        // }
        // if (p?.icon) {
        //     menuHaveChild.icon = p.icon;
        //     menuHaveChild.iconSet = p.iconSet;
        //     menuHaveChild.iconSize = p.iconSize;
        // }
        // if (p?.color) {
        //     menuHaveChild.color = p.color;
        // }
        // if (p?.noActiveLink != undefined) {
        //     menuHaveChild.noActiveLink = p.noActiveLink;
        // }
        // if (p?.to) {
        //     menuHaveChild.to = p.to;
        // }
        // if (p?.border != undefined) {
        //     menuHaveChild.border = p.border;
        // }
        // if (p?.translateLabel != undefined) {
        //     menuHaveChild.translateLabel = p.translateLabel;
        // }
        return new Promise((resolve) => {
            // resolve(menuHaveChild)
            resolve(p)
        });

    }

    const isPermited = async (rabc: RBACProps | undefined): Promise<boolean> => {
        return await hasPermissionLazy(rabc);
    }

    const findByUrl = (arr: LabelValue<any>[], to: string): LabelValue<any> | null => {
        for (const item of arr) {
            if (item.to === to) {
                return item
            }
            if (item.children) {
                const found = findByUrl(item.children, to)
                if (found) return found
            }
        }
        return null
    }
    const isFaveroteExist = (url: string) => {
        return favoriteMenus.value.some((item: FavoriteMenu) => item.url === url);
    }
    const getFaveroteIndex = (url: string) => {
        return favoriteMenus.value.findIndex((item: FavoriteMenu) => item.url === url);
    }
    return {
        initialAppNav,
        findByUrl,
        isFaveroteExist,
        getFaveroteIndex,
        getFavoriteMenuItems
    };
};
