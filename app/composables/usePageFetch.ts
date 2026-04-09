/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ApiResponse, CrudListApiOptions, ISortModeType } from "~/types/common";

export const usePagefecth = <T>(options: CrudListApiOptions) => {
  const { callAxios } = useAxios();
  const { pages, resetPaging } = usePaging(options?.itemsPerPage ? options.itemsPerPage : 10);
  const { sort, sorts, resetSort } = useSort(options.defaultSort, options.defaultSorts);
  const dataList = ref<T[]>([]) as Ref<T[]>;
  const isInfiniteDisabled = ref(false);
  const firstLoaded = ref(false);
  const loading = ref(false);
  const urlEndpoint = ref(options.apiEndpoint);
  const additionalUri = ref(options?.additionalUri);

  const queryParam = computed((): string | undefined => {
    let haveParam = false;
    let q = '';
    if (options.pageAble == undefined || options.pageAble) {
      if (pages.value) {

        q += `page=${(options.pageStartZero == undefined || options.pageStartZero) ? (pages.value.current > 0 ? pages.value.current - 1 : 0) : pages.value.current}`;
        q += `&size=${pages.value.itemsPerPage}`;
        haveParam = true;
      }
    }
    if (options.sortAble == undefined || options.sortAble) {
      if (sorts.value && sorts.value.length > 0) {
        for (const sortAtl of sorts.value) {
          q += `${sortAtl.column && sortAtl.mode ? '&sort=' + sortAtl.column + ',' + sortAtl.mode : ''}`
        }
      } else
        if (sort.value) {
          if (haveParam) {
            q += '&';
          }
          q += `${sort.value.column && sort.value.mode ? 'sort=' + sort.value.column + ',' + sort.value.mode : ''}`;
        }

      haveParam = true;
    }
    if (additionalUri.value) {
      if (haveParam) {
        q += '&';
      }
      q += `${additionalUri.value}`;
    }
    return !isEmpty(q) ? q : undefined;
  });
  const apiEndpoint = computed(
    () => `${urlEndpoint.value}${queryParam.value ? '?' + queryParam.value : ''}`
  );
  const loadData = async (): Promise<void> => {
    loading.value = true;
    const response = await callAxios<ApiResponse<T>>({
      API: apiEndpoint.value,
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
        if (response.totalPages != undefined && pages.value) {
          pages.value.totalPages = response.totalPages;
        }
        if (response.totalElements != undefined && pages.value) {
          pages.value.totalElements = response.totalElements;
          if (response.totalElements == 0 || response.totalElements < pages.value.itemsPerPage) {
            isInfiniteDisabled.value = true;
          }
        }
        if (response.last != undefined && pages.value) {
          pages.value.last = response.last;
          isInfiniteDisabled.value = response.last;
        }

      } else if (response && isArray(response)) {
        const responseList: T[] = response as unknown as T[];
        if (pages.value) {

          if (responseList.length == 0 || responseList.length < pages.value.itemsPerPage) {
            isInfiniteDisabled.value = true;
          }
        }
        if (!options.reverseList) {
          list = responseList;
        } else {
          list = responseList.reverse();
        }
        await setDataList(list);
      }
    }
    if (!firstLoaded.value) {
      firstLoaded.value = true;
    }

    loading.value = false;
    return new Promise((resolve) => {
      resolve();
    });
  };
  const setDataList = (list: T[]): Promise<void> => {
    return new Promise((resolve) => {
      if (pages.value && pages.value.current == 1) {
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
      resolve()
    })
  }
  const resetData = (resetPage: boolean = true) => {
    if (resetPage) {
      resetPaging();
    }
    dataList.value = [];
    firstLoaded.value = false;
    isInfiniteDisabled.value = false;
  };
  const onReload = async (): Promise<void> => {
    resetPaging();
    resetSort();
    if (!options.preventResetListReload) {
      firstLoaded.value = false;
      dataList.value = [];
    }
    isInfiniteDisabled.value = false;
    await loadData();
    return new Promise((resolve) => resolve());
  };

  const onNextPage = async (): Promise<void> => {
    if (firstLoaded.value) {
      if (pages.value) {
        pages.value.current++;
      }
      await loadData();
    }
    return new Promise((resolve) => resolve());
  };

  const loadPageChange = async (resetPage: boolean = false): Promise<void> => {
    resetData(resetPage);
    await loadData();
    return new Promise((resolve) => resolve());
  };

  const onPageChange = async (value: number | undefined): Promise<void> => {
    await loadPageChange(false);
    return new Promise((resolve) => resolve());
  };

  const onPerPageChange = async (value: number | undefined): Promise<void> => {
    await loadPageChange(false);
    return new Promise((resolve) => resolve());
  };

  const onSortColumn = async (column: string): Promise<void> => {
    if (!sort.value) {
      return new Promise((resolve) => resolve());
    }
    console.log('onSortColumn', column)
    sort.value.column = column
    await onReload();
    return new Promise((resolve) => resolve());
  }
  const onSortMode = async (mode: ISortModeType): Promise<void> => {
    if (!sort.value) {
      return new Promise((resolve) => resolve());
    }
    console.log('onSortColumn', mode)
    sort.value.mode = mode
    await onReload();
    return new Promise((resolve) => resolve());
  }
  return {
    isInfiniteDisabled,
    firstLoaded,
    loading,
    pages,
    sort,
    sorts,
    dataList,
    urlEndpoint,
    additionalUri,
    loadData,
    resetData,
    onPageChange,
    onPerPageChange,
    onNextPage,
    onReload,
    onSortColumn,
    onSortMode
  };
};
