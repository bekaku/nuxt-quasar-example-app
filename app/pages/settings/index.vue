<script setup lang="ts">
import FileManagerService from '~/api/FileManagerService';
import UserService from '~/api/UserService';
import { biPencilFill, biPencil } from '@quasar/extras/bootstrap-icons';
import type { UserPersonalEditRequest } from '~/types/models';
definePageMeta({
    pageName: 'page.settingsPublicProfile',
})
useInitPage();
const { t } = useLang();
const { appLoading } = useBase();
const { uploadApi } = FileManagerService();
const { updateUserAvatar, updateUserCover } = UserService();
const { required } = useValidation();
const authenStore = useAuthenStore();
const showAvatarCroper = ref(false);
const showCoverCroper = ref(false);
const coverPreviewImage = ref<string | undefined>(undefined);

const entityPersonal = ref<UserPersonalEditRequest>({
    fullName: '',
    positionName: '',
    teamLeaderName: '',
    autoFollowUser: true,
    initialConfig: true,
});
const onUpdateAvatar = async (f: any) => {
    console.log('onUpdateAvatar', f);
    appLoading();
    const response = await uploadApi(f);
    if (response && authenStore.auth && response.id) {
        //update avatar id to user
        await updateUserAvatar(response.id);
        //update user data in pinia store
        const authItem = authenStore.auth;
        if (authItem.avatar) {
            authItem.avatar.thumbnail = response.fileThumbnailPath;
            authItem.avatar.image = response.filePath;
        }
    }
    appLoading(false);
    showAvatarCroper.value = false;
};
const onOpenCropper = () => {
    showAvatarCroper.value = true;
};
const onOpenCropperCover = () => {
    showCoverCroper.value = true;
};
const onCoverCropend = (imgPreview: string) => {
    if (imgPreview) {
        coverPreviewImage.value = imgPreview;
    }

}
const onUploadCover = async (f: any) => {
    console.log('onUploadCover', f);
    appLoading();
    const response = await uploadApi(f);
    if (response && authenStore.auth && response.id) {
        //update cover id to user
        await updateUserCover(response.id);
        //update user data in pinia store
        const authItem = authenStore.auth;
        authItem.cover = {
            thumbnail: response.fileThumbnailPath,
            image: response.filePath,
        };
    }
    appLoading(false);
    showCoverCroper.value = false;
    coverPreviewImage.value = undefined;
};
// const coverStyle = computed(() => {
//     return `height: 175px;
//             background: url(${authenStore.loginedCover ? authenStore.loginedCover : '/cover.jpg'}), linear-gradient(to right, #000, #000);
//             background-position: center;
//             -webkit-background-size: cover;
//             -moz-background-size: cover;
//             -o-background-size: cover;
//             background-size: cover;`;
// });

