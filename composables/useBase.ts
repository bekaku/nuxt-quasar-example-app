import { biCheckCircle, biExclamationCircle, biExclamationTriangle, biInfoCircle, biX } from "@quasar/extras/bootstrap-icons";
import type { RouteLocationRaw } from "vue-router";
import type {  NavigateToOptions, NotifyOptions } from "~/types/common";
export const useBase = () => {
    const route = useRoute();
    const router = useRouter();
    const { loading, notify, dialog } = useQuasar();
    const { t } = useLang();
    const getCurrentPath = (fullPath = true) => {
        return fullPath ? route.fullPath : route.path;
    };
    const getPreviousPath = () => {
        return router.options.history.state.back;
    };
    const getParam = (field: string): string | undefined => {
        if (!field) {
            return undefined;
        }
        return route.params ? (route.params[field] as string) : undefined;
    };
    const getParamNumber = (att: string): number => {
        const val = getParam(att);
        return val != undefined ? +val : 0;
    };
    const getQuery = (field: string): string | undefined => {
        if (!field) {
            return;
        }
        return route.query ? (route.query[field] as string) : undefined;
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

        let icon: string | undefined = undefined;
        if (options && options.type) {
            const t = options.type;
            if (t === 'positive') {
                icon = biCheckCircle;
            } else if (t === 'negative') {
                icon = biExclamationTriangle;
            } else if (t === 'warning') {
                icon = biExclamationCircle;
            } else if (t === 'info') {
                icon = biInfoCircle;
            }
        }

        notify(
            Object.assign(
                {
                    message,
                    icon,
                    timeout: 5000,
                    progress: true,
                    position: 'bottom',
                    multiLine: false,
                    actions: !options?.hideClose
                        ? [{ icon: biX, color: 'white' }]
                        : undefined,
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
    return {
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
        appNavigateTo

    }
};