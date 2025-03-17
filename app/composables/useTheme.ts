import { biMoon, biSun } from "@quasar/extras/bootstrap-icons";
import type { ITheme, IThemeItem } from "~/types/common";

export const useTheme = () => {
    const availableThemes: IThemeItem[] = [
        { key: 'light', text: 'theme.light', icon: biSun },
        { key: 'dark', text: 'theme.dark', icon: biMoon },
        // { key: 'system', text: 'theme.systemTheme', icon: biLaptop },
        // { key: 'realtime', text: 'theme.realtimeTheme', icon: biClock },
    ];
    const { dark } = useQuasar();
    const isDark = computed<boolean>(() => dark.isActive);
    const themeCookie = useCookie<ITheme>('color-mode', {
        default: () => ('light'),
        expires: addDateByDays(365),
        path: '/',
        sameSite: 'lax'
    },)

    const currentTheme = computed(() => themeCookie.value)
    const onSetTheme = (theme: ITheme) => {
        dark.set(theme === 'dark');
        themeCookie.value = theme;
        // initialQuasarDark();
    }
    const initialQuasarDark = () => {
        dark.set(themeCookie.value == 'dark');
    }
    return {
        onSetTheme,
        initialQuasarDark,
        dark,
        isDark,
        availableThemes,
        currentTheme
    };
};
