import { usePDF, VuePDF } from '@tato30/vue-pdf';
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('pdf-vue', VuePDF);
    return {
        provide: { usePDF: usePDF },
    }
})