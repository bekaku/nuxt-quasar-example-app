import type { ILanguge, ILocales } from "~/types/common";

export const useLang = () => {
    const { t, locale, setLocale } = useI18n({ useScope: 'global' });
    const timeout = ref<any>();
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
        // localeCookie.value = l;
        // locale.value = l;
        setLocale(l);
    }
    const onSwitchLocale = (l: ILanguge) => {
        onSetLocale(l);
        timeout.value = setTimeout(() => {
            window.location.reload()
        }, 500);
    }
    onBeforeUnmount(() => {
        if (timeout.value) {
            clearTimeout(timeout.value)
            timeout.value = undefined;
        }
    })
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
