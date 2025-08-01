import { useAxios } from '~/composables/useAxios';
import type { FileManagerDto } from '~/types/models';
import type { ResponseDataType, ResponseMessage } from '~/types/common';
import { FileDirectoryKey, FileUploadKey } from '~/libs/constants';
import {
  downloadFromArrayBuffer,
  generateFileNameByExtesnsion,
  getBlobFromAxiosResponse,
  getFileNameFromAxiosResponse,
  getFileExtension,
} from '~/utils/fileUtil';

export default () => {
  const { public: config } = useRuntimeConfig()
  const { callAxios, callAxiosFile } = useAxios();
  const uploadApi = async (
    file: any,
    fileDirectoryId = 0,
    resizeImage = true
  ): Promise<FileManagerDto | null> => {
    const postData = new FormData();
    postData.append(FileUploadKey, file);
    postData.append(FileDirectoryKey, fileDirectoryId.toString());
    postData.append('resizeImage', resizeImage ? '1' : '0');
    return await callAxios<FileManagerDto>({
      API: '/api/fileManager/uploadApi',
      method: 'POST',
      // body: postData,
      baseURL: config.cdnBase,
      contentType: 'multipart/form-data'
    });
  };
  const deleteFileApi = async (fileId: number): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/fileManager/deleteFileApi/${fileId}`,
      method: 'DELETE',
      baseURL: config.cdnBase
    });
  };
  const updateUserAvatar = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/fileManager/updateUserAvatar?fileManagerId=${fileManagerId}`,
      method: 'PUT',
      baseURL: config.cdnBase
    });
  };
  const updateUserCover = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/fileManager/updateUserCover?fileManagerId=${fileManagerId}`,
      method: 'PUT',
      baseURL: config.cdnBase
    });
  };
  // const fethCdnData = async (
  //   path: string
  // ): Promise<any> => {
  //   const cdnBase = config.public.cdnBase;
  //   const src = cdnBase ? path.replace(cdnBase, '') : path;
  //   return await callAxiosFile<any>({
  //     API: src,
  //     baseURL: config.public.cdnBase,
  //     method: 'GET',
  //     responseType: 'arraybuffer'
  //   });
  // };
  const fethCdnData = async (
    path: string,
    responseDataType: ResponseDataType = 'blob'
  ): Promise<any> => {
    // const cdnBase = config.cdnBase;
    // const src = cdnBase ? path.replace(cdnBase, '') : path;
    const response = await callAxiosFile<any>({
      API: path,
      // baseURL: config.cdnBase,
      method: 'GET',
      responseType: 'arraybuffer',
      clearBaseUrl: true

    });
    if (response.data) {
      if (responseDataType == 'blob') {
        const imageUrlObject = await getBlobFromAxiosResponse(response);
        return new Promise((resolve) => resolve(imageUrlObject));
      } else if (responseDataType == 'arraybuffer') {
        return new Promise((resolve) => resolve(response.data));
      } else if (responseDataType == 'download') {
        await downloadProcess(response);
        return new Promise((resolve) => resolve(response.data));
      } else if (responseDataType == 'axiosresponse') {
        return new Promise((resolve) => resolve(response));
      }
    }
  };
  const downloadCdnData = async (
    path: string,
    downloadFileName?: string
  ): Promise<any> => {
    const response = await fethCdnData(path, 'axiosresponse');
    if (response.data) {
      await downloadProcess(response, downloadFileName);
    }
    return new Promise((resolve) => resolve(null));
  };

  const downloadProcess = async (response: any, downloadFileName?: string) => {
    if (response.data) {
      const contentType = response.headers['content-type'];
      let fileName = await getFileNameFromAxiosResponse(response);
      if (!fileName) {
        const fileExtension = getFileExtension(contentType);
        fileName = generateFileNameByExtesnsion(fileExtension, downloadFileName);
      }
      if (fileName) {
        downloadFromArrayBuffer(response.data, fileName, contentType);
      }
      return new Promise((resolve) => resolve(response.data));
    } else {
      return new Promise((resolve) => resolve(null));
    }
  }
  return {
    uploadApi,
    updateUserAvatar,
    updateUserCover,
    deleteFileApi,
    fethCdnData,
    downloadCdnData,
  };
};