const canSubmitUdatePrivateData = computed(() => {
    return entityPersonal.value.fullName && entityPersonal.value.fullName.length >= 4;
});
const onUpdatePrivateData = () => {
    console.log('onUpdatePrivateData', entityPersonal.value);
}
</script>
<template>
    <SettingLayout>
        <template #content>
            <QuasarCard class="q-px-md">
                <q-card-section>
                    <div class="text-h6">{{ t('base.editPhoto') }}</div>
                </q-card-section>
                <q-card-section>
                    <!-- <q-card v-if="authenStore.auth" class="shadow-up-5">
                        <div :style="coverStyle" />
                        <div class="text-white absolute-right q-pa-md">
                            <QuasarButton round unelevated color="pink" :icon="biPencilFill"
                                @click="onOpenCropperCover">
                                <q-tooltip>{{ t('base.changeCover') }}</q-tooltip>
                            </QuasarButton>
                        </div>

                        <div class="text-white absolute-center">
                            <q-avatar size="120px" style="top: 75px" class="shadow-5">
                                <q-img spinner-color="white" :src="authenStore.loginedAvatar" />
                                <div class="absolute-bottom" style="top: 55px">
                                    <QuasarButton round :icon="biPencilFill" color="pink" @click="onOpenCropper">
                                        <q-tooltip>{{ t('base.changeAvatar') }}</q-tooltip>
                                    </QuasarButton>
                                </div>
                            </q-avatar>
                        </div>
                    </q-card> -->
                    <LazyUserCard v-if="authenStore.auth" :avatar-image="authenStore.auth?.avatar?.image"
                        :cover-image="authenStore.loginedCover" :name="authenStore.loginedDisplay"
                        :description="t('app.name')" height="250px" avatar-top="110px"
                        description-style="margin-top:35px" class="shadow-up-5">
                        <template #extra>
                            <div class="text-white absolute-right q-pa-md">
                                <QuasarButton round unelevated color="pink" :icon="biPencilFill"
                                    @click="onOpenCropperCover">
                                    <q-tooltip>{{ t('base.changeCover') }}</q-tooltip>
                                </QuasarButton>
                            </div>
                            <div class="text-white absolute-center">
                                <div class="absolute-bottom" style="top: 55px">
                                    <QuasarButton round :icon="biPencilFill" color="pink" @click="onOpenCropper">
                                        <q-tooltip>{{ t('base.changeAvatar') }}</q-tooltip>
                                    </QuasarButton>
                                </div>
                            </div>
                        </template>
                    </LazyUserCard>
                </q-card-section>
                <q-separator />
                <q-card-section>
                    <div class="text-h6">{{ t('base.privateData') }}</div>
                    <q-form @submit="onUpdatePrivateData">
                        <div class="row">
                            <div class="col-12 col-md-6 q-pa-md">
                                <QuasarInput v-model="entityPersonal.fullName" :label="t('base.editName')"
                                    :rules="[required]" />
                            </div>
                            <div class="col-12 col-md-6 q-pa-md">
                                <QuasarInput v-model="entityPersonal.positionName"
                                    :label="t('model.user_data.positionName')" :rules="[required]" />
                            </div>
                        </div>
                        <div class="col-12 col-md-12 q-pa-md">
                            <QuasarToggle v-model="entityPersonal.autoFollowUser" :label="t('base.other')" />
                        </div>
                        <q-card-actions align="right">
                            <QuasarButton :disable="!canSubmitUdatePrivateData" unelevated color="primary"
                                :icon="biPencil" :label="t('base.okay')" type="submit" />
                        </q-card-actions>
                    </q-form>
                </q-card-section>
            </QuasarCard>
        </template>
        <BaseImageCropper :title="t('cropAvatar')" :dialog="showAvatarCroper" @on-okay="onUpdateAvatar"
            @on-close="showAvatarCroper = false" />
        <BaseImageCropper :title="t('base.changeCover')" :dialog="showCoverCroper" :ratio="16 / 9"
            @on-close="showCoverCroper = false" @on-cropend="onCoverCropend" @on-okay="onUploadCover">
            <template #preview>
                <!-- <q-card-section style="min-height: 450px;">
                    <q-card v-if="authenStore.auth" class="shadow-up-5">
                        <div :style="coverPreviewStyle" />
                        <div class="text-white absolute-center">
                            <q-avatar size="120px" style="top: 75px" class="shadow-5">
                                <q-img spinner-color="white" :src="authenStore.loginedAvatar" />
                            </q-avatar>
                        </div>
                    </q-card>
                </q-card-section> -->
                <LazyUserCard v-if="authenStore.auth && coverPreviewImage"
                    :avatar-image="authenStore.auth?.avatar?.image" :cover-image="coverPreviewImage"
                    :name="authenStore.loginedDisplay" :description="t('app.name')" height="250px" avatar-top="110px"
                    avatar-flat flat description-style="margin-top:35px" />
            </template>
        </BaseImageCropper>
    </SettingLayout>
</template>