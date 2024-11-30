export enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE,
}
export enum CrudListDataType {
    TEXT,
    HTML,
    IMAGE,
    AVATAR,
    STATUS,
    DATE,
    DATE_TIME,
    LINKABLE,
    BASE_TOOL,
    NUMBER_FORMAT,
    ICON,
    FUNCTION,
}
export enum ICrudListHeaderOptionSearchType {
    TEXT,
    NUMBER,
    BOOLEAN,
    DATE,
    DATETIME,
}

export type Date = string;
export type SearchOperation = ':' | '>' | '>=' | '<' | '<=' | '=' | '!=';
export interface ChoosePhotoItem {
    webPath?: string;
    file?: File;
}
export type IHttpStatus =
    | 'OK'
    | 'CREATED'
    | 'NOT_FOUND'
    | 'UNAUTHORIZED'
    | 'BAD_REQUEST'
    | 'FORBIDDEN'
    | 'INTERNAL_SERVER_ERROR';
export type IMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export type ITheme = 'dark' | 'light' | 'system' | 'realtime';
export type ILanguge = 'en' | 'th';
export type ICrudAction = 'new' | 'view' | 'copy';
export type GenerateLinkType = 'post' | 'profile';
export type EmojiSet = 'native' | 'apple' | 'facebook' | 'google' | 'twitter';
export type IResult =
    | '404'
    | '403'
    | '500'
    | '418'
    | 'info'
    | 'success'
    | 'error'
    | 'warning'
    | 'empty';
export type IAlert =
    | 'is-primary'
    | 'is-link'
    | 'is-info'
    | 'is-success'
    | 'is-warning'
    | 'is-danger'
    | 'is-light';
export type IHrefTarget = '_blank' | '_parent' | '_self' | '_top';
export type JwtStatus = 'VALID' | 'EXPIRED' | 'NO_EXPIRATION_TIME' | 'INVALID';
export type MDPreviewTheme = 'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis';
export type MDCodeTheme =
    'atom'
    | 'a11y'
    | 'github'
    | 'gradient'
    | 'kimbie'
    | 'paraiso'
    | 'qtcreator'
    | 'stackoverflow';
export type ResponseDataType = 'arraybuffer' | 'blob' | 'json' | 'download' | 'axiosresponse';
export type FileType = 'pdf' | 'msexcel' | 'msword' | 'mspowerpoint' | 'image' | 'zip' | 'unknown';
export type IAlign = 'center' | 'left' | 'right';
export type LoginLogType = 'WEB' | 'IOS' | 'ANDROID';
export type ChatHistoryTab = 'ALL' | 'GROUP' | 'FAVORITE';

