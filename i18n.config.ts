import en from '~/i18n/en';
import th from '~/i18n/th';
export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'th',
    messages: {
        en,
        th
    }
}))