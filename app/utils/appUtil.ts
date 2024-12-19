import type { AppException, IApiListResponse, IHrefTarget, IMenuPageItem, ISortModeType, ResponseMessage, ServerException } from "~/types/common";

export const isAppException = (obj: any): obj is AppException => {
    return (
        obj.status !== undefined &&
        obj.message !== undefined &&
        obj.errors !== undefined
    );
};
export const isServerException = (obj: any): obj is ServerException => {
    return (
        obj.status !== undefined &&
        obj.message !== undefined &&
        obj.error !== undefined &&
        obj.timestamp !== undefined &&
        obj.path !== undefined
    );
};
export const isServerResponseMessage = (obj: any): obj is ResponseMessage => {
    return obj.status !== undefined && obj.message !== undefined;
};
export const isListResponse = (obj: any): obj is IApiListResponse<any> => {
    return (
        obj.dataList !== undefined &&
        obj.last !== undefined &&
        obj.totalElements !== undefined &&
        obj.totalPages !== undefined
    );
};

export const isNumber = (value: string | number): boolean => {
    return value != null && value !== '' && !isNaN(Number(value.toString()));
};
export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};
export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
/**
* 
* @param name 
* @returns 
* ^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
  └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
     │         │         │            │           no _ or . at the end
     │         │         │            │
     │         │         │            allowed characters
     │         │         │
     │         │         no __ or _. or ._ or .. inside
     │         │
     │         no _ or . at the beginning
     │
     username is 4-20 characters long
*/
export const validateUsername = (name: string) => {
    return String(name)
        .toLowerCase()
        .match(/^(?=[a-zA-Z0-9._]{4,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/);
    // .match(/^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,20}[a-zA-Z0-9]$/);
};
export const openUrlInNewTab = (
    href: string,
    iTarget: IHrefTarget = '_blank',
    ev: Event | undefined = undefined
) => {
    Object.assign(document.createElement('a'), {
        target: iTarget,
        href,
    }).click();
    if (ev) {
        ev.stopImmediatePropagation();
    }
};

export const checkExpansionChildActive = (
    currentUrlPath: string,
    items: IMenuPageItem[]
) => {
    let active = false;
    for (const page of items) {
        if (page.to == currentUrlPath) {
            active = true;
            break;
        }
    }

    return active;
};
export const isEmptyVal = (val: any) => {
    return !val || val == 'null' || val == null || val == '' || val == undefined || val == 'undefined';
};
export const isEmpty = (value: any) => {
    if (typeof value === 'number') {
        return false;
    } else if (typeof value === 'string') {
        return value.trim().length === 0;
    } else if (Array.isArray(value)) {
        return value.length === 0;
    } else if (typeof value === 'object') {
        return value == null || Object.keys(value).length === 0;
    } else if (typeof value === 'boolean') {
        return false;
    } else {
        return !value;
    }
};
export const isObjectEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
};
export const convertStringToNumber = (n: string | undefined): number => {
    return n ? +n : 0;
};
export const snakeToCamel = (str: string) =>
    str
        ? str
            .toLowerCase()
            .replace(/([-_][a-z])/g, (group) =>
                group.toUpperCase().replace('-', '').replace('_', '')
            )
        : '';
export const catchUrlFromText = (inputText: string) => {
    return inputText.match(/\bhttps?:\/\/\S+/gi);
};
export const urlify = (
    inputText: string,
    linkColor: string | undefined = undefined
) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return inputText.replace(urlRegex, (url) => {
        return `<a class="app-text-link ${linkColor ? linkColor : ''
            }" href="${url}" target="_blank">${url}</a>`;
    });
};
export const roundDecimal = (value: number, precision: number) => {
    const multiplier = Math.pow(10, precision);
    return Math.round(value * multiplier) / multiplier;
};
export const formatBytes = (bytes: any, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};
export const readableNumber = (num: number, digits: number) => {
    if (num < 1000) {
        return num;
    }
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup
        .slice()
        .reverse()
        .find(function (item) {
            return num >= item.value;
        });
    return item
        ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol
        : '0';
};
export const percentage = (val: number, total: number, decimal = 2): number => {
    if (total === 0) {
        return 0;
    }
    return +((val * 100) / total).toFixed(decimal);
};
export const percentageReturnOne = (
    val: number,
    total: number,
    decimal = 2
): number => {
    const p = percentage(val, total, decimal);
    return p > 0 ? p / 100 : 0;
};
export const removeDecimal = (val: number) => {
    if (val === 0) {
        return 0;
    }
    return Math.trunc(val);
};
export const roundCeilDecimal = (val: number) => {
    if (val === 0) {
        return 0;
    }
    return Math.ceil(val);
};
export const extractHashtagsFromString = (val: string): string[] => {
    if (!val) {
        return [];
    }
    // return val.split(/[\s\n\r]/gim).filter((v) => v.startsWith('#'));
    // return extractHashtagsStartingWithLetter(val)
    return val.split(/[\s\n\r]/gim).filter((v) => {
        if (v.startsWith('#')) {
            // Check if the character following '#' is not a digit (0-9)
            return !(/^\#\d/.test(v));
        }
        return false;
    });
};
export const randomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * max) + min;;
}
// export const numberFormat = (no: number | string | null | undefined) => {
//     if (no == undefined || no == null) {
//         return '';
//     }
//     return no.toLocaleString();
// }
export const numberFormat = (no: number | string | null | undefined) => {
    if (no == undefined || no == null) {
        return '';
    }
    let number = no;
    if(typeof number !=='number'){
        number = parseFloat(number);
    }
    return new Intl.NumberFormat().format(number);
}
export const isArray = (value: any): boolean => {
    return Array.isArray(value);
};
export const sortedArray = <T>(list: any[], filedName: string, mode: ISortModeType): Promise<T> => {
    return new Promise((resolve) => {
        let finalList: any[] = [];
        if (list && list.length > 0) {
            if (mode === 'asc') {
                finalList = list.sort((a, b) => a[filedName] - b[filedName]);
            } else {
                finalList = list.sort((a, b) => b[filedName] - a[filedName]);
            }
        }
        resolve(finalList as T);
    });
};
export const escapeHtml = (unsafe: string | undefined) => {
    if (!unsafe) {
        return '';
    }
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#039;'
    };

    return unsafe.replace(/[&<>"']/g, (char) => map[char]);
};
export const unescapeHtml = (safe: string | undefined) => {
    if (!safe) {
        return '';
    }
    const map: { [key: string]: string } = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': '\''
    };
    return safe.replace(/&(amp|lt|gt|quot|#039);/g, (entity) => map[entity]);
};