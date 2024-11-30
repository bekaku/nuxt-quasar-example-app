export const FileUploadKey = '_filesUploadName';
export const FileDirectoryKey = 'fileDirectoryId';
export const FileNamePrefix = 'app_file';
export const DefultItemsPerPage = 10;
export const MaxSelectFiles = 10;
export const LimitFileSizeMB = 50;
export const LimitFileSize = LimitFileSizeMB * 1024 * 1024;
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
export const AuthNoInitialPath: string[] = [
    '/auth/login',
    '/error',
  ];
export const AuthNoFilterPath: string[] = [
    '/error',
    '/all',
  ];
export const AuthNoFilterPage: string[] = [
    'error',
    'all',
  ];