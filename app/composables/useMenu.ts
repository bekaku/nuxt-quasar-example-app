import { appNavs } from '~/libs/navs';
import type { LabelValue } from "~/types/common";
import { useRbac } from './useRbac';
import type { RBACProps } from '~/types/props';
export const useMenu = () => {
    const appStore = useAppStore();
    const { hasPermissionLazy } = useRbac();
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
            appStore.setDrawers(aclFinal);
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
    return {
        initialAppNav
    };
};
