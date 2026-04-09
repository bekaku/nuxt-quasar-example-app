import { DefaultMaxItemsPerPage, DefultItemsPerPage } from "~/libs/constants";
import type { IPagination } from "~/types/common";

export const usePaging = (perPage?: number) => {
  const { getQuery } = useBase();
  const getNumberQuery = (param: string): number => {
    const pageQuery = getQuery(param);
    return pageQuery ? +pageQuery : 0;
  };
  const p = getNumberQuery('page');
  const s = getNumberQuery('size');
  const pagesInitial: IPagination = {
    current: p != undefined ? p + 1 : 1,
    itemsPerPage: s && s <= DefaultMaxItemsPerPage && s > 0 ? s : perPage ? perPage : DefultItemsPerPage,
    totalPages: 0,
    totalElements: 0,
    last: false,
    perPageList: [
      { text: '5', value: 5 },
      { text: '10', value: 10 },
      { text: '15', value: 15 },
      { text: '20', value: 20 },
      { text: `${DefaultMaxItemsPerPage}`, value: DefaultMaxItemsPerPage },
    ],
  };
  const pages = ref<IPagination | undefined>(cloneObject<IPagination>(pagesInitial));
  const resetPaging = () => {
    pages.value = cloneObject<IPagination>(pagesInitial);
  };
  return {
    pages,
    resetPaging,
    pagesInitial
  };
};