export interface IThemeItem {
    key: ITheme;
    text: string;
    icon: string;
}
export interface ILocales {
    name: string;
    iso: ILanguge;
    flag: string;
    icon?: string;
}
export interface RequestType {
    API: string;
    baseURL?: string;
    method: IMethod;
    body?: any;
    contentType?: string;
    responseType?: 'arraybuffer' | 'document' | 'json' | 'text' | 'stream';
}
export interface ApiResponse {
    response?: any;
    error?: any;
}
export interface ResponseMessage {
    status: IHttpStatus;
    message?: string;
    timestamp: string;
}
export interface ServerException {
    status: number | string;
    message: string;
    error: string;
    timestamp: string;
    path: string;
}
export interface DefaultAxiosInstance {
    Accept: string;
    //   baseURL: string;
    'Content-Type': string;
    'X-language': string;
    'Code-Version': number;
    'X-Api-Client': string;
    Authorization?: string;
}
export interface AppException {
    status: string;
    message: string;
    errors?: string[];
    timestamp?: string;
}
export type ISortModeType = 'asc' | 'desc';
export interface ISort {
    mode?: ISortModeType;
    column?: string;
}
export interface ISortMode {
    label: string;
    value: ISortModeType;
}
export interface ITextValue {
    text: string;
    value: number | string;
}
export interface LabelValue<Type> {
    label: string;
    description?: string;
    avatar?: string;
    icon?: string;
    fetch?: boolean;
    value: Type;
}
export interface IPagination {
    current: number;
    itemsPerPage: number;
    totalPages: number;
    totalElements?: number;
    last?: boolean;
    perPageList: ITextValue[];
}
export interface ICrudListHeaderOption {
    searchable?: boolean;
    fillable?: boolean;
    sortable?: boolean;
    external?: boolean; //LINKABLE
    editButton?: boolean; //BASE_TOOL
    deleteButton?: boolean; //BASE_TOOL
    copyButton?: boolean; //BASE_TOOL
    square?: boolean; //AVATAR,
    rounded?: boolean; //AVATAR,
    size?: string; //AVATAR 45px,
    // body td
    style?: string; //'height: auto; width: 100px' for IMAGE,
    classes?: string;
    // header th:
    headerStyle?: string;
    headerClasses?: string;
    align?: IAlign; //'center', center left right
    searchType?: ICrudListHeaderOptionSearchType;
    searchModel?: any;
    searchColunm?: string;
    sortColunm?: string;
    searchOperation?: SearchOperation;
    searchOperationReadonly?: boolean;
    maxWidth?: string;//250px
    toolTip?: boolean;
    func?: any;
    trueIcon?: string;
    falseIcon?: string;
}
export interface ICrudListHeader {
    column?: string;
    field?: any;
    label: string;
    type: CrudListDataType;
    options: ICrudListHeaderOption;
}
export interface CrudListApiOptions {
    apiEndpoint?: string;
    crudName?: string;
    actionList?: string;
    actionDelete?: string;
    actionPost?: string;
    actionPut?: string;
    actionGetOne?: string;
    additionalUri?: string;
    defaultSort?: ISort;
    defaultSorts?: ISort[];
    itemsPerPage?: number;
    fetchListOnload?: boolean;
    pageAble?: boolean;
    pageStartZero?: boolean;
    sortAble?: boolean;
    concatList?: boolean;
}
export interface ICrudListApiOptions extends CrudListApiOptions {
    urlEndpoint: string;
    reverseList?: boolean;
    addUnshift?: boolean;
    preventResetListReload?: boolean;
}
export interface ApiListResponse {
    totalPages: number;
    totalElements: number;
    last: boolean;
}
export interface IApiListResponse<Type> extends ApiListResponse {
    dataList: Type[];
}
export interface CrudFormApiOptions {
    apiEndpoint?: string;
    crudName?: string;
    fetchDataLink?: string;
    backLink?: string;
    backToPreviousPath?: boolean;
    actionList?: string;
    actionPost?: string;
    actionPut?: string;
    actionDelete?: string;
    basePath?: string;
    fectchDataOnLoad?: boolean;
    autoPageTitle?: boolean;
    preventRedirectToList?: boolean;
    requestEntityName?: string;
    methodPutIncludeId?: boolean;
}
export interface IMenuPageItem {
    iconText?: string;
    color?: string;
    icon?: string;
    to?: string;
    title?: string;
    caption?: string;
    titleI18n?: boolean;
    permission?: string;
    border?: boolean;
    header?: string;
    headerI18n?: boolean;
    noActiveLink?: boolean;
    userAcl?: boolean;
    canShow?: boolean;
    image?: string;
    imageSize?: number;
    fetchImage?: boolean;
    iconSize?: number;
    iconColor?: string;
    translate?: boolean;
}
export interface LoginRequest {
    emailOrUsername: string | null;
    password: string | null;
    loginFrom: LoginLogType;
    deviceId?: string | null;
}
export interface RefreshTokenRequest {
    refreshToken?: string | null;
    fcmToken?: string | null;
    email?: string | null;
    fcmEnable?: boolean;
}
export interface RefreshTokenResponse {
    userId?: number;
    authenticationToken: string;
    refreshToken: string;
    expiresAt: string;
}
export interface ForgotPasswordRequest {
    email: string;
    token?: string;
    newPassword?: string;
    confirmPassword?: string;
}
export interface NotifyOptions {
    icon?: string;
    caption?: string;
    avatar?: string;
    color?: string;
    textColor?: string;
    type?: 'positive' | 'negative' | 'warning' | 'info';
    timeout?: number;
    progress?: boolean;
    multiLine?: boolean;
    spinner?: boolean;
    html?: boolean;
    hideClose?: boolean;
    position?:
    | 'bottom'
    | 'top-left'
    | 'top-right'
    | 'bottom-right'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'center';
    actions?: any[];
}

