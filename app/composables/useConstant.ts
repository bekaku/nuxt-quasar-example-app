import { SearchOperation } from "~/libs/constants";
import type { ITextValue } from "~/types/common";

export const useConstant = () => {
    const { t } = useLang();
    const searchOperations: ITextValue[] = [
        { text: t('base.match'), value: SearchOperation.MATCH },
        { text: t('base.equa'), value: SearchOperation.EQUA },
        { text: t('base.notEqua'), value: SearchOperation.NOT_EQUA },
        { text: t('base.greaterThan'), value: SearchOperation.GREATER_THAN },
        {
            text: t('base.greaterThanEqua'),
            value: SearchOperation.GREATER_THAN_EQUA,
        },
        { text: t('base.lessThan'), value: SearchOperation.LESS_THAN },
        { text: t('base.lessThanEqua'), value: SearchOperation.LESS_THAN_EQUA },
    ];

    return {
        searchOperations
    }
}