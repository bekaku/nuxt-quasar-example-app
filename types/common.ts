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
export type IThemeSettingOptions = 'dark' | 'light' | 'system' | 'realtime';
export type ITheme = 'dark' | 'light' | 'system';
export type ILanguge = 'en' | 'th';
export type ICrudAction = 'new' | 'view' | 'copy';
export type GenerateLinkType = 'post' | 'profile';
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
export type LoginLogType = 'WEB' | 'IOS' | 'ANDROID';
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
export interface LabelValue<Type> {
    label: string;
    description?: string;
    avatar?: string;
    icon?: string;
    fetch?: boolean;
    value: Type;
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

  export interface NavigateToOpenOptions{
    target?:IHrefTarget
    windowFeatures:{
        width?:number
        height?:number
        popup?:boolean
        left?:number
        top?:number
        noopener?:boolean
        noreferrer?:boolean
    }
  }
  export interface NavigateToOptions {
    replace?: boolean
    redirectCode?: number
    external?: boolean
    open?: NavigateToOpenOptions
  }