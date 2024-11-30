import type { ILanguge } from "./common";

export interface Id {
    id: number | null;
}
export interface ImageDto {
    index?: number;
    id?: number;
    image: string;
    thumbnail: string;
}
export interface UserDto extends Id {
    email: string;
    uuid?: string;
    username?: string | null;
    password?: string | null;
    token?: string | null;
    fcmToken?: string | null;
    avatarFileId?: number | null;
    coverFileId?: number | null;
    accessTokenId?: number | null;
    avatar?: ImageDto | null;
    cover?: ImageDto | null;
    active: boolean;
    selectedRoles?: number[];
    defaultLocale?: ILanguge;
    ownerProfile?: boolean;
}
export interface FileManagerDto extends Id {
    fileMime: string;
    fileName: string;
    filePath: string;
    fileThumbnailPath: string;
    fileSize: string;
    functionId?: number;
    isImage?: boolean;
    image?: boolean;
    file?: any;
  }