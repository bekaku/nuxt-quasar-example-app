
import { th, enUS } from 'date-fns/locale';
import { FORMAT_DATE16 } from '~/utils/dateUtil';
export const useDateFns = () => {
    const { $datefns } = useNuxtApp()
    // const { t, locale } = useLang();
    /**
     *
     * @param dateLeft the later date
     * @param dateRight the earlier date
     * @returns
     */
    const getDateDiffMinutes = (
        dateLeft: Date | number,
        dateRight: Date | number
    ) => {
        return $datefns.differenceInMinutes(dateRight, dateLeft);
    };

    const getDateDiff = (dateLeft: Date | number, dateRight: Date | number) => {
        return $datefns.differenceInDays(dateRight, dateLeft);
    };
    const getDateDiffNow = (dateString: string) => {
        const d = removeTime(dateString);
        const currentDate = removeTime(getCurrentDateByFormat());
        if(d==undefined || currentDate==undefined){
            return 0;
        }
        // return getDateDiff(Date.parse(d), new Date());
        return getDateDiff(Date.parse(d), Date.parse(currentDate));
    };
    const getDateAutoFormatBy = (dateString: string | undefined, locale: string = 'th') => {
        if (!dateString) {
            return '';
        }

        const difDays = getDateDiffNow(dateString);
        if (difDays > 0 && difDays < 365) {
            return formatDateTime(dateString, FORMAT_DATE19, locale);
        } else if (difDays > 365) {
            return formatDateTime(dateString, FORMAT_DATE16, locale);
        }
        return formatDateTime(dateString, FORMAT_DATE18, locale);
    };
    const getDateTimeAutoFormatBy = (dateString: string | undefined, locale: string = 'th') => {
        if (!dateString) {
            return '';
        }
        const difDays = getDateDiffNow(dateString);
        if (difDays >= 0 && difDays < 1) {
            return formatDateTime(dateString, FORMAT_DATE18, locale);
        } else if (difDays >= 1 && difDays < 365) {
            return formatDateTime(dateString, FORMAT_DATE20, locale);
        } else {
            return formatDateTime(dateString, FORMAT_DATE17, locale);
        }
    };
    const getDateDistanceAutoFormatBy = (dateString: string | undefined, locale: string = 'th') => {
        if (!dateString) {
            return '';
        }
        const difDays = getDateDiffNow(dateString);
        if (difDays >= 0 && difDays < 1) {
            return formatDistanceFromNow(dateString, locale);
        } else if (difDays >= 1 && difDays < 365) {
            return formatDateTime(dateString, FORMAT_DATE20, locale);
        } else {
            return formatDateTime(dateString, FORMAT_DATE17, locale);
        }
    };
    /**
     * formatRelativeFromNow('2022-05-25 17:26:31', locale.value)
     * @param dateString
     * @param locale
     * @returns
     */
    const formatRelativeFromNow = (
        dateString: string | undefined,
        locale: string = 'th'
    ) => {
        if (!dateString) {
            return;
        }
        return $datefns.formatRelative(Date.parse(dateString), new Date(), {
            locale: locale == 'th' ? th : enUS
        });
    };
    /**
     * formatDistanceFromNow('2022-05-25 17:26:31', locale.value)
     * @param dateString
     * @param locale
     * @param suffix
     * @returns
     */
    const formatDistanceFromNow = (
        dateString: string,
        locale: string | unknown,
        suffix: boolean = false
    ) => {
        return $datefns.formatDistanceToNow(convertStringToDate(dateString), {
            locale: locale == 'th' ? th : enUS,
            addSuffix: suffix
        });
    };
    const getCurrentDateByFormat = (
        forMatString: string | undefined = FORMAT_DATE14//yyyy-MM-dd
    ) => {
        return formatDateBy(getDateNow(), forMatString);
    };

    /**
     * formatDate('2022-05-25 17:26:31', 'dd MMMM yyyy', locale.value)
     * @param dateString
     * @param forMatString
     * @param locale
     * @returns
     */
    const formatDateTime = (
        dateString: string,
        forMatString: string,
        locale: string | unknown
    ) => {
        return $datefns.format(convertStringToDate(dateString), forMatString, {
            locale: locale == 'th' ? th : enUS
        });
    };
    const formatDate = (
        dateString: string | undefined | null,
        forMatString: string,
        locale: string | unknown
    ) => {
        if (!dateString) {
            return undefined;
        }
        const d = removeTime(dateString);
        return d
            ? $datefns.format(convertStringToDate(d, FORMAT_DATE14), forMatString, {
                locale: locale == 'th' ? th : enUS
            })
            : undefined;
    };
    const formatDateBy = (d: Date, forMatString: string) => {
        return $datefns.format(d, forMatString);
    };
    const formatDistanceFrom = (
        dateString: string,
        fromDateString: string | undefined,
        locale: string | unknown
    ) => {
        return $datefns.formatDistance(
            convertStringToDate(dateString),
            fromDateString ? convertStringToDate(fromDateString) : new Date(),
            {
                locale: locale == 'th' ? th : enUS,
                addSuffix: true
            }
        );
    };
    const formatIos = (d: string, forMatString: string) => {
        return $datefns.format($datefns.parseISO(d), forMatString);
    };
    const convertStringToDate = (
        dateString: string,
        format = 'yyyy-MM-dd HH:mm:ss'
    ): Date => {
        return $datefns.parse(dateString, format, new Date());
        // return new Date(dateString);
    };
    const isDateEqua = (dateLeft: string, dateRight: string) => {
        const d1 = convertStringToDate(dateLeft, FORMAT_DATE14);
        const d2 = convertStringToDate(dateRight, FORMAT_DATE14);
        return $datefns.isEqual(d1, d2);
    };
    const isDateAfter = (dateLeft: string, dateRight: string) => {
        const d1 = convertStringToDate(dateLeft, FORMAT_DATE14);
        const d2 = convertStringToDate(dateRight, FORMAT_DATE14);
        return $datefns.isAfter(d1, d2);
    };
    const isDateBefore = (dateLeft: string, dateRight: string) => {
        const d1 = convertStringToDate(dateLeft, FORMAT_DATE14);
        const d2 = convertStringToDate(dateRight, FORMAT_DATE14);
        return $datefns.isBefore(d1, d2);
    };
    return {
        getCurrentDateByFormat,
        getDateDiffMinutes,
        formatDistanceFromNow,
        formatDate,
        formatDateTime
    };
};
