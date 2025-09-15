export interface DownloadConfig {
    url: string
    filename: string
    chunkSize?: number
    downloadable?: boolean
    historyable?: boolean
}

export interface StreamConfig {
    recordCount: number
}

export interface DownloadProgress {
    visible: boolean
    loaded: number
    total: number
    percentage: number
    speed: string
    startTime: number | null
}

export interface DownloadHistoryItem {
    id: number
    src?: string
    type?: string
    filename: string
    size: number
    status: 'completed' | 'failed' | 'cancelled'
    duration: number
    timestamp: string
    error?: string
}

import type { Ref } from 'vue'
import type { AxiosProgressEvent, CancelTokenSource } from 'axios'
import axios from 'axios'
export const useFileDownload = (options?: {
    chunkSize?: number;
    maxRetries?: number;
}) => {
    const { $axios } = useNuxtApp()
    const { cdnBase } = useConfiguration();
    const chunkSize = options?.chunkSize || 8192; // 8192 KB
    const isDownloading = ref(false)
    const error: Ref<string | null> = ref(null)
    const cancelTokenSource: Ref<AbortController | null> = ref(null)
    const downloadHistory: Ref<DownloadHistoryItem[]> = ref([])
    const downloadProgress = reactive<DownloadProgress>({
        visible: false,
        loaded: 0,
        total: 0,
        percentage: 0,
        speed: '0 B/s',
        startTime: null
    })
    const formatBytes = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes'
        const k = 1024
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    }
    const formatSpeed = (bytesPerSecond: number): string => {
        return formatBytes(bytesPerSecond) + '/s'
    }
    const startDownload = (): void => {
        isDownloading.value = true
        downloadProgress.visible = true
        downloadProgress.loaded = 0
        downloadProgress.total = 0
        downloadProgress.percentage = 0
        downloadProgress.speed = '0 B/s'
        downloadProgress.startTime = Date.now()
        error.value = null
    }
    const updateProgress = (progressEvent: AxiosProgressEvent): void => {
        const { loaded, total = 0 } = progressEvent

        downloadProgress.loaded = loaded
        downloadProgress.total = total

        if (total > 0) {
            downloadProgress.percentage = (loaded / total) * 100
        }

        // Calculate speed
        if (downloadProgress.startTime) {
            const elapsed = (Date.now() - downloadProgress.startTime) / 1000
            if (elapsed > 0) {
                const speed = loaded / elapsed
                downloadProgress.speed = formatSpeed(speed)
            }
        }
    }
    const endDownload = (): void => {
        isDownloading.value = false
        downloadProgress.visible = false
        cancelTokenSource.value = null
    }
    const saveBlob = (blob: Blob, filename: string, config: DownloadConfig): Promise<DownloadHistoryItem> => {
        const fileType = blob.type;
        //const fileBlobUrl = URL.createObjectURL(response.data);
        const url = window.URL.createObjectURL(blob)

        if (config.downloadable !== false) {
            const link = document.createElement('a')
            link.href = url
            link.download = filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        }

        // Add to history
        const duration = downloadProgress.startTime
            ? Date.now() - downloadProgress.startTime
            : 0

        const historyItem: DownloadHistoryItem = {
            id: Date.now(),
            type: fileType,
            src: url,
            filename,
            size: blob.size,
            status: 'completed',
            duration,
            timestamp: new Date().toISOString()
        }

        if (config.historyable !== false) {
            downloadHistory.value.unshift(historyItem)
            // Keep only last 10 downloads
            if (downloadHistory.value.length > 10) {
                downloadHistory.value = downloadHistory.value.slice(0, 10)
            }
        }
        return new Promise(resolve => resolve(historyItem));
    }
    const addFailedDownload = (filename: string, errorMessage: string): void => {
        const duration = downloadProgress.startTime
            ? Date.now() - downloadProgress.startTime
            : 0

        const historyItem: DownloadHistoryItem = {
            id: Date.now(),
            filename,
            size: 0,
            status: 'failed',
            duration,
            timestamp: new Date().toISOString(),
            error: errorMessage
        }

        downloadHistory.value.unshift(historyItem)
    }
    const downloadFile = async (config: DownloadConfig): Promise<DownloadHistoryItem | null> => {
        if (!config.filename) {
            throw new Error('Please enter a filename')
        }

        startDownload()
        cancelTokenSource.value = new AbortController();
        // $axios.defaults.baseURL = cdnBase;
        $axios.defaults.baseURL = '';
        try {
            const response = await $axios({
                method: "GET",
                url: config.url,
                params: {
                    chunkSize: config.chunkSize || chunkSize,
                },
                responseType: "blob",
                signal: cancelTokenSource.value.signal,
                onDownloadProgress: updateProgress,
                timeout: 0,
            });

            console.log('response', response)
            const downloadedItem = await saveBlob(response.data, config.filename, config);
            return new Promise((resolve) => resolve(downloadedItem))

        } catch (err: any) {
            if (axios.isCancel && axios.isCancel(err)) {
                error.value = "Download cancelled";
                addFailedDownload(config.filename, "Download cancelled");
            } else if (err.name === "CanceledError") {
                error.value = "Download cancelled";
                addFailedDownload(config.filename, "Download cancelled");
            } else {
                const errorMsg = err.response?.data?.message || err.message;
                error.value = `Download failed: ${errorMsg}`;
                addFailedDownload(config.filename, errorMsg);
            }
            return new Promise((resolve) => resolve(null))
            // throw err
        } finally {
            endDownload()
        }
    }
    const cancleDownload = (): void => {
        if (cancelTokenSource.value) {
            cancelTokenSource.value.abort()
        }
    }
    return {
        isDownloading,
        downloadProgress,
        downloadHistory,
        error,
        downloadFile,
        cancleDownload,
        formatBytes
    }
}