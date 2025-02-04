<script setup lang="ts">
import { biDisplay, biDot } from '@quasar/extras/bootstrap-icons';
import { mdiAndroid, mdiApple } from '@quasar/extras/mdi-v6';
import AuthenService from '~/api/AuthenService';
import UserService from '~/api/UserService';
import type { AccessTokenDto } from '~/types/models';
definePageMeta({
    pageName: 'page.settingsSecurity',
})
useInitPage();
const { appConfirm, appLoading, } = useBase();
const { formatDateTime } = useDateFns();
const { t, locale } = useLang();
const { signout } = useAuth();
const { selfUpdatePassword } = UserService();
const { removeAccessTokenSession } = AuthenService();
const currentPassword = ref<string>('');
const newPassword = ref<string>('');
const logoutAllDevice = ref(true);
const loading = ref(false);
const sessionList = ref<AccessTokenDto[]>([]);
const timeout = ref<any>(null);

const {
    firstLoaded,
    dataList,
    loadData,
    onNextPage,
    isInfiniteDisabled
} = usePagefecth<AccessTokenDto>({
    apiEndpoint: '/api/user/currentAuthSession',
    sortAble: false,
    itemsPerPage: 10,
});
onMounted(() => {
    loadData();
});
const onDeleteSession = async (index: number) => {
    const conf = await appConfirm(t('authSessions'), t('base.deleteConfirm'));
    if (conf) {
        const item = sessionList.value[index];
        if (item && item.id) {
            appLoading();
            const res = await removeAccessTokenSession(item.id);
            appLoading(false);
            if (res && res.status == 'OK') {
                sessionList.value.splice(index, 1);
            }
        }
    }
    return;
};

const onChangePassword = async () => {
    loading.value = true;
    const res = await selfUpdatePassword({
        password: currentPassword.value,
        newPassword: newPassword.value,
        logoutAllDevice: logoutAllDevice.value,
    });
    loading.value = false;
    if (res && res.status == 'OK') {
        timeout.value = setTimeout(() => {
            signout();
        }, 1500);
    }
};
const displayDate = (d: string) => {
    if (!d) {
        return '-';
    }
    return formatDateTime(d, FORMAT_DATETIME, locale.value);
};
onBeforeUnmount(() => {
    if (timeout.value) {
        clearTimeout(timeout.value);
        timeout.value = null;
    }
});
</script>
<template>
    <SettingLayout>
        <template #content>
            <BaseCard class="q-px-md">
                <q-card-section>
                    <div class="text-h6">{{ t('updatePassword') }}</div>
                    <q-separator />
                </q-card-section>
                <q-card-section>
                    <BasePasswordForm v-model:current-password="currentPassword" v-model:new-password="newPassword"
                        v-model:logout-all-device="logoutAllDevice" v-model:loading="loading" show-current-password
                        show-logout :submit-label="t('updatePassword')" action-align="left"
                        @on-submit="onChangePassword" />
                </q-card-section>

                <q-separator />
                <q-card-section>
                    <div class="text-h6">
                        {{ t('authSessions') }}
                    </div>
                </q-card-section>

                <LazyBaseSpinner v-if="!firstLoaded" />
                <q-list v-else>
                    <q-item-label header>{{ t('authSessionsHelp') }}</q-item-label>
                    <BaseVirtualScrollerRecycle id="scroll-acess-token-target-id" style="padding-bottom:65px"
                        :items="dataList" scroll-area-height="350px" :min-item-size="100">
                        <template #default="{ item, index, }">
                            <q-item :key="item.id">
                                <q-item-section avatar top>
                                    <q-icon :name="item.loginFrom == 'WEB'
                                        ? biDisplay
                                        : item.loginFrom == 'IOS'
                                            ? mdiApple
                                            : mdiAndroid
                                        " color="black" size="34px" />
                                </q-item-section>

                                <q-item-section top>
                                    <q-item-label lines="1">
                                        <span class="text-weight-medium">[{{ item.ipAddredd }}]</span>
                                        <span class="text-grey-8"> - {{ item.hostName }}</span>
                                        <span v-if="item.activeNow"><q-icon size="lg" :name="biDot"
                                                color="positive" /></span>
                                    </q-item-label>
                                    <q-item-label lines="1">
                                        {{ item.agent }}
                                    </q-item-label>
                                    <q-item-label lines="1" caption>
                                        {{
                                            t('lastestActive') +
                                            ' ' +
                                            displayDate(item.lastestActive || item.createdDate)
                                        }}
                                    </q-item-label>
                                </q-item-section>

                                <q-item-section top side>
                                    <div class="text-grey-8 q-gutter-xs">
                                        <q-btn class="gt-xs" size="12px" flat round icon="bi-trash"
                                            @click="onDeleteSession(index)">
                                            <q-tooltip>
                                                {{ t('base.delete') }}
                                            </q-tooltip>
                                        </q-btn>
                                    </div>
                                </q-item-section>
                            </q-item>
                            <q-separator />
                        </template>

                        <template #slotAfter>
                            <base-loadmore v-if="!isInfiniteDisabled" :loading="loading" :frist-loaded="firstLoaded"
                                :is-infinite-disabled="isInfiniteDisabled" :label="t('base.loadMore')" button show-icon
                                full-width @on-next-page="onNextPage" />
                        </template>
                    </BaseVirtualScrollerRecycle>
                </q-list>

            </BaseCard>
        </template>
    </SettingLayout>
</template>