import { biMoon, biSun } from "@quasar/extras/bootstrap-icons";
import type { ITheme, IThemeItem } from "~/types/common";

export const useTheme = () => {
    const availableThemes: IThemeItem[] = [
        { key: 'light', text: 'theme.light', icon: biSun },
        { key: 'dark', text: 'theme.dark', icon: biMoon },
        // { key: 'system', text: 'theme.systemTheme', icon: biLaptop },
        // { key: 'realtime', text: 'theme.realtimeTheme', icon: biClock },
    ];
    const { $q } = useNuxtApp();
    const isDark = computed<boolean>(() => $q?.dark.isActive || false);
    const themeCookie = useCookie<ITheme>('color-mode', {
        default: () => ('light'),
        expires: addDateByDays(365),
        path: '/',
        sameSite: 'lax'
    },)

    const currentTheme = computed(() => themeCookie.value)
    const onSetTheme = (theme: ITheme) => {
        if (import.meta.server) {
            return
        }
        $q?.dark.set(theme === 'dark');
        themeCookie.value = theme;
        // initialQuasarDark();
    }
    const initialQuasarDark = () => {
        if (import.meta.server) {
            return
        }
        $q?.dark.set(themeCookie.value == 'dark');
    }
    return {
        onSetTheme,
        initialQuasarDark,
        isDark,
        availableThemes,
        currentTheme
    };
};
