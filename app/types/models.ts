import type { ChatMessageType, ChatType, EmojiType, ILanguge, LoginLogType, UploadStatus } from "./common";
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
  uploadProgress?: {
    uploading: boolean;
    progress: number;
    status: UploadStatus;
    uploadData?: FileManagerDto | null
  };
}
export interface FileUploadChunkResponseDto {
  filename?: string | null;
  fileMime?: string | null;
  status?: boolean;
  lastChunk?: boolean;
}
export interface FileUploadChunkMergeRequestDto {
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

export interface GroupChatMemberDto extends Id {
  favorite: boolean
  muteNotify: boolean
  pin: boolean
  online?: boolean
  joinDate: string
  offDate?: string
  member: UserProfileDto
}

export interface GroupChatDto extends Id {
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
  memberItems?: GroupChatMemberDto[]
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
export interface GroupChatFileDto extends Id {
  fileManager?: FileManagerDto | null | undefined
}

export interface EmojiCountDto {
  total: number
  emojiType: EmojiType
}
export interface GroupChatMsgDto extends Id {
  groupId?: number | undefined
  chatMsg?: string | undefined | null
  msgDateTime: string
  readCount: number
  unsend?: boolean | undefined
  sent: boolean
  sendUser?: UserDto | undefined
  files?: GroupChatFileDto[] | undefined | null
  liked?: boolean | undefined
  onlyLabel?: boolean | undefined
  emojiType?: EmojiType | null | undefined
  reactionEngage?: EmojiCountDto[] | undefined
  dtoReplyTo?: GroupChatMsgDto | null | undefined
  chatMessageType?: ChatMessageType | undefined
}
export interface GroupChatMsgRequest {
  chatMessageType?: ChatMessageType | undefined | null
  chatMsg?: string | null
  fileIds?: number[]
  shareMessageIds?: number[]
  replyToId?: number | null
}