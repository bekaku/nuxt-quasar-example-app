import { Clipboard } from '@capacitor/clipboard';
import { biCheckCircle, biExclamationCircle, biExclamationTriangle, biInfoCircle, biX } from "@quasar/extras/bootstrap-icons";
import DOMPurify from 'dompurify';
import { useQuasar } from "quasar";
import type { RouteLocationRaw } from "vue-router";
import type { AppNuxtError, IPageMeta, NavigateToOptions, NotifyOptions } from "~/types/common";
export const useBase = () => {
    // const { $domPurify } = useNuxtApp()
    const route = useRoute();
    const router = useRouter();
    const { loading, notify, dialog, dark } = useQuasar();
    const { isServer } = useAppDevice();
    const { t } = useLang();
    const getCurrentPath = (fullPath = true) => {
        return fullPath ? route.fullPath : route.path;
    };
    const getPreviousPath = () => {
        return router.options.history.state.back;
    };
    const getPageMeta = () => {
        return route.meta;
    }
    const getPageMetaByKey = (key: IPageMeta) => {
        return route.meta[key];
    }
    const getParam = <T>(field: string): T | undefined => {
        if (!field) {
            return undefined;
        }
        return route.params ? (route.params[field] as T) : undefined;
    };
    const getParamNumber = (att: string): number => {
        const val = getParam(att);
        return val != undefined ? +val : 0;
    };
    const getQuery = <T>(field: string): T | undefined => {
        if (!field) {
            return;
        }
        return route.query ? (route.query[field] as T) : undefined;
    };
    const getQueryNumber = (att: string): number => {
        const val = getQuery(att);
        return val != undefined ? +val : 0;
    };
    const onReplaceUrl = (url: string) => {
        history.pushState({}, '', url);
    };
    const onPageGo = (link: string | undefined, replace?: boolean): void => {
        if (!link) {
            return;
        }
        if (!replace) {
            router.push(link);
        } else {
            router.replace(link);
        }
    };
    /*
    navigateTo('/about', {
        replace: true, // Replace current history entry
        external: false, // Handle external links
        force: false, // Force navigation even if route is same
    })
    https://nuxt.com/docs/api/utils/navigate-to
    */
    const appNavigateTo = async (to: RouteLocationRaw | undefined | null, options?: NavigateToOptions) => {
        await navigateTo(to, options as any);
        return new Promise((resolve) => resolve(true));
    }
    const onPageBack = () => {
        router.back();
    }
    const appLoaderClose = () => {
        if (loading.isActive) {
            loading.hide();
        }
    };
    const appLoading = (open = true, message = undefined, delay = 0): void => {
        if (open) {
            appLoaderClose();
            loading.show({
                delay: delay, // ms
                message: message || t('base.pleaseWait'),
            });
        } else {
            appLoaderClose();
        }
    };
    /* https://quasar.dev/quasar-plugins/notify
      position > top-left top-right bottom-left bottom-right top bottom left right center
  appToast('Quasar Framework Template',{type:'positive', position:'right', color:''});
  appToast('Quasar Framework Template',{caption:'5 Minutes ago', avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'});
   */
    const appToast = (message: string, options: NotifyOptions | undefined = undefined) => {
        if (!message) {
            return;
        }


        let color = undefined;
        let textColor = undefined
        if (options?.color == undefined && options?.type == undefined) {
            color = !dark.isActive ? 'white' : 'black';
            textColor = !dark.isActive ? 'black' : 'white';
        }
        let icon: string | undefined = undefined;
        if (options && options.type) {
            const t = options.type;
            if (t === 'positive') {
                icon = biCheckCircle;
                textColor = 'white';
                color = 'positive';
            } else if (t === 'negative') {
                icon = biExclamationTriangle;
                textColor = 'white';
                color = 'negative';
            } else if (t === 'warning') {
                icon = biExclamationCircle;
                textColor = 'white';
                color = 'warning';
            } else if (t === 'info') {
                icon = biInfoCircle;
                textColor = 'white';
                color = 'info';
            }
        }
        notify(
            Object.assign(
                {
                    message,
                    icon,
                    timeout: 5000,
                    progress: true,
                    position: 'bottom-left',
                    multiLine: false,
                    color: color,
                    textColor: textColor,
                    actions: !options?.hideClose
                        ? [{ icon: biX, round: true, dense: false, color: textColor || 'white' }] : undefined,
                },
                options
            )
        );
    };
    /**
   * const conf = await appConfirm(t('app.monogram'), t('base.deleteConfirm'));
   * @param title
   * @param text
   * @param okBtn
   * @param cancelBtn
   * @returns
   */
    const appConfirm = async (
        title: string,
        text: string,
        okBtn = {}, //btn component
        cancelBtn = {} //btn component
    ) => {
        return new Promise((resolve) => {
            dialog({
                title: title,
                message: text,
                ok: Object.assign(
                    { textColor: 'primary', flat: true, label: t('base.okay') },
                    okBtn
                ),
                // ok: okText===undefined ? tc('okay') : okText,
                cancel: Object.assign(
                    { textColor: 'grey', flat: true, label: t('base.cancel') },
                    cancelBtn
                ),
                persistent: true,
            })
                .onOk(() => {
                    resolve(true);
                })
                .onOk(() => {
                    resolve(true);
                })
                .onCancel(() => {
                    resolve(false);
                })
                .onDismiss(() => {
                    resolve(false);
                });
        });
    };

    const inputSanitizeHtml = (str: string,
        allowTags: string[] = ['b', 'i', 'em', 'strong', 'a'],
        allowAttrs: string[] = ['href', 'class']) => {
        if (!str) {
            return '';
        }
        if (isServer()) {
            return str;
        }
        // return $domPurify.sanitize(str,
        return DOMPurify.sanitize(str,
            {
                ALLOWED_TAGS: allowTags,
                ALLOWED_ATTR: allowAttrs
            }
        );
    };
    const writeToClipboard = async (text: string) => {
        await Clipboard.write({
            string: text,
        });
        appToast(t('success.copy'), { multiLine: false })
        return new Promise((resolve) => {
            resolve(true);
        });
    };
    const appThrowError = (param: AppNuxtError) => {
        return showError({
            statusCode: param.statusCode,
            statusMessage: param.statusMessage
        })
    }
    /**
     * <div ref="bottomSection"></div>
     * scrollToTop(bottomSection.value);
     * @param el
     */
    const scrollToTop = (el: Element) => {
        // window.scrollTo(0, 0);
        if (el) {
            // el.scrollIntoView({ behavior: 'smooth' });
            // el.scrollIntoView({ block: 'end', behavior: 'smooth' });
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return {
        getPageMeta,
        getPageMetaByKey,
        getCurrentPath,
        getPreviousPath,
        getParam,
        getParamNumber,
        getQuery,
        getQueryNumber,
        onReplaceUrl,
        onPageGo,
        onPageBack,
        appLoading,
        appConfirm,
        appToast,
        appNavigateTo,
        inputSanitizeHtml,
        writeToClipboard,
        appThrowError,
        scrollToTop
    }
};