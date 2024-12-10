import { useStorage } from '@vueuse/core';
export const useCache = () => {
    const latestSyncActiveStatus = useStorage<number>('latestSyncActive', 0);
    return {
        latestSyncActiveStatus
    }
}