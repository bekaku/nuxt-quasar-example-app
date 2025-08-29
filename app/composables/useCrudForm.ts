import { biX } from '@quasar/extras/bootstrap-icons';
import {
    PageActionParamiter,
    PageIdParamiter,
    BackendRootPath,
    CrudAction
} from '~/libs/constants';
import type { CrudFormApiOptions, ICrudAction, RequestDto, ResponseMessage } from '~/types/common';

export const useCrudForm = <T>(options: CrudFormApiOptions, initialEntity: T) => {
    const { isDevMode } = useAppDevice();
    const { appNavigateTo, getParam, appToast, appConfirm, getPreviousPath, appThrowError } = useBase();
    const { callAxios } = useAxios();
    const { t } = useLang();

    const previousPath = ref(getPreviousPath() as string);
    const loading = ref(false);
    const crudId = ref<number | undefined>(getParam<number>(PageIdParamiter));
    const crudEntity = ref<T>(Object.assign({}, initialEntity) as T);
    const requestEntityName = ref<string | undefined>(options?.requestEntityName ? options.requestEntityName : undefined);
    const crudAction = ref<ICrudAction | undefined>(getParam<ICrudAction>(PageActionParamiter));
    const fetchDataLink = ref(options.fetchDataLink);
    const firstLoaded = ref(false);
    const requireActions: ICrudAction[] = ['copy', 'edit', 'new', 'view'];
    onMounted(() => {
        // const valid = preValidate();
        // if (valid !== true) {
        //     return;
        // }
        if (options?.fectchDataOnLoad === undefined || options?.fectchDataOnLoad) {
            preFectData();
        }
    });
    const preValidate = () => {
        let isValid = true;
        if (crudId.value===undefined || !crudAction.value || crudAction.value == undefined) {
            isValid = false;
        }
        if (crudAction.value == undefined || !requireActions.includes(crudAction.value)) {
            isValid = false;
        }

        if (isValid) {
            return true;
        }
        return appThrowError({
            statusCode: 400,
            statusMessage: "Bad Request: action allow only ('copy', 'edit', 'new', 'view')"
        })
    }
    preValidate()
    const getFetchDataLink = computed(() => {
        if (fetchDataLink.value) {
            return fetchDataLink.value;
        }
        return `${options.apiEndpoint}/${pascalToCamelCase(options.crudName ? options.crudName : '')}/${crudId.value}`;
    });
    const fetchDataById = async () => {
        if (!crudId.value && (!options.apiEndpoint || !options.crudName)) {
            return new Promise((resolve) => {
                resolve(false);
            });
        }
        loading.value = true;
        try {
            const response = await callAxios<T>({
                API: getFetchDataLink.value,
                method: 'GET'
            });
            // if (isDevMode()) {
            //   console.log('useCrudForm > fetchDataById :', api, response);
            // }
            loading.value = false;
            if (!isAppException(response) && !isServerResponseMessage(response)) {
                crudEntity.value = response;
            }
        } catch (error: any) {
            console.error('useCrudForm>fetchDataById', error);
            if(error.message){
                appToast(error.message,{type:'negative',});
            }
        } finally {
            if (!firstLoaded.value) {
                firstLoaded.value = true;
            }
            loading.value = false;
        }
        return new Promise((resolve) => {
            resolve(true);
        });
    };
    const preFectData = async () => {
        if (
            crudAction.value == CrudAction.VIEW || crudAction.value == CrudAction.COPY || crudAction.value == CrudAction.EDIT
        ) {
            await fetchDataById();
            if (crudAction.value == CrudAction.COPY) {
                crudEntity.value.id = null;
            }
            return new Promise((resolve) => {
                resolve(true);
            });
        } else {
            return new Promise((resolve) => {
                resolve(true);
            });
        }
    };
    const resetEntity = () => {
        /* 3 Ways to Clone Objects in JavaScript
            // "Spread"
            { ...food }
    
            // "Object.assign"
            Object.assign({}, food)
    
            // "JSON"
            JSON.parse(JSON.stringify(food))
            */

        // crudEntity.value = JSON.parse(JSON.stringify(initialEntity)); // stop modifing passed value
        crudEntity.value = Object.assign({}, initialEntity) as T;
    };
    const onBack = () => {
        let backLink: string | undefined = '';
        if (options.backToPreviousPath != undefined && options.backToPreviousPath) {
            backLink = previousPath.value;
        }
        const basePath = options.basePath || BackendRootPath;
        if (!backLink) {
            backLink = options.backLink
                ? options.backLink
                : previousPath.value ? previousPath.value
                    : options.crudName
                        ? `${basePath ? '/' + basePath : ''}/${options.crudName.replaceAll('_', '-')}`
                        : '';
        }
        if (backLink) {
            appNavigateTo(backLink);
        }
    };
    const apiEnpoint = computed(() => {
        if (!options.apiEndpoint || !options.crudName) {
            return;
        }
        if (crudAction.value === CrudAction.EDIT) {
            return options.actionPut
                ? options.actionPut
                : options.apiEndpoint + '/' + pascalToCamelCase(options.crudName) + (options.methodPutIncludeId === undefined || options.methodPutIncludeId === true ? '/' + crudEntity.value.id : '');
        }
        return options.actionPost
            ? options.actionPost
            : options.apiEndpoint + '/' + pascalToCamelCase(options.crudName);
    });
    const onSubmit = async () => {
        if (!options.apiEndpoint || !options.crudName) {
            return;
        }
        // const requestItem: { [k: string]: T } = {};
        const requestItem: RequestDto = {};
        requestItem[requestEntityName.value
            ? requestEntityName.value : `${pascalToCamelCase(options.crudName)}`] = crudEntity.value;

        if (!apiEnpoint.value) {
            return new Promise((resolve) => resolve(false))
        }
        if (isDevMode()) {
            console.log(
                'useCrudFrom > onSubmit',
                crudAction.value === CrudAction.EDIT ? 'PUT' : 'POST',
                requestItem
            );
        }

        loading.value = true;
        try {
            const response = await callAxios<any>({
                API: apiEnpoint.value,
                method: crudAction.value === CrudAction.EDIT ? 'PUT' : 'POST',
                body: requestItem
            });
            if (isDevMode()) {
                console.log('useCrudFrom > onSubmit > response', response);
            }
            if (isAppException(response)) {
                return new Promise((resolve) => resolve(false))
            }
            if (response && response.id) {
                if (
                    crudAction.value === CrudAction.NEW ||
                    crudAction.value === CrudAction.COPY
                ) {
                    showToast(t('success.insertSuccesfull'));
                } else if (crudAction.value === CrudAction.EDIT) {
                    showToast(t('success.updateSuccesfull'));
                }
            }

            if (!options.preventRedirectToList) {
                onBack();
            }
        } catch (error: any) {
            console.error('useCrudForm>onSubmit', error);
            if(error.message){
                appToast(error.message,{type:'negative',});
            }
        } finally {
            loading.value = false;
        }
        return new Promise((resolve) => {
            resolve(true);
        });
    };
    const showToast = (message: string) => {
        appToast(message, {
            multiLine: false,
            html: true,
            type: 'positive',
            timeout: 3 * 1000,
            position: 'bottom-left',
            actions: [{ icon: biX, color: 'white' }]
        });
    };
    const deleteApiEndpoint = computed(() => {
        return options.actionDelete
            ? options.actionDelete
            : options.apiEndpoint && options.crudName
                ? `${options.apiEndpoint}/${pascalToCamelCase(options.crudName)}/${crudId.value
                }`
                : '';
    });
    const onDelete = async () => {
        console.log('onDelete', crudAction.value != CrudAction.EDIT ||  crudAction.value != CrudAction.VIEW)
        if (
            (crudAction.value != CrudAction.EDIT ||  crudAction.value != CrudAction.VIEW)&&
            !crudEntity.value &&
            crudId.value == 0 &&
            !deleteApiEndpoint.value
        ) {
            return;
        }
        const conf = await appConfirm(t('app.monogram'), t('base.deleteConfirm'));
        if (conf) {
            loading.value = true;
            try {
                const res = await callAxios<ResponseMessage>({
                    API: deleteApiEndpoint.value,
                    method: 'DELETE'
                });
                if (isDevMode()) {
                    console.log('useCrudFrom > onDelete', deleteApiEndpoint.value, res);
                }
                onBack();
            } catch (error: any) {
                console.error('useCrudForm>onDelete', error);
                if(error.message){
                    appToast(error.message,{type:'negative',});
                }
            } finally {
                loading.value = false;
            }
        }
    };
    const isEditMode = computed<boolean>(()=>crudAction.value !== 'view');
    const onEnableEditForm = () => {
        crudAction.value = 'edit';
    }
    onBeforeUnmount(() => {
        resetEntity();
    });
    const methods = { onBack, onSubmit, onDelete, fetchDataById, preFectData, onEnableEditForm };
    return {
        loading,
        ...methods,
        crudId,
        crudAction,
        crudEntity,
        crudName: options.crudName,
        requestEntityName,
        fetchDataLink,
        firstLoaded,
        isEditMode
    };
}