import FileManagerService from "~/api/FileManagerService";
import type { UploadStatus } from "~/types/common";
import type { FileManager, FileManagerMetaData, FileUploadChunkResponse } from "~/types/models";
export const useFileUpload = (options?: {
    chunkSize?: number;
    maxRetries?: number;
}) => {
    const { uploadChunkApi, mergeChunkApi } = FileManagerService();
    const files = ref<FileManager[]>([])
    const uploading = ref(false)
    const progress = ref(0)
    const status = ref<UploadStatus>();
    const chunkSize = ref<number>(options?.chunkSize || (1 * 1024 * 1024)); // 1 MB
    const maxRetries = ref<number>(options?.maxRetries || 3);

    // Track uploaded chunks for resume support
    const uploadedChunks = new Set<number>()
    const chunkFileName = ref<string>('');
    const currentFileIndex = ref(0)

    const onChunkUploadClear = () => {
        chunkFileName.value = '';
        progress.value = 0;
        status.value = undefined;
        uploadedChunks.clear()
    }
    const onUploadChunkProcess = async (chunk: Blob, index: number, total: number, filename: string): Promise<FileUploadChunkResponse | null> => {
        for (let attempt = 1; attempt <= maxRetries.value; attempt++) {
            try {
                const response = await uploadChunkApi(chunk, index, total, filename, chunkFileName.value)
                uploadedChunks.add(index)
                if (response && response.filename) {
                    chunkFileName.value = response.filename
                }
                return response
            } catch (err) {
                console.warn(`Chunk ${index} failed (attempt ${attempt})`)
                await new Promise(res => setTimeout(res, 1000)) // wait before retry
            }
        }
        return {
            status: false
        }
    }

    const onUploadChunk = async (selectedFile: File, setProgress: boolean = true,
        fileMetaData: FileManagerMetaData | undefined = undefined): Promise<FileManager | null> => {
        if (!selectedFile) {
            return new Promise(resolve => resolve(null))
        }
        onChunkUploadClear()
        const totalChunks = Math.ceil(selectedFile.size / chunkSize.value)
        const filename = selectedFile.name
        for (let chunkIndex = 1; chunkIndex <= totalChunks; chunkIndex++) {
            if (uploadedChunks.has(chunkIndex)) continue // skip if already uploaded

            const start = (chunkIndex - 1) * chunkSize.value
            const end = Math.min(start + chunkSize.value, selectedFile.size)
            const chunk = selectedFile.slice(start, end)
            console.log('Uploading chunk', chunkIndex, 'of', totalChunks)
            const response = await onUploadChunkProcess(chunk, chunkIndex, totalChunks, filename)
            if (!response || response.status == false) {
                console.warn(`Upload failed at chunk ${chunkIndex}`)
                if (setProgress) {
                    await setDownloadProgress(currentFileIndex.value, 'FAILED', false);
                }
                return new Promise(resolve => resolve(null))
            }
            // progress.value = chunkIndex / totalChunks
            if (setProgress) {
                const progressPercent = chunkIndex / totalChunks
                await setDownloadProgress(currentFileIndex.value, 'UPLOADING', true, progressPercent);
            }
        }
        // Merge request
        try {
            const response = await mergeChunkApi({
                chunkFilename: chunkFileName.value,
                fileMime: null,
                totalChunks: totalChunks,
                originalFilename: filename,
                resizeImage: true,
                thumbnailFileId: fileMetaData?.thumbnailFileId || null,
                duration: fileMetaData?.duration || 0,
                title: fileMetaData?.title || null,
                description: fileMetaData?.description || null,
                width: fileMetaData?.width || 0,
                height: fileMetaData?.height || 0,
                hidden: fileMetaData?.hidden || false
            })
            if (response && response.id) {
                console.info('Merge complete')
                if (setProgress) {
                    await setDownloadProgress(currentFileIndex.value, 'COMPLETED', false);
                }
                return new Promise(resolve => resolve(response))
            }
        } catch (e) {
            console.warn('Merge failed', e)
            if (setProgress) {
                await setDownloadProgress(currentFileIndex.value, 'FAILED', false);
            }
            return new Promise(resolve => resolve(null))
        }
        return new Promise(resolve => resolve(null))
    }

    const setDownloadProgress = (index: number, statusParam: UploadStatus, uploading: boolean, progressParam?: number | undefined): Promise<void> => {
        const item = files.value[index]
        if (item && item.uploadProgress) {
            item.uploadProgress = {
                progress: progressParam || item.uploadProgress.progress,
                uploading: uploading,
                status: statusParam
            }
            files.value[index] = item
        }
        if (progressParam != undefined) {
            progress.value = progressParam;
        }
        status.value = statusParam
        return Promise.resolve();
    }
    const setDownloadStatus = (): Promise<void> => {
        const item = files.value[currentFileIndex.value]
        if (item) {
            item.uploadProgress = {
                progress: 0,
                uploading: true,
                status: 'UPLOADING',
                uploadData: null
            }
            files.value[currentFileIndex.value] = item
        }
        return Promise.resolve();
    }
    const checkAlreadyUpload = (index: number): Promise<boolean> => {
        const item = files.value[index]
        if (item) {
            return Promise.resolve(item.uploadProgress != undefined)
        }

        return Promise.resolve(false)
    }
    const onStartUploadChunk = async () => {
        if (files.value && files.value.length > 0) {
            uploading.value = true
            const fileItems = files.value;
            let fileMetaData: FileManagerMetaData | undefined = undefined;
            for (let index = 0; index < fileItems.length; index++) {
                const isAlreadyUpload = await checkAlreadyUpload(index);
                console.log('isAlreadyUpload : index > ', index, isAlreadyUpload);
                if (isAlreadyUpload) {
                    continue;
                }
                console.log('Uploading file', index, 'of', fileItems.length);
                const f = fileItems[index];
                if (f && f.file) {
                    fileMetaData = undefined;
                    currentFileIndex.value = index;
                    await setDownloadStatus();
                    // if upload video file
                    if (f.thumbnailFile) {
                        console.log('start upload thumbnail');
                        const videoResponse = await onUploadChunk(f.thumbnailFile, false, { hidden: true });
                        console.log('videoResponse', videoResponse);
                        if (videoResponse && videoResponse.id) {
                            fileMetaData = {
                                thumbnailFileId: videoResponse.id,
                                duration: f.duration || 0,
                                title: f.title || null,
                                description: f.description || null,
                                width: f.width || 0,
                                height: f.height || 0,
                            }
                            console.log('Upload video thumbnail chunk and merged complete');
                        }
                    }
                    console.log('start upload chunk:', fileMetaData);
                    const response = await onUploadChunk(f.file, true, fileMetaData);
                    if (response) {
                        console.log('Upload chunk and merged complete');
                    }
                }
            }
            uploading.value = false
        }
    }

    return {
        onStartUploadChunk,
        onUploadChunk,
        files,
        uploading,
        status,
        progress,
        chunkSize
    }
}