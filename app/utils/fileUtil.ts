import { FileNamePrefix } from '~/libs/constants';
import { getCurrentTimestamp } from '@/utils/dateUtil';
import {
    biFileEarmark,
    biFileEarmarkImage,
    biFileEarmarkPpt,
    biFileEarmarkZip,
    biFiletypePdf,
    biFiletypeXlsx,
    biFileWord,
    biFilm
} from '@quasar/extras/bootstrap-icons';
// import JSZip from 'jszip';
import type { FileType } from '~/types/common';
import type { FileManager } from '~/types/models';

export const fileToBlob = (file: File): Promise<any> => {
    return new Promise((resolve) => {
        const blob = new Blob([file as BlobPart], {
            type: file.type
        });
        const fileUrlObject = URL.createObjectURL(blob);
        resolve(fileUrlObject);
    });
};
// export const base64ToFile = (base64: string, filename: string): File | null => {
//     const arr: any = base64.split(',')
//     if (arr != undefined || !Array.isArray(arr)) {
//         return null;
//     }
//     const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg'
//     const bstr = atob(arr[1])
//     let n = bstr.length
//     const u8arr = new Uint8Array(n)
//     while (n--) {
//         u8arr[n] = bstr.charCodeAt(n)
//     }
//     return new File([u8arr], filename, { type: mime })
// }
export const base64ToFile = (base64: string, filename: string): Promise<File> => {
  return new Promise((resolve, reject) => {
    try {
      const arr: string[] = base64.split(",");
      if (!arr || arr.length < 2) {
        return reject(new Error("Invalid base64 input"));
      }

      const mimeMatch = arr[0]?.match(/:(.*?);/);
      const mime = mimeMatch && mimeMatch[1] ? mimeMatch[1] : "image/jpeg";

      const bstr = atob(arr[1] ?? ""); // safe fallback
      let n = bstr.length;
      const u8arr = new Uint8Array(n);

      for (let i = 0; i < n; i++) {
        u8arr[i] = bstr.charCodeAt(i);
      }

      const file = new File([u8arr], filename, { type: mime });
      resolve(file);
    } catch (err) {
      reject(err);
    }
  });
};
export const fileUrlToBlob = async (url: string): Promise<any> => {
    const response = await fetch(url);
    const blob = await response.blob();
    const urlBlob = URL.createObjectURL(blob);
    return new Promise((resolve) => {
        resolve(urlBlob);
    });
};
export const downloadFromArrayBuffer = (
    arrayBuffer: any,
    fileName: string,
    fileType: string
) => {
    // Create a Blob from the ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: fileType });
    downloadFromBlob(blob, fileName, fileType);
};
export const downloadFromBlob = (
    blob: any,
    fileName: string,
    fileType: string | undefined = undefined
) => {
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    // Create a link element
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    // Append the link to the body
    document.body.appendChild(link);
    // Programmatically trigger the click event to start the download
    link.click();
    // Clean up: remove the link and revoke the URL
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
export const downloadFromBlobUrl = (blobUrl: string, filename: string) => {
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename || 'downloaded-file';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
export const isBlobUrl = (url: string) => {
    return url != undefined && url.startsWith('blob:')
}
export const downloadFileFromUrl = async (url: string, filename: string) => {
    try {
        const urlBlob = await fileUrlToBlob(url);
        const anchor = document.createElement('a');
        anchor.href = urlBlob;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

        // Cleanup
        URL.revokeObjectURL(urlBlob);
    } catch (error) {
        console.error('Download failed:', error);
    }
};
export const getBlobFromAxiosResponse = (response: any) => {
    return new Promise((resolve) => {
        const blob = new Blob([response.data as BlobPart], {
            type: response.headers['content-type']
        });
        const fileUrlObject = URL.createObjectURL(blob);
        resolve(fileUrlObject);
    });
};
export const getFileNameFromAxiosResponse = (response: any): Promise<string | undefined> => {
    return new Promise((resolve) => {
        const contentDisposition = response.headers['content-disposition'];
        let fileName = undefined;
        if (contentDisposition) {
            // const parts = contentDisposition.split('=');
            // fileName = parts[1];
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = filenameRegex.exec(contentDisposition);
            if (matches?.[1]) {
                // Remove quotes if present
                fileName = matches[1].replace(/['"]/g, '');
            }
        }
        resolve(fileName);
    });
};

export const generateFileNameByExtesnsion = (extension: string | undefined, downloadFileName?: string): string | undefined => {
    if (!extension) {
        return undefined;
    }
    if (downloadFileName) {
        const fileName = downloadFileName.split('.')[0];
        if (fileName) {
            return `${fileName}${extension}`;
        }
    }
    return `${FileNamePrefix}_${getCurrentTimestamp()}${extension}`;
};
export const zipFile = async (file: File): Promise<File | null> => {
    // const zip = new JSZip();
    // zip.file(file.name, file);
    // const blob = await zip.generateAsync({ type: 'blob' });
    // const zippedFile = new File([blob], `${file.name}.zip`, { type: 'application/zip' });
    // return new Promise((resolve) => {
    //     resolve(zippedFile);
    // });
    return new Promise((resolve) => {
        resolve(null);
    });
};

export const getImgUrlFromFile = (f: any): Promise<string | undefined> => {
    if (!f) {
        return new Promise((resolve) => {
            resolve(undefined);
        });
    }
    return new Promise((resolve) => {
        // originalimagFile.value = files[0];
        if (/^image\/\w+/.test(f.type)) {
            const url = URL.createObjectURL(f);
            resolve(url);
        }
    });
};
export const generateimageFileName = (prefix: string | undefined = undefined) => {
    return `${prefix ? prefix : 'gd5'}_${getCurrentTimestamp()}.jpg`;
};
export const downloadURI = async (url: string, fileName: string) => {
    const image = await fetch(url);
    const imageBlog = await image.blob();
    const imageURL = URL.createObjectURL(imageBlog);

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
export const getFileNameFromResponse = (axiosResponse: any) => {
    if (!axiosResponse) {
        return undefined;
    }
    const contentDisposition = axiosResponse.headers['content-disposition'];
    let fileName = contentDisposition;
    if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+)"/);
        if (match && match[1]) {
            fileName = match[1];
        }
    }
    return fileName;
};

export const getExtensionFromFileName = (filename: string) => {
    const dotIndex = filename.lastIndexOf('.');
    if (dotIndex === -1) {
        return '';
    }
    return filename.substring(dotIndex); // includes the dot
}
export const getExtensionFromFileManager = (file: FileManager) => {

    let fileExtension = getFileExtension(file.fileMime)
    if (!fileExtension) {
        fileExtension = getExtensionFromFileName(file.filePath)
    }
    return fileExtension;
}

export const getFileTypeIconFromFileName = (filename: string) => {
    const ext = getExtensionFromFileName(filename);
    if (!ext) {
        return 'hugeicons:file-empty-02';
    }

    return getFileTypeIconNuxt(ext);
}
export const getFileTypeIconFromFileManager = (file: FileManager) => {

    let fileExtension = getFileExtension(file.fileMime)
    if (!fileExtension) {
        fileExtension = getExtensionFromFileName(file.filePath)
    }

    if (!fileExtension) {
        return 'hugeicons:file-empty-02';
    }

    return getFileTypeIconNuxt(fileExtension);
}
export const getFileExtension = (t: string): string | undefined => {

    if (!t) {
        return undefined;
    }

    let mimeType = t.split(';')[0];
    if (!mimeType) {
        return undefined;
    }
    mimeType = mimeType.toLowerCase();
    let extension;
    switch (mimeType) {
        case 'pdf':
        case 'application/pdf':
            extension = '.pdf';
            break;
        case 'xls':
        case 'application/vnd.ms-excel':
            extension = '.xls';
            break;
        case 'xlsx':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            extension = '.xlsx';
            break;
        case 'application/msword':
        case 'doc':
            extension = '.doc';
            break;
        case 'docx':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
            extension = '.docx';
            break;
        case 'ppt':
        case 'application/vnd.ms-powerpoint':
            extension = '.docx';
            break;
        case 'pptx':
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        case 'vnd.openxmlformats-officedocument.presentationml.presentation':
            extension = '.pptx';
            break;
        case 'image/png':
            extension = '.png';
            break;
        case 'image/jpeg':
            extension = '.jpg';
            break;
        case 'image/gif':
            extension = '.gif';
            break;
        case 'application/zip':
        case 'application/x-zip-compressed':
            extension = '.zip';
            break;
        case 'application/vnd.rar':
        case 'application/x-rar':
        case 'x-rar':
            extension = '.rar';
            break;
        case 'video/mp4':
        case 'video/mpeg4':
            extension = '.mp4';
            break;
        case 'video/webm':
            extension = '.webm';
            break;
        case 'video/ogg':
        case 'application/ogg':
            extension = '.ogv';
            break;
        case 'video/x-msvideo':
            extension = '.avi';
            break;
        case 'video/quicktime':
            extension = '.mov';
            break;
        case 'video/x-matroska':
        case 'video/mkv':
            extension = '.mkv';
            break;
        case 'video/x-flv':
            extension = '.flv';
            break;
        case 'video/3gpp':
            extension = '.3gp';
            break;
        case 'video/3gpp2':
            extension = '.3g2';
            break;
        default:
            extension = undefined;
            break;
    }
    return extension;
};
export const getFileType = (t: string): FileType | undefined => {

    if (!t) {
        return undefined;
    }

    const mimeType = t.toLowerCase();
    let type: FileType | undefined = undefined;
    switch (mimeType) {
        case 'pdf':
        case 'application/pdf':
            type = 'pdf';
            break;
        case 'application/x-tika-ooxml':
        case 'application/x-tika-msoffice':
            type = 'msoffice'
            break
        case 'xls':
        case 'xlsx':
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            type = 'msexcel';
            break;
        case 'doc':
        case 'docx':
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
            type = 'msword';
            break;
        case 'ppt':
        case 'pptx':
        case 'application/vnd.ms-powerpoint':
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        case 'vnd.openxmlformats-officedocument.presentationml.presentation':
            type = 'mspowerpoint';
            break;
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'png':
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
        case 'image/webp':
            type = 'image';
            break;
        case 'video/mpeg':
        case 'video/mp4':
        case 'video/quicktime':
        case 'video/x-msvideo':
        case 'video/webm':
        case 'video/ogg':
        case 'application/ogg':
        case 'video/x-matroska':
        case 'video/mkv':
        case 'video/x-flv':
        case 'video/3gpp':
        case 'video/3gpp2':
            type = 'video';
            break;
        case 'application/zip':
        case 'application/x-zip-compressed':
        case 'application/x-rar':
        case 'application/vnd.rar':
        case 'x-rar':
            type = 'zip';
            break;
        default:
            type = 'unknown';
            break;
    }
    return type;
};
export const getFileTypeIcon = (t: string) => {
    if (!t) {
        return '';
    }
    const type = t.toLowerCase();
    let icon = '';
    switch (type) {
        case 'pdf':
        case 'application/pdf':
            icon = biFiletypePdf;
            break;
        case 'xls':
        case 'xlsx':
        case '.xls':
        case '.xlsx':
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            icon = biFiletypeXlsx;
            break;
        case 'doc':
        case 'docx':
        case '.doc':
        case '.docx':
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
            icon = biFileWord;
            break;
        case 'ppt':
        case 'pptx':
        case '.ppt':
        case '.pptx':
        case 'application/vnd.ms-powerpoint':
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        case 'vnd.openxmlformats-officedocument.presentationml.presentation':
            icon = biFileEarmarkPpt;
            break;
        case 'jpg':
        case 'jpeg':
        case 'gif':
        case 'png':
        case '.jpg':
        case '.jpeg':
        case '.gif':
        case '.png':
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
        case 'image/webp':
            icon = biFileEarmarkImage;
            break;
        case 'application/zip':
        case 'application/x-zip-compressed':
        case 'application/x-rar':
        case 'application/vnd.rar':
        case 'x-rar':
        case 'rar':
        case '.rar':
        case 'zip':
        case '.zip':
            icon = biFileEarmarkZip;
            break;
        case 'video/mpeg':
        case 'video/mp4':
        case 'video/quicktime':
        case 'video/x-msvideo':
        case 'video/webm':
            icon = biFilm;
            break;
        default:
            icon = biFileEarmark;
            break;
    }
    return icon;
};
export const getFileTypeIconNuxt = (t: string) => {
    if (!t) {
        return '';
    }
    const type = t.toLowerCase();
    let icon = '';
    switch (type) {
        case 'pdf':
        case '.pdf':
        case 'application/pdf':
            icon = 'vscode-icons:file-type-pdf2';
            break;
        case 'xls':
        case '.xls':
        case 'xlsx':
        case '.xlsx':
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        case 'vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            icon = 'vscode-icons:file-type-excel';
            break;
        case 'doc':
        case '.doc':
        case 'docx':
        case '.docx':
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'vnd.openxmlformats-officedocument.wordprocessingml.document':
            icon = 'vscode-icons:file-type-word';
            break;
        case 'ppt':
        case '.ppt':
        case 'pptx':
        case '.pptx':
        case 'application/vnd.ms-powerpoint':
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        case 'vnd.openxmlformats-officedocument.presentationml.presentation':
            icon = 'vscode-icons:file-type-powerpoint';
            break;
        case 'jpg':
        case '.jpg':
        case 'jpeg':
        case '.jpeg':
        case 'gif':
        case '.gif':
        case 'png':
        case '.png':
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
        case 'image/webp':
            icon = 'vscode-icons:file-type-image';
            break;
        case 'zip':
        case '.zip':
        case 'rar':
        case '.rar':
        case 'application/zip':
        case 'application/x-zip-compressed':
        case 'application/x-rar':
        case 'application/vnd.rar':
        case 'x-rar':
            icon = 'vscode-icons:file-type-zip';
            break;
        case '.mp4':
        case '.webm':
        case '.ogv':
        case '.avi':
        case '.mov':
        case '.mkv':
        case '.flv':
        case '.3gp':
        case '.3g2':
        case 'video/mpeg':
        case 'video/mp4':
        case 'video/quicktime':
        case 'video/x-msvideo':
        case 'video/webm':
        case 'video/ogg':
        case 'application/ogg':
        case 'video/x-matroska':
        case 'video/mkv':
        case 'video/x-flv':
        case 'video/3gpp':
        case 'video/3gpp2':
            icon = 'vscode-icons:file-type-video';
            break;
        case 'directory':
            icon = 'vscode-icons:default-folder';
            break;
        default:
            icon = 'hugeicons:file-empty-02';
            break;
    }
    return icon;
};
export const blobToFile = (
    b: Blob,
    originalFileName: string
): Promise<File> => {
    return new Promise((resolve) => {
        const file = new File([b as any], originalFileName, {
            type: b.type,
            lastModified: Date.now(),
        });
        resolve(file);
    });
};
export const isImageFile = (f: File) => {
    if (!f) {
        return false;
    }
    return /^image\/\w+/.test(f.type);
};
export const captureFrameFromVideo = (video: HTMLVideoElement, time: number): Promise<string> => {
    return new Promise((resolve, reject) => {
        video.currentTime = time
        video.onseeked = () => {
            const canvas = document.createElement("canvas")
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const ctx = canvas.getContext("2d")
            if (!ctx) return reject("No ctx")

            ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
            resolve(canvas.toDataURL("image/jpeg"))
        }
        video.onerror = (err) => reject(err)
    })
}