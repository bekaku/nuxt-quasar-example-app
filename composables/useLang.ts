import type { ILanguge, ILocales } from "~/types/common";

export const useLang = () => {
    const availableLocales: ILocales[] = [
        {
            name: 'English',
            iso: 'en',
            flag: '🇺🇸',
        },
        {
            name: 'ไทย',
            iso: 'th',
            flag: 'TH',
        },
    ];
    const config = useRuntimeConfig()
    const localeCookie = useCookie<ILanguge>('locale', {
        expires: addDateByDays(365),
        path: '/',
        sameSite: 'lax'
    })
    const { t, locale } = useI18n({ useScope: 'global' });
    const currentLangugeName = computed(() => {
        const l = availableLocales.find(t => t.iso == locale.value);
        return l != undefined && l?.name ? l?.name : 'unknown'
    })
    const initialLocale = () => {
        const currentLocale = localeCookie.value || config.public.defaultLocale;
        onSetLocale(currentLocale as ILanguge);
    }
    const onSetLocale = (l: ILanguge) => {
        if (!l) {
            return;
        }
        localeCookie.value = l;
        locale.value = l;
    }
    const onSwitchLocale = (l: ILanguge) => {
        onSetLocale(l);
        // if(!import.meta.server){
        //     window.location.reload()
        // }
    }
    return {
        t,
        locale,
        onSetLocale,
        onSwitchLocale,
        initialLocale,
        availableLocales,
        currentLangugeName
    };
};
