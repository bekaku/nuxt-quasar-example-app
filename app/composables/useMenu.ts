import { appNavs } from '~/libs/navs';
import type { IMenu, IMenuPage, IMenuPageItem } from "~/types/common";
export const useMenu = () => {
    const appStore = useAppStore();
    const initialAppNav = async (): Promise<boolean> => {
        const aclFinal: IMenu[] = [];
        let menu: IMenu | null = {};
        for (const menuLevel1 of appNavs) {
            menu = {};
            //Level 1
            if (menuLevel1) {
                if (menuLevel1?.header) {
                    menu.header = menuLevel1.header;
                }
                if (menuLevel1?.border) {
                    menu.border = menuLevel1.border;
                }
                if (menuLevel1?.translate != undefined) {
                    menu.translate = menuLevel1.translate;
                }
                //child pages
                const filterPages: IMenuPage[] = [];
                if (menuLevel1?.pages && menuLevel1.pages.length > 0) {
                    for (const p of menuLevel1.pages) {
                        if (p) {
                            //if have child pages
                            if (p?.items && p.items.length > 0) {
                                const childs = await getFilterItems(p.items);
                                if (childs.length > 0) {
                                    const menuHaveChild = await setMenuPage(p);

                                    menuHaveChild.items = childs;
                                    filterPages.push(menuHaveChild);
                                }
                            } else {
                                const isPermised = !p.permission || await isPermited(p.permission);
                                if (isPermised) {
                                    filterPages.push(p);
                                }
                            }
                        }
                    }
                    menu.pages = [...filterPages];
                }
                if (menu.pages && menu.pages.length > 0) {
                    aclFinal.push(menu);
                }
            }
        }
        if(aclFinal && aclFinal.length>0){
            appStore.setDrawers(aclFinal);
        }
        
        return new Promise((resolve) =>  resolve(true) );
    }
    const getFilterItems = async (pageItems: IMenuPageItem[]): Promise<IMenuPageItem[]> => {
        const childs: IMenuPageItem[] = [];
        for (const item of pageItems) {
            if (item) {
                const isPermised = !item.permission || await isPermited(item.permission);
                if (isPermised) {
                    childs.push(item);
                }
            }
        }
        return new Promise((resolve) => {
            resolve(childs)
        });
    }
    const setMenuPage = (p: IMenuPage): Promise<IMenuPage> => {
        const menuHaveChild: IMenuPage = {};

        if (p?.title) {
            menuHaveChild.title = p.title;
        }
        if (p?.icon) {
            menuHaveChild.icon = p.icon;
        }
        if (p?.color) {
            menuHaveChild.color = p.color;
        }
        if (p?.iconText) {
            menuHaveChild.iconText = p.iconText;
        }
        if (p?.noActiveLink != undefined) {
            menuHaveChild.noActiveLink = p.noActiveLink;
        }
        if (p?.to) {
            menuHaveChild.to = p.to;
        }
        if (p?.border != undefined) {
            menuHaveChild.border = p.border;
        }
        if (p?.translate != undefined) {
            menuHaveChild.translate = p.translate;
        }
        return new Promise((resolve) => {
            resolve(menuHaveChild)
        });

    }

    const isPermited = async (permission: string): Promise<boolean> => {
        return await appStore.isHavePermissionLazy([permission]);
    }
    return {
        initialAppNav
    };
};
