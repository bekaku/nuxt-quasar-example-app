import {
    formatRelative,
    formatDistance,
    formatDistanceToNow,
    format,
    parse,
    differenceInDays,
    parseISO,
    isEqual,
    isAfter,
    isBefore,
    differenceInMinutes
} from 'date-fns'

const datefns: any = {
    formatRelative,
    formatDistance,
    formatDistanceToNow,
    format,
    parse,
    differenceInDays,
    parseISO,
    isEqual,
    isAfter,
    isBefore,
    differenceInMinutes
}

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: { datefns: datefns },
    }
})