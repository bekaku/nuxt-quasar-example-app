import { CropperCanvas, CropperImage, CropperShade, CropperHandle, CropperSelection, CropperGrid, CropperCrosshair, CropperViewer } from 'cropperjs';
export default defineNuxtPlugin((nuxtApp) => {
    CropperCanvas.$define();
    CropperImage.$define();
    CropperShade.$define();
    CropperHandle.$define();
    CropperSelection.$define();
    CropperGrid.$define();
    CropperCrosshair.$define();
    CropperViewer.$define();
})