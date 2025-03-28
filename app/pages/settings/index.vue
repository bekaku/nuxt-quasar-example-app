<script setup lang="ts">
import FileManagerService from '~/api/FileManagerService'
import UserService from '~/api/UserService'
import { biPencilFill, biPencil } from '@quasar/extras/bootstrap-icons'
import type { UserPersonalEditRequest } from '~/types/models'
definePageMeta({
  pageName: 'page.settingsPublicProfile'
})
useInitPage()
const { t } = useLang()
const { appLoading } = useBase()
const { uploadApi } = FileManagerService()
const { updateUserAvatar, updateUserCover } = UserService()
const { required } = useValidation()
const authenStore = useAuthenStore()
const showAvatarCroper = ref(false)
const showCoverCroper = ref(false)
const coverPreviewImage = ref<string | undefined>(undefined)

const entityPersonal = ref<UserPersonalEditRequest>({
  fullName: '',
  positionName: '',
  teamLeaderName: '',
  autoFollowUser: true,
  initialConfig: true
})
const onUpdateAvatar = async (f: any) => {
  console.log('onUpdateAvatar', f)
  appLoading()
  const response = await uploadApi(f)
  if (response && authenStore.auth && response.id) {
    //update avatar id to user
    await updateUserAvatar(response.id)
    //update user data in pinia store
    const authItem = authenStore.auth
    if (authItem.avatar) {
      authItem.avatar.thumbnail = response.fileThumbnailPath
      authItem.avatar.image = response.filePath
    }
  }
  appLoading(false)
  showAvatarCroper.value = false
}
const onOpenCropper = () => {
  showAvatarCroper.value = true
}
const onOpenCropperCover = () => {
  showCoverCroper.value = true
}
const onCoverCropend = (imgPreview: string) => {
  if (imgPreview) {
    coverPreviewImage.value = imgPreview
  }
}
const onCoverCropClose = () => {
  console.log('onCoverCropClose')
  coverPreviewImage.value = undefined
  showCoverCroper.value = false
}
const onUploadCover = async (f: any) => {
  console.log('onUploadCover', f)
  appLoading()
  const response = await uploadApi(f)
  if (response && authenStore.auth && response.id) {
    //update cover id to user
    await updateUserCover(response.id)
    //update user data in pinia store
    const authItem = authenStore.auth
    authItem.cover = {
      thumbnail: response.fileThumbnailPath,
      image: response.filePath
    }
  }
  appLoading(false)
  showCoverCroper.value = false
  coverPreviewImage.value = undefined
}
const canSubmitUdatePrivateData = computed(() => {
  return entityPersonal.value.fullName && entityPersonal.value.fullName.length >= 4
})
const onUpdatePrivateData = () => {
  console.log('onUpdatePrivateData', entityPersonal.value)
}
</script>
<template>
  <SettingLayout>
    <template #content>
      <BaseCard class="q-px-md">
        <q-card-section>
          <div class="text-h6">{{ t('base.editPhoto') }}</div>
        </q-card-section>
        <q-card-section>
          <LazyUserCard
            v-if="authenStore.auth"
            :avatar="{
              src: authenStore.auth?.avatar?.image
            }"
            :cover-image="authenStore.loginedCover"
            :name="authenStore.loginedDisplay"
            :description="t('app.name')"
            height="250px"
            avatar-top="110px"
            :description-style="{ marginTop: '35px' }"
          >
            <template #extra>
              <div class="text-white absolute-right q-pa-md">
                <BaseButton
                  round
                  unelevated
                  color="pink"
                  :icon="biPencilFill"
                  @click="onOpenCropperCover"
                >
                  <BaseTooltip>{{ t('base.changeCover') }}</BaseTooltip>
                </BaseButton>
              </div>
              <div class="text-white absolute-center">
                <div class="absolute-bottom" style="top: 55px">
                  <BaseButton round :icon="biPencilFill" color="pink" @click="onOpenCropper">
                    <BaseTooltip>{{ t('base.changeAvatar') }}</BaseTooltip>
                  </BaseButton>
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
                <BaseInput
                  v-model="entityPersonal.fullName"
                  :label="t('base.editName')"
                  :rules="[required]"
                />
              </div>
              <div class="col-12 col-md-6 q-pa-md">
                <BaseInput
                  v-model="entityPersonal.positionName"
                  :label="t('model.user_data.positionName')"
                  :rules="[required]"
                />
              </div>
            </div>
            <div class="col-12 col-md-12 q-pa-md">
              <BaseCheckbox v-model="entityPersonal.autoFollowUser" :label="t('base.other')" />
            </div>
            <q-card-actions align="right">
              <BaseButton
                :disable="!canSubmitUdatePrivateData"
                unelevated
                color="primary"
                :icon="biPencil"
                :label="t('base.okay')"
                type="submit"
              />
            </q-card-actions>
          </q-form>
        </q-card-section>
      </BaseCard>
    </template>
    <BaseImageCropperDialog
      v-model="showAvatarCroper"
      :title="t('cropAvatar')"
      @on-submit="onUpdateAvatar"
      @on-close="showAvatarCroper = false"
    />
    <BaseImageCropperDialog
      v-model="showCoverCroper"
      :title="t('base.changeCover')"
      :ratio="16 / 9"
      @on-close="onCoverCropClose"
      @on-cropend="onCoverCropend"
      @on-submit="onUploadCover"
    >
      <template #preview>
        <LazyUserCard
          v-if="authenStore.auth && coverPreviewImage"
          :avatar="{
            src: authenStore.auth?.avatar?.image
          }"
          :cover-image="coverPreviewImage"
          :name="authenStore.loginedDisplay"
          :description="t('app.name')"
          height="250px"
          avatar-top="110px"
          avatar-flat
          flat
          :description-style="{ marginTop: '35px' }"
        />
      </template>
    </BaseImageCropperDialog>
  </SettingLayout>
</template>
