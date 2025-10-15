import { CrudAction, KeywordParamiter, SearchOperation, SearchParamiter } from "~/libs/constants";
import type { CrudListApiOptions, ApiResponse, ICrudAction, ICrudListHeader, ISortModeType, ResponseMessage } from "~/types/common";

export const useCrudList = <T>(options: CrudListApiOptions) => {

    const { appNavigateTo, getCurrentPath, getQuery, appConfirm, appLoading, inputSanitizeHtml, appToast } =
        useBase();
    const { pages, sort, resetSort, resetPaging } = useSort(
        options ? options.defaultSort : undefined,
        options ? options.itemsPerPage : 10
    );
    const { callAxios } = useAxios();
    const { t } = useLang();
    const headers = ref<ICrudListHeader[]>(options.headers || []);
    const dataList = ref<T[]>([]) as Ref<T[]>;
    const isInfiniteDisabled = ref(false);
    const firstLoaded = ref(false);
    const loading = ref(false);
    const additionalUri = ref(options?.additionalUri);
    const manualActionList = ref<string>();
    const advanceSearchUri = ref('');
    const keywordSearchText = ref('');
    // const filterText = ref('');
    const enpointList = ref(options?.enpointList);
    const enpointDelete = ref(options?.enpointDelete);
    const crudName = ref(options?.crudName)


    const searchableHeaders = computed<ICrudListHeader[]>(() => {
        if (!headers.value || headers.value.length == 0) {
            return [];
        }
        return headers.value.filter((c) => c.options && c.options.searchable === true)
    });
    const validateColunmExist = (colnmName: string): boolean => searchableHeaders.value.find((c) => c.column === colnmName) != undefined;
    const validateQSearch = () => {
        const qParam = getQuery<string>(SearchParamiter);
        const qParmArray = qParam?.split(',');
        const operations: any = SearchOperation;
        if (qParmArray && qParmArray.length > 0) {
            for (const q of qParmArray) {
                for (const k in operations) {
                    setQSearch(q, operations[k]);
                }
            }
        }
    };
    const setQSearch = (q: any, operation: string) => {
        const qSplit = q.split(operation);
        if (qSplit.length == 2) {
            if (validateColunmExist(qSplit[0])) {
                if (!advanceSearchUri.value) {
                    advanceSearchUri.value = `${SearchParamiter}=${inputSanitizeHtml(q.trim())}`;
                } else {
                    advanceSearchUri.value += ',' + inputSanitizeHtml(q.trim());
                }
            }
        }
    };
    validateQSearch();
    onMounted(async () => {
        if (options?.fetchListOnload == undefined || options.fetchListOnload === true) {
            await fetchList();
        }
    });
    // const { data: items, refresh, clear, status, error } = useAsyncData('gd5:test', async () => {
    //     if (options?.fetchListOnload == undefined || options.fetchListOnload === true) {
    //         console.log('useCrudList > useAsyncData');
    //         const response = await callAxios<any>({
    //             API: '/api/permission/1',
    //             method: 'GET',
    //         });
    //         return response;
    //     }
    //     return [];
    // })
    const listApiEndpoint = computed(() =>
        enpointList.value
            ? enpointList.value
            : options.apiEndpoint && crudName.value
                ? options.apiEndpoint + '/' + pascalToCamelCase(crudName.value)
                : '');

    const deleteApiEndpoint = computed(() =>
        enpointDelete.value
            ? enpointDelete.value
            : options.apiEndpoint && crudName.value
                ? options.apiEndpoint + '/' + pascalToCamelCase(crudName.value)
                : ''
    );

    const queryParam = computed((): string | undefined => {
        let haveParam = false;
        let q = '';
        if (options.pageAble == undefined || options.pageAble) {
            q += `page=${(options.pageStartZero == undefined || options.pageStartZero) ? (pages.value.current > 0 ? pages.value.current - 1 : 0) : pages.value.current}`;
            q += `&size=${pages.value.itemsPerPage}`;
            haveParam = true;
        }
        if (options.sortAble == undefined || options.sortAble) {
            if (haveParam) {
                q += '&';
            }
            q += `${sort.value.column && sort.value.mode ? 'sort=' + sort.value.column + ',' + sort.value.mode : ''}`;
            haveParam = true;
        }
        if (advanceSearchUri.value) {
            if (haveParam) {
                q += '&';
            }
            q += `${advanceSearchUri.value}`;
            haveParam = true;
        }
        if (keywordSearchText.value) {
            if (haveParam) {
                q += '&';
            }
            q += `${KeywordParamiter}=${inputSanitizeHtml(keywordSearchText.value)}`;
            haveParam = true;
        }


        if (additionalUri.value) {
            if (haveParam) {
                q += '&';
            }
            q += `${additionalUri.value}`;
            haveParam = true;
        }
        return !isEmpty(q) ? q : undefined;
    });
    const pageParam = computed(() => {
        return `${listApiEndpoint.value}${queryParam.value ? '?' + queryParam.value : ''}`;
    });
    const pathParam = computed(() => {
        if (!options) {
            return;
        }
        return `${getCurrentPath(false)}${queryParam.value ? '?' + queryParam.value : ''}`;
    });
    const fetchList = async (): Promise<boolean> => {
        if (!pageParam.value) {
            return new Promise((resolve) => {
                resolve(false);
            });
        }
        loading.value = true;
        try {
            const response = await callAxios<ApiResponse<T>>({
                API: pageParam.value,
                method: 'GET'
            });
            let list: T[] = [];
            if (!isAppException(response) && !isServerResponseMessage(response)) {
                if (isListResponse(response)) {
                    if (!options.reverseList) {
                        list = response.dataList;
                    } else {
                        list = response.dataList.reverse();
                    }
                    await setDataList(list);
                    if (response.totalPages != undefined) {
                        pages.value.totalPages = response.totalPages;
                    }
                    if (response.totalElements != undefined) {
                        pages.value.totalElements = response.totalElements;
                        if (response.totalElements == 0 || response.totalElements < pages.value.itemsPerPage) {
                            isInfiniteDisabled.value = true;
                        }
                    }
                    if (response.last != undefined) {
                        pages.value.last = response.last;
                        isInfiniteDisabled.value = response.last;
                    }

                } else if (response && isArray(response)) {
                    const responseList: T[] = response as unknown as T[];
                    if (responseList.length == 0 || responseList.length < pages.value.itemsPerPage) {
                        isInfiniteDisabled.value = true;
                    }
                    if (!options.reverseList) {
                        list = responseList;
                    } else {
                        list = responseList.reverse();
                    }
                    await setDataList(list);
                }
            }
        } catch (error: any) {
            console.error('useCrudList', error);
            if (error.message) {
                appToast(error.message, { type: 'negative', });
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
    const setDataList = (list: T[]) => {
        return new Promise((resolve) => {
            if (pages.value.current == 1) {
                dataList.value = list;
            } else {
                if (!options.concatList) {
                    dataList.value = list;
                } else {
                    if (!options.addUnshift) {
                        dataList.value.push(...list);
                    } else {
                        dataList.value.unshift(...list);
                    }
                }
            }
            resolve(true)
        })
    }
    // const filteredList = computed(() => {
    //     const list = dataList.value;
    //     const search = filterText.value
    //         ? filterText.value.toLowerCase().trim()
    //         : null;
    //     if (!search) {
    //         return list;
    //     }

    //     let filters: any = [];
    //     const searchables = searchableHeaders.value;
    //     if (searchables.length == 0) {
    //         return list;
    //     }

    //     for (const header of searchables) {
    //         const col: string | undefined = header.column;
    //         if (col && list && list.length > 0) {
    //             const searchList = list.filter(
    //                 (c: any) =>
    //                     c[col] &&
    //                     c[col].toString().toLowerCase().includes(search) &&
    //                     !filters.find((x: any) => x.id === c.id)
    //             );
    //             filters = filters.concat(searchList);
    //         }
    //     }
    //     return filters;
    // });
    const onPageNoChange = (pageNo: number | undefined) => {
        if (pageNo == undefined) {
            return;
        }
        pages.value.current = pageNo;
        if (!pathParam.value) {
            return;
        }
        onPasteUrlPathParamAndFetchData();
    };
    const onItemPerPageChange = async (no: number | undefined) => {
        if (no == undefined) {
            return;
        }
        pages.value.itemsPerPage = no;
        if (!pathParam.value) {
            return;
        }
        onPasteUrlPathParamAndFetchData();
    };
    const onSort = (column: string | undefined) => {
        if (column == undefined) {
            return;
        }
        if (sort.value.column === column) {
            sort.value.mode = sort.value.mode === 'asc' ? 'desc' : 'asc';
        } else {
            sort.value.column = column;
        }
        onPasteUrlPathParamAndFetchData();
    };
    const onSortMode = (mode: ISortModeType) => {
        sort.value.mode = mode;
        onPasteUrlPathParamAndFetchData();
    };
    const onPasteUrlPathParamAndFetchData = async () => {
        if (!pathParam.value) {
            return;
        }
        appNavigateTo(pathParam.value);
        // onReplaceUrl(pathParam.value);
        await fetchList();
    };
    const onAdvanceSearch = (q: string) => {
        keywordSearchText.value = '';
        advanceSearchUri.value = `${SearchParamiter}=${q}`;
        onPasteUrlPathParamAndFetchData();
    };
    const onKeywordSearch = (keyword: string) => {
        keywordSearchText.value = inputSanitizeHtml(keyword);
        onPasteUrlPathParamAndFetchData();
    };
    const onReload = () => {
        advanceSearchUri.value = '';
        pages.value.current = (options?.pageStartZero == undefined || options.pageStartZero) ? 0 : 1;
        dataList.value = [];
        resetSort();
        resetPaging();
        onPasteUrlPathParamAndFetchData();
    };
    const getItemByIndex = (index: number): Promise<T | undefined> => {
        return new Promise((resolve) => {
            resolve(dataList.value[index]);
        });
    };
    const getItemIndexById = (id: number): Promise<number> => {
        return new Promise((resolve) => {
            resolve(dataList.value.findIndex((t: any) => t.id === id));
        });
    };
    const onItemDelete = async (
        indexOrIds: number | number[],
        isSingle: boolean
    ) => {
        const conf = await appConfirm(t('app.monogram'), t('base.deleteConfirm'));
        if (conf) {
            if (isSingle) {
                const item: any = await getItemByIndex(indexOrIds as number);
                if (item !== undefined && item?.id != undefined) {
                    const i: number = await getItemIndexById(item.id);
                    appLoading();
                    const status = await onDeleteItemSingle(item.id);
                    if (status && i != -1) {
                        dataList.value.splice(i, 1);
                    }
                    appLoading(false);
                }
            } else {
                appLoading();
                for (const id of indexOrIds as number[]) {
                    await onDeleteItemSingle(id);
                }
                await fetchList();
                appLoading(false);
            }
        }
    };
    const onDeleteItemSingle = async (id: number): Promise<boolean> => {
        const apiEndpoint = `${deleteApiEndpoint.value}/${id}`;
        try {
            const response = await callAxios<ResponseMessage>({
                API: apiEndpoint,
                method: 'DELETE'
            });
            if (isAppException(response) || isServerException(response)) {
                return new Promise((resolve) => {
                    resolve(false);
                });
            }
            return new Promise((resolve) => {
                resolve(!!(response && response.status == 'OK'));
            });
        } catch (error: any) {
            if (error.message) {
                appToast(error.message, { type: 'negative', });
            }
        }

        return new Promise((resolve) => {
            resolve(false);
        });
    };
    const onNewForm = () => {
        if (options?.pathNew) {
            appNavigateTo(options.pathNew);
        } else if (crudName.value) {
            appNavigateTo(`/${pascalToKebab(crudName.value)}/${CrudAction.NEW}/0`);
        }
    };
    const onItemClick = async (index: number, type: ICrudAction) => {
        const item: any = await getItemByIndex(index);
        if (!item) {
            return;
        }
        if (options?.pathView) {
            appNavigateTo(`${options.pathView}/${item.id}`);
        } else if (crudName.value) {
            appNavigateTo(`/${pascalToKebab(crudName.value)}/${type == 'view' ? CrudAction.VIEW : CrudAction.EDIT}/${item.id}`);
        }
    };
    const onItemCopy = async (index: number) => {
        const item: any = await getItemByIndex(index);
        if (!item) {
            return;
        }
        if (options?.pathCopy) {
            appNavigateTo(`${options.pathCopy}/${item.id}`);
        } else if (crudName.value) {
            appNavigateTo(
                `/${pascalToKebab(crudName.value)}/${CrudAction.COPY}/${item.id}`
            );
        }
    };
    onBeforeUnmount(() => {
        dataList.value = [];
        advanceSearchUri.value = '';
        keywordSearchText.value = '';
        // filterText.value = '';
        manualActionList.value = undefined;
        additionalUri.value = undefined;
        enpointList.value = undefined;
        enpointDelete.value = undefined;
        crudName.value = undefined;
    });
    const methods = {
        onPageNoChange,
        onItemPerPageChange,
        fetchList,
        onSort,
        onSortMode,
        onReload,
        onAdvanceSearch,
        onKeywordSearch,
        onItemDelete,
        onNewForm,
        onItemClick,
        onItemCopy,
        getItemByIndex
    };
    return {
        pages,
        sort,
        resetSort,
        loading,
        firstLoaded,
        dataList,
        // filteredList,
        // filterText,
        keywordSearchText,
        crudName,
        manualActionList,
        additionalUri,
        enpointList,
        enpointDelete,
        headers,
        ...methods,
    };
}