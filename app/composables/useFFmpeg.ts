import { ref, shallowRef } from 'vue'
import { fetchFile } from '@ffmpeg/util'
import type { FFmpeg } from '@ffmpeg/ffmpeg'
import type { CompressionResult, CompressionSettings, TrimOptions } from '~/types/common'

export function useFFmpeg() {
    const { $FFmpeg } = useNuxtApp()
    const ffmpeg = shallowRef<FFmpeg | null>(null)
    const isLoaded = ref(false)
    const isLoading = ref(false)
    const progress = ref(0)
    const logMessage = ref('')
    const error = ref('')
    const isCancelled = ref(false)
    const createdObjectUrls: string[] = []
    const cancel = async () => {
        if (!ffmpeg.value || !isLoading.value) {
            return
        }
        isCancelled.value = true
        try {
            ffmpeg.value.terminate()
        } catch {
            // terminate อาจ throw ถ้า worker ปิดไปแล้ว ไม่ต้อง handle
        }
        ffmpeg.value = null
        isLoaded.value = false
        isLoading.value = false
        progress.value = 0
        logMessage.value = ''
        error.value = 'Compression has been removed.'
    }
    const cleanup = () => {
        if (ffmpeg.value) {
            try {
                ffmpeg.value.terminate()
            } catch {
                // ignore
            }
            ffmpeg.value = null
        }
        isLoaded.value = false
        isLoading.value = false
        isCancelled.value = false
        progress.value = 0
        logMessage.value = ''
        error.value = ''

        // revoke object URLs ทั้งหมดที่เคยสร้าง
        createdObjectUrls.forEach(url => {
            try {
                URL.revokeObjectURL(url)
            } catch { /* ignore */ }
        })
        createdObjectUrls.length = 0
    }
    const load = async () => {
        if (isLoaded.value) {
            return
        }
        isLoading.value = true
        error.value = ''
        try {
            const instance = new $FFmpeg()
            instance.on('progress', ({ progress: p }) => {
                progress.value = Math.round(p * 100)
                console.log('ffmpeg > progress', progress.value)
            })
            instance.on('log', ({ message }) => {
                logMessage.value = message
                // console.log('ffmpeg > log', message)
            })
            // const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
            // await instance.load({
            //     coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            //     wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
            // })
            console.log('start load ffmpeg')
            await instance.load()
            console.log('after load ffmpeg')
            ffmpeg.value = instance
            isLoaded.value = true
        } catch (e) {
            error.value = `Failed to load FFmpeg: ${e instanceof Error ? e.message : String(e)}`
        } finally {
            isLoading.value = false
        }
    }

    const getResolutionFilter = (resolution: CompressionSettings['resolution']): string => {
        const map: Record<string, string> = {
            '1080p': 'scale=-2:1080',
            '720p': 'scale=-2:720',
            '480p': 'scale=-2:480',
            '360p': 'scale=-2:360',
            'original': '',
        }
        return map[resolution] || ''
    }
    const secondsToTimestamp = (seconds: number): string => {
        const h = Math.floor(seconds / 3600)
        const m = Math.floor((seconds % 3600) / 60)
        const s = (seconds % 60).toFixed(3)
        return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${s.padStart(6, '0')}`
    }

    const compress = async (
        file: File,
        settings: CompressionSettings,
        trim?: TrimOptions
    ): Promise<CompressionResult> => {
        console.log('compress', file, settings)
        const newUniqueId = generateSnowflakeID()
        const fileName = file.name || `video_${newUniqueId}.mp4`;
        const inputName = 'input.' + fileName.split('.').pop()
        const outputName = `output_${newUniqueId}.mp4`

        const args: string[] = []
        if (trim?.enabled) {
            args.push('-ss', trim.startTime.toString())
            args.push('-to', trim.endTime.toString())
        }
        args.push('-i', inputName)


        const vf = getResolutionFilter(settings.resolution)
        if (vf) {
            args.push('-vf', vf)
        }

        args.push(
            '-c:v', 'libx264',
            '-crf', String(settings.crf),
            '-preset', settings.preset,
            '-c:a', 'aac',
            '-b:a', settings.audioBitrate,
            '-movflags', '+faststart',
            '-y',
            outputName
        )
        console.log('compress before exec', args)
        const r = await execProcess(file, args, fileName, inputName, outputName)

        return r
    }

    const execProcess = async (file: File, args: string[], fileName: string, inputName: string, outputName: string): Promise<CompressionResult> => {
        if (!isLoaded.value) {
            await load()
        }

        if (!ffmpeg.value || !isLoaded.value) {
            throw new Error('FFmpeg is not loaded')
        }
        progress.value = 0
        error.value = ''
        isLoading.value = true

        await ffmpeg.value.writeFile(inputName, await fetchFile(file))
        console.log('compress before exec', args)

        await ffmpeg.value.exec(args)
        console.log('compress after exec')

        const data = await ffmpeg.value.readFile(outputName)
        const uint8 = data instanceof Uint8Array ? data : new TextEncoder().encode(data as string)
        const cleanBuffer = uint8.buffer.slice(uint8.byteOffset, uint8.byteOffset + uint8.byteLength) as ArrayBuffer
        const blob = new Blob([cleanBuffer], { type: 'video/mp4' })
        const finalFile = await blobToFile(blob, fileName)
        const url = URL.createObjectURL(blob)
        createdObjectUrls.push(url)

        try {
            await ffmpeg.value.deleteFile(inputName)
            await ffmpeg.value.deleteFile(outputName)
        } catch {
            // ถ้า ffmpeg ถูก terminate ไปแล้วจะ throw — ไม่ต้อง handle
        }

        const compressedSize = blob.size
        const reduction = ((file.size - compressedSize) / file.size) * 100
        isLoading.value = false
        return {
            file: finalFile,
            originalSize: file.size,
            compressedSize,
            reduction,
            url,
            name: fileName,
        }
    }

    const trim = async (file: File, trim?: TrimOptions): Promise<CompressionResult> => {
        if (!isLoaded.value) {
            await load()
        }
        const newUniqueId = generateSnowflakeID()
        const fileName = file.name || `video_${newUniqueId}.mp4`;
        const inputName = 'input.' + fileName.split('.').pop()
        const outputName = `output_${newUniqueId}.mp4`
        const start = trim?.startTime || 0
        const trimDuration = trim?.endTime || 0

        const r = await execProcess(file, [
            '-ss',
            start.toString(),
            '-t',
            trimDuration.toString(),
            '-i',
            inputName,
            '-c',
            'copy',
            outputName,
        ], fileName, inputName, outputName)
        // Read output
        if (r) {
            r.trimmedDuration = trim?.enabled ? trim.endTime - trim.startTime : undefined
        }
        return r
    }

    return {
        ffmpeg, isLoaded, isLoading, progress, logMessage, error, load, compress, trim,
        cancel,
        cleanup,
    }
}
