import type { ChatMessageType, ChatType, EmojiType, ILanguge, LoginLogType, UploadStatus } from "./common";
export type IPermissionOperationType = 1 | 2 | 3; // 1=crud, 2=report, 3=other
export type PermissionType = "CRUD" | "REPORT" | "OTHER" | "FEATURE";
export interface Id {
  id: number | string | null;
}
export interface AccessToken extends Id {
  ipAddredd: string;
  hostName: string;
  agent: string;
  loginFrom: LoginLogType;
  activeNow: boolean;
  createdDate: string;
  lastestActive: string;
}
export interface FileManager extends Id {
  fileMime: string;
  fileName: string;
  filePath: string;
  fileThumbnailPath: string;
  fileSize: string;
  fileSizeNo?: number;
  fileCount?: number;
  functionId?: number;
  image?: boolean;
  directoryFolder?: boolean;
  createdDate?: string;
  updatedDate?: string;
  file?: any;
  video?: boolean;
  videoDetail?: {
    thumbnailFile?: any
    duration?: number
    title?: string
    description?: string
  },
  uploadProgress?: {
    uploading: boolean;
    progress: number;
    status: UploadStatus;
    uploadData?: FileManager | null
  };
}
export interface FileUploadChunkResponse {
  filename?: string | null;
  fileMime?: string | null;
  status?: boolean;
  lastChunk?: boolean;
}
export interface FileUploadChunkMergeRequest {
  totalChunks: number;
  fileMime: string | null;
  originalFilename?: string;
  chunkFilename: string;
  resizeImage: boolean;
  fileDirectoryId?: number | null;
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
  operationType: PermissionType;
}
export interface AppRole extends Id {
  name: string;
  nameEn?: string | null;
  active: boolean;
  frontEnd: boolean;
  selectdPermissions: (number | string)[];
}
export interface AppUser extends Id {
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
  selectedRoles?: (number | string)[];
  defaultLocale?: ILanguge;
  ownerProfile?: boolean;
  permissions?: string[]
  favoriteMenus?: FavoriteMenu[]
}
export interface UserProfile extends Id {
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

export interface GroupChatMember extends Id {
  favorite: boolean
  muteNotify: boolean
  pin: boolean
  online?: boolean
  joinDate: string
  offDate?: string
  member: UserProfile
}

export interface GroupChat extends Id {
  dtoAvatar?: ImageDto | null
  chatType: ChatType
  groupName?: string | null
  latestMessage?: string | null
  latestUpdate?: string | null
  latestMessageType?: ChatMessageType | null
  totalNewMessage: number
  totalMembers?: number
  pin: boolean
  favorite: boolean
  muteNotify: boolean
  online: boolean
  memberItems?: GroupChatMember[]
  totalImages?: number
  totalFile?: number
}

export interface GroupChatRequest {
  fileAvatarSelectId?: number | null | undefined
  chatType: ChatType
  groupName: string | null
  newMemberUserIds: number[]
  deleteAvatar?: boolean | undefined
  newAvatar?: ImageDto | undefined
  avatarPreview?: string | undefined
}
export interface GroupChatFile extends Id {
  fileManager?: FileManager | null | undefined
}

export interface EmojiCount {
  total: number
  emojiType: EmojiType
}
export interface GroupChatMsg extends Id {
  groupId?: number | undefined
  chatMsg?: string | undefined | null
  msgDateTime: string
  readCount: number
  unsend?: boolean | undefined
  sent: boolean
  sendUser?: AppUser | undefined
  files?: GroupChatFile[] | undefined | null
  liked?: boolean | undefined
  onlyLabel?: boolean | undefined
  emojiType?: EmojiType | null | undefined
  reactionEngage?: EmojiCount[] | undefined
  dtoReplyTo?: GroupChatMsg | null | undefined
  chatMessageType?: ChatMessageType | undefined
}
export interface GroupChatMsgRequest {
  chatMessageType?: ChatMessageType | undefined | null
  chatMsg?: string | null
  fileIds?: number[]
  shareMessageIds?: number[]
  replyToId?: number | null
}
export interface FavoriteMenu {
  url: string
}