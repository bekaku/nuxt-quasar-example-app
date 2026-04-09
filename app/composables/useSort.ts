import { useLang } from '@/composables/useLang';
import { ref } from 'vue';
import type { ISort, ISortMode } from '~/types/common';
import { useBase } from './useBase';
export const useSort = (defaultSort?: ISort, defaultSorts?: ISort[]) => {
  const { getQuery } = useBase();
  const { t } = useLang();
  const sortMode = ref<ISortMode[]>([
    { value: 'asc', label: t('sort.asc') },
    { value: 'desc', label: t('sort.desc') },
  ]);

  const getSortParam = (): ISort | undefined => {
    const sortQuery = getQuery<string>('sort');
    if (sortQuery && !isArray(sortQuery)) {
      const sortArr = sortQuery.split(',');
      if (sortArr.length == 2) {
        const field = sortArr[0];
        const mode = sortArr[1];
        if (mode == 'asc' || mode == 'desc') {
          return {
            column: field,
            mode: mode,
          };
        }
      }
    }
    return undefined;
  };
  const getSortParams = (): ISort[] | undefined => {
    const sortQuery = getQuery('sort') as any;
    if (sortQuery) {
      const sItems: ISort[] = [];
      if (isArray(sortQuery) && sortQuery.length > 0) {
        sortQuery.forEach((item: string) => {
          const sortArr = item.split(',');
          if (sortArr.length == 2) {
            const field = sortArr[0];
            const mode = sortArr[1];
            if (mode == 'asc' || mode == 'desc') {
              sItems.push({
                column: field,
                mode
              });
            }
          }
        });
        return sItems;
      } else {
        const sortArr = sortQuery.split(',');
        if (sortArr.length == 2) {
          const field = sortArr[0];
          const mode = sortArr[1];
          if (mode == 'asc' || mode == 'desc') {
            return [{
              column: field,
              mode: mode,
            }];
          }
        }
      }
    }
    return undefined;
  };
  const sortQuery = getSortParam();
  const sortQuerys = getSortParams();

  const sortInitial: ISort = {
    column:
      sortQuery && sortQuery.column
        ? sortQuery.column
        : defaultSort && defaultSort.column
          ? defaultSort.column
          : undefined,
    mode:
      sortQuery && sortQuery.mode
        ? sortQuery.mode
        : defaultSort && defaultSort.mode
          ? defaultSort.mode
          : undefined,
  };
  const sortInitials: ISort[] | undefined = sortQuerys || defaultSorts;
  const sort = ref<ISort | undefined>(cloneObject<ISort>(sortInitial));
  const sorts = ref<ISort[] | undefined>(cloneObject<ISort[]>(sortInitials));
  const resetSort = () => {
    sort.value = cloneObject<ISort>(defaultSort)
    sorts.value = cloneObject<ISort[]>(defaultSorts)
  };
  return {
    sortMode,
    sort,
    sorts,
    resetSort,
  };
};
