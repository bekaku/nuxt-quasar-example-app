import type { ITheme } from "~/types/common";

export const useTheme = () => {
    const { dark } = useQuasar();
    const themeCookie = useCookie<ITheme>('color-mode', {
        default: () => ('light'),
        expires: addDateByDays(365),
        path: '/',
        sameSite: 'lax'
    },)

    const onSetTheme = (theme: ITheme) => {
        themeCookie.value= theme;
        initialQuasarDark();
    }
    const initialQuasarDark = () => {
       dark.set(themeCookie.value =='dark');
    }
    return {
        onSetTheme,
        initialQuasarDark,
        dark
    };
};
