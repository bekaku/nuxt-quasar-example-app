import { FFmpeg } from "@ffmpeg/ffmpeg";
export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: { FFmpeg: FFmpeg },
    }
})