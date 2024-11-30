import { useAxios } from '@/composables/useAxios';
import type { FileManagerDto } from '@/types/models';
import type { ResponseDataType, ResponseMessage } from '~/types/common';
import { FileDirectoryKey, FileUploadKey } from '~/libs/constants';
import {
  downloadFromArrayBuffer,
  generateFileNameByExtesnsion,
  getBlobFromAxiosResponse,
  getFileNameFromAxiosResponse,
  getFileExtension,
  getFileNameFromResponse
} from '~/utils/fileUtil';

export default () => {
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
      body: postData,
      baseURL: process.env.cdnBaseUrl,
      contentType: 'multipart/form-data'
    });
  };
  const deleteFileApi = async (fileId: number): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/fileManager/deleteFileApi/${fileId}`,
      method: 'DELETE',
      baseURL: process.env.cdnBaseUrl
    });
  };
  const updateUserAvatar = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/fileManager/updateUserAvatar?fileManagerId=${fileManagerId}`,
      method: 'PUT',
      baseURL: process.env.cdnBaseUrl
    });
  };
  const updateUserCover = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/fileManager/updateUserCover?fileManagerId=${fileManagerId}`,
      method: 'PUT',
      baseURL: process.env.cdnBaseUrl
    });
  };
  // const fethCdnData = async (
  //   path: string
  // ): Promise<any> => {
  //   const cdnBase = process.env.cdnBaseUrl;
  //   const src = cdnBase ? path.replace(cdnBase, '') : path;
  //   return await callAxiosFile<any>({
  //     API: src,
  //     baseURL: process.env.cdnBaseUrl,
  //     method: 'GET',
  //     responseType: 'arraybuffer'
  //   });
  // };
  const fethCdnData = async (
    path: string,
    responseDataType: ResponseDataType = 'blob'
  ): Promise<any> => {
    const cdnBase = process.env.cdnBaseUrl;
    const src = cdnBase ? path.replace(cdnBase, '') : path;
    const response = await callAxiosFile<any>({
      API: src,
      baseURL: process.env.cdnBaseUrl,
      method: 'GET',
      responseType: 'arraybuffer'
    });
    return new Promise(async (resolve /*reject*/) => {
      if (response.data) {
        if (responseDataType == 'blob') {
          const imageUrlObject = await getBlobFromAxiosResponse(response);
          resolve(imageUrlObject);
        } else if (responseDataType == 'arraybuffer') {
          resolve(response.data);
        } else if (responseDataType == 'download') {
          const contentType = response.headers['content-type'];
          const fileName = getFileNameFromResponse(response);
          downloadFromArrayBuffer(response.data, fileName, contentType);
          // const name = 'Test.'
          resolve(response.data);
        } else if (responseDataType == 'axiosresponse') {
          resolve(response);
        }
      }
    });
  };
  const downloadCdnData = async (
    path: string,
    downloadFileName?: string
  ): Promise<any> => {
    const response = await fethCdnData(path, 'axiosresponse');
    return new Promise(async (resolve /*reject*/) => {
      if (response.data) {
        const contentType = response.headers['content-type'];
        // const contentDisposition = response.headers['content-disposition'];
        let fileName = await getFileNameFromAxiosResponse(response);

        if (!fileName) {
          const fileExtension = getFileExtension(contentType);
          fileName = generateFileNameByExtesnsion(fileExtension, downloadFileName);
        }
        if (fileName) {
          downloadFromArrayBuffer(response.data, fileName, contentType);
        }
        resolve(response.data);
      }

      resolve(null);
    });
  };
  return {
    uploadApi,
    updateUserAvatar,
    updateUserCover,
    deleteFileApi,
    fethCdnData,
    downloadCdnData
  };
};
