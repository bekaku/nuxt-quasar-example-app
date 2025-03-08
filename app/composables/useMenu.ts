import { appNavs } from '~/libs/navs';
import type { LabelValue } from "~/types/common";
export const useMenu = () => {
    const appStore = useAppStore();
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
                                const isPermised = !p.permissions || p.permissions.length == 0 || await isPermited(p.permissions);
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
                const isPermised = !item.permissions || item.permissions.length == 0 || await isPermited(item.permissions);
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
        const menuHaveChild: LabelValue<any> = {};

        if (p?.label) {
            menuHaveChild.label = p.label;
        }
        if (p?.icon) {
            menuHaveChild.icon = p.icon;
        }
        if (p?.color) {
            menuHaveChild.color = p.color;
        }
        // if (p?.iconText) {
        //     menuHaveChild.iconText = p.iconText;
        // }
        if (p?.noActiveLink != undefined) {
            menuHaveChild.noActiveLink = p.noActiveLink;
        }
        if (p?.to) {
            menuHaveChild.to = p.to;
        }
        if (p?.border != undefined) {
            menuHaveChild.border = p.border;
        }
        if (p?.translateLabel != undefined) {
            menuHaveChild.translateLabel = p.translateLabel;
        }
        return new Promise((resolve) => {
            resolve(menuHaveChild)
        });

    }

    const isPermited = async (permissions: string[]): Promise<boolean> => {
        return await appStore.isHavePermissionLazy(permissions);
    }
    return {
        initialAppNav
    };
};
