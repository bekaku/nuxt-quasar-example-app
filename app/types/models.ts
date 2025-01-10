import type { ILanguge, LoginLogType } from "./common";
export type IPermissionOperationType = 1 | 2 | 3; // 1=crud, 2=report, 3=other
export interface Id {
    id: number | null;
}
export interface AccessTokenDto extends Id {
    ipAddredd: string;
    hostName: string;
    agent: string;
    loginFrom: LoginLogType;
    activeNow: boolean;
    createdDate: string;
    lastestActive: string;
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
export interface ImageDto {
    index?: number;
    id?: number;
    image: string;
    thumbnail: string;
}
export interface Permission extends Id {
    code: string;
    remark?: string | null;
    description?: string | null;
    operationType: IPermissionOperationType;
    frontEnd?: boolean;
}
export interface Role extends Id {
    name: string;
    nameEn?: string | null;
    active: boolean;
    frontEnd: boolean;
    selectdPermissions: number[];
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
    permissions?: string[]
}
export interface UserProfileDto extends Id {
    id: number;
    username: string;
    fullName: string;
    avatar: ImageDto | null;
    cover: ImageDto | null;
}
export interface UserChangePasswordRequest {
    password: string;
    newPassword?: string;
    logoutAllDevice: boolean;
}
export interface UserPersonalEditRequest {
    fullName?: string;
    email?: string;
    username?: string;
    mobilePhone?: string;
    positionName?: string;
    teamLeaderName?: string;
    initialConfig?: boolean;
    autoFollowUser?: boolean;
}

