import DOMPurify from 'dompurify';

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: { domPurify: DOMPurify },
    }
})