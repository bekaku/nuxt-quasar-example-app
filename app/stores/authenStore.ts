import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { IMenu, LoginedProfileItem } from '~/types/common';
import type { UserDto } from '~/types/models';

export const useAuthenStore = defineStore('authenStore', () => {
    const auth = ref<UserDto | undefined>(undefined);
    const loginedItems = ref<LoginedProfileItem[]>([]);
    const alreadyFetchLoginedProfile = ref<boolean>(false);
    const drawers = ref<IMenu[]>([]);
    const loginedCover = computed(() => auth.value?.cover?.image);
    const loginedAvatar = computed(() => auth.value?.avatar?.image);
    const loginedDisplay = computed(() => auth.value?.username
        ? auth.value?.username
        : auth.value?.email);

    const setAuthen = (item: UserDto) => {
        auth.value = item;
    };
    const setLoginedItems = (items: LoginedProfileItem[]) => {
        loginedItems.value = items;
    }
    const setFetchLoginedProfile = (status: boolean) => {
        alreadyFetchLoginedProfile.value = status;
    }
    const onLogout = () => {
        auth.value = undefined;
        return new Promise((resolve) => resolve(true));
    };

    return {
        auth,
        loginedCover,
        loginedAvatar,
        loginedDisplay,
        setAuthen,
        onLogout,
        drawers,
        loginedItems,
        setLoginedItems,
        alreadyFetchLoginedProfile,
        setFetchLoginedProfile
    };

});
