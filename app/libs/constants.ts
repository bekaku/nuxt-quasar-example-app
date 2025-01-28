export const FileUploadKey = '_filesUploadName';
export const FileDirectoryKey = 'fileDirectoryId';
export const FileNamePrefix = 'app_file';
export const DefultItemsPerPage = 10;
export const MaxSelectFiles = 10;
export const LimitFileSizeMB = 50;
export const LimitFileSize = LimitFileSizeMB * 1024 * 1024;
export const DefaultItemsPerPage = 10;
export const DefaultMaxItemsPerPage = 50;
export const SearchMinCharactor = 1;
export const SearchParamiter = '_q';
export const KeywordParamiter = '_keyword';
export const PageActionParamiter = 'crud';
export const PageIdParamiter = 'id';
export const BackendRootPath = undefined;
export const SearchOperation = {
  MATCH: ':',
  GREATER_THAN: '>',
  GREATER_THAN_EQUA: '>=',
  LESS_THAN: '<',
  LESS_THAN_EQUA: '<=',
  EQUA: '=',
  NOT_EQUA: '!=',
};
export const CrudAction = {
  VIEW: 'view',
  NEW: 'new',
  COPY: 'copy',
  EDIT: 'edit',
};
export const FileExtensionAccept =
  '.jpg,.png,.gif,.doc,.docx,.pdf,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip,.rar';

export const FileTypeAcceptList = [
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/pdf',
  'application/vnd.rar',
  'application/zip',
  'image/jpeg',
  'image/png',
  'image/gif',
  'text/plain',
  'text/csv'
];
// export const AuthNoInitialPath: string[] = [
//   '/auth/login',
//   '/error',
// ];
// export const AuthNoFilterPath: string[] = [
//   '/error',
//   '/all',
// ];
export const AuthNoInitialPage: string[] = [
  'auth-login',
  'auth-forgot-password',
  'error',
  'all',
  'auth-login-v1',
  'auth-login-v2',
];
export const AuthNoFilterPage: string[] = [
  'error',
  'all',
  'auth-forgot-password',
  'test',
  'auth-login-v1',
  'auth-login-v2',
];