import Plyr from 'plyr'
export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: { plyr: Plyr },
    }
})