export interface NavigateToOpenOptions {
    target?: IHrefTarget
    windowFeatures: {
        width?: number
        height?: number
        popup?: boolean
        left?: number
        top?: number
        noopener?: boolean
        noreferrer?: boolean
    }
}
export interface NavigateToOptions {
    replace?: boolean
    redirectCode?: number
    external?: boolean
    open?: NavigateToOpenOptions
}
export interface IAcl {
    menus: IMenu[];
    permissions: string[];
    frontendMenus: IMenu[];
    frontendPermissions: string[];
}
export interface IMenu {
    pages?: IMenuPage[];
    header?: string;
    border?: boolean;
    translate?: boolean;
}
export interface IMenuPageItem {
    iconText?: string;
    color?: string;
    icon?: string;
    to?: string;
    title?: string;
    caption?: string;
    titleI18n?: boolean;
    permission?: string;
    border?: boolean;
    header?: string;
    headerI18n?: boolean;
    noActiveLink?: boolean;
    userAcl?: boolean;
    canShow?: boolean;
    image?: string;
    imageSize?: number;
    fetchImage?: boolean;
    iconSize?: number;
    iconColor?: string;
    translate?: boolean;
}
export interface IMenuPage extends IMenuPageItem {
    items?: IMenuPageItem[];
}
export interface RequestDto {
    [key: string]: any;
}
export interface IFile {
    type: string;
    size: number;
    icon: string;
    name?: string;
    filePath?: string | null;
}
export interface CacheDateAndKey {
    key: string;
    date: string | number;
}
export interface SlideAutoplay {
    delay: number;
}

export interface SlideZoom {
    maxRatio: number;
}

export interface SlidePaginationy {
    hideOnClick?: boolean;
    enabled?: boolean;
    dynamicBullets?: boolean;
}

export type SlidePaginationType = 'progressbar' | 'bullets' | 'fraction' | 'custom';
export type SlideDirectionType = 'horizontal' | 'vertical';
export type SlideEffectType = 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'creative' | 'cards';
export interface SlideOptions {
    autoplay?: boolean | SlideAutoplay;
    breakpoints?: any;
    centeredSlides?: boolean;
    allowTouchMove?: boolean;
    direction?: SlideDirectionType;
    effect?: SlideEffectType;
    freeMode?: boolean;
    initialSlide?: number;
    keyboard?: boolean;
    lazy?: boolean;
    loop?: boolean;
    modules?: SlideModule[];
    navigation?: boolean;
    navigationType?: boolean;
    navigationCustom?: boolean;
    pagination?: boolean | SlidePaginationy;
    paginationType?: SlidePaginationType;
    paginationDynamic?: boolean;
    scrollbar?: boolean;
    style?: object;
    speed?: number;
    slidesPerView?: number | 'auto';
    spaceBetween?: number;
    slidesPerGroup?: number;
    thumbs?: boolean;
    updateOnWindowResize?: boolean;
    zoom?: boolean | SlideZoom;
}
export type SlideModule =
    | 'Autoplay'
    | 'Keyboard'
    | 'Scrollbar'
    | 'Zoom'
    | 'Navigation';
export interface Country {
    code: CountryCode;
    no: number;
    name: string;
}
export interface Breadcrumb {
    label: string;
    translateLabel?: boolean;
    icon?: string;
    to?: string;
    params?: string[];
    queries?: string[];
    permissions?: string[];
    frontend?: boolean;
}
export interface RefeshTokenStatus {
    status: boolean;
    fourceLogout: boolean;
    token?: string;
}

export interface VirtualScrollerUpdate {
    viewStartIndex: number;
    viewEndIndex: number;
    visibleStartIndex: number;
    visibleEndIndex: number;
    isScrollingToTop: boolean;
}
export type CountryCode =
    | 'AC'
    | 'AD'
    | 'AE'
    | 'AF'
    | 'AG'
    | 'AI'
    | 'AL'
    | 'AM'
    | 'AO'
    | 'AR'
    | 'AS'
    | 'AT'
    | 'AU'
    | 'AW'
    | 'AX'
    | 'AZ'
    | 'BA'
    | 'BB'
    | 'BD'
    | 'BE'
    | 'BF'
    | 'BG'
    | 'BH'
    | 'BI'
    | 'BJ'
    | 'BL'
    | 'BM'
    | 'BN'
    | 'BO'
    | 'BQ'
    | 'BR'
    | 'BS'
    | 'BT'
    | 'BW'
    | 'BY'
    | 'BZ'
    | 'CA'
    | 'CC'
    | 'CD'
    | 'CF'
    | 'CG'
    | 'CH'
    | 'CI'
    | 'CK'
    | 'CL'
    | 'CM'
    | 'CN'
    | 'CO'
    | 'CR'
    | 'CU'
    | 'CV'
    | 'CW'
    | 'CX'
    | 'CY'
    | 'CZ'
    | 'DE'
    | 'DJ'
    | 'DK'
    | 'DM'
    | 'DO'
    | 'DZ'
    | 'EC'
    | 'EE'
    | 'EG'
    | 'EH'
    | 'ER'
    | 'ES'
    | 'ET'
    | 'FI'
    | 'FJ'
    | 'FK'
    | 'FM'
    | 'FO'
    | 'FR'
    | 'GA'
    | 'GB'
    | 'GD'
    | 'GE'
    | 'GF'
    | 'GG'
    | 'GH'
    | 'GI'
    | 'GL'
    | 'GM'
    | 'GN'
    | 'GP'
    | 'GQ'
    | 'GR'
    | 'GT'
    | 'GU'
    | 'GW'
    | 'GY'
    | 'HK'
    | 'HN'
    | 'HR'
    | 'HT'
    | 'HU'
    | 'ID'
    | 'IE'
    | 'IL'
    | 'IM'
    | 'IN'
    | 'IO'
    | 'IQ'
    | 'IR'
    | 'IS'
    | 'IT'
    | 'JE'
    | 'JM'
    | 'JO'
    | 'JP'
    | 'KE'
    | 'KG'
    | 'KH'
    | 'KI'
    | 'KM'
    | 'KN'
    | 'KP'
    | 'KR'
    | 'KW'
    | 'KY'
    | 'KZ'
    | 'LA'
    | 'LB'
    | 'LC'
    | 'LI'
    | 'LK'
    | 'LR'
    | 'LS'
    | 'LT'
    | 'LU'
    | 'LV'
    | 'LY'
    | 'MA'
    | 'MC'
    | 'MD'
    | 'ME'
    | 'MF'
    | 'MG'
    | 'MH'
    | 'MK'
    | 'ML'
    | 'MM'
    | 'MN'
    | 'MO'
    | 'MP'
    | 'MQ'
    | 'MR'
    | 'MS'
    | 'MT'
    | 'MU'
    | 'MV'
    | 'MW'
    | 'MX'
    | 'MY'
    | 'MZ'
    | 'NA'
    | 'NC'
    | 'NE'
    | 'NF'
    | 'NG'
    | 'NI'
    | 'NL'
    | 'NO'
    | 'NP'
    | 'NR'
    | 'NU'
    | 'NZ'
    | 'OM'
    | 'PA'
    | 'PE'
    | 'PF'
    | 'PG'
    | 'PH'
    | 'PK'
    | 'PL'
    | 'PM'
    | 'PR'
    | 'PS'
    | 'PT'
    | 'PW'
    | 'PY'
    | 'QA'
    | 'RE'
    | 'RO'
    | 'RS'
    | 'RU'
    | 'RW'
    | 'SA'
    | 'SB'
    | 'SC'
    | 'SD'
    | 'SE'
    | 'SG'
    | 'SH'
    | 'SI'
    | 'SJ'
    | 'SK'
    | 'SL'
    | 'SM'
    | 'SN'
    | 'SO'
    | 'SR'
    | 'SS'
    | 'ST'
    | 'SV'
    | 'SX'
    | 'SY'
    | 'SZ'
    | 'TA'
    | 'TC'
    | 'TD'
    | 'TG'
    | 'TH'
    | 'TJ'
    | 'TK'
    | 'TL'
    | 'TM'
    | 'TN'
    | 'TO'
    | 'TR'
    | 'TT'
    | 'TV'
    | 'TW'
    | 'TZ'
    | 'UA'
    | 'UG'
    | 'US'
    | 'UY'
    | 'UZ'
    | 'VA'
    | 'VC'
    | 'VE'
    | 'VG'
    | 'VI'
    | 'VN'
    | 'VU'
    | 'WF'
    | 'WS'
    | 'XK'
    | 'YE'
    | 'YT'
    | 'ZA'
    | 'ZM'
    | 'ZW';