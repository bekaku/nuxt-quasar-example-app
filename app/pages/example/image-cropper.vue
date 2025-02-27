<script setup lang="ts">
import { getImgUrlFromFile } from '~/utils/fileUtil';
import { biPencilFill, biTrash } from '@quasar/extras/bootstrap-icons'
const { t } = useLang();
useHead({
    title: 'Image Cropper'
})
const showImageCroper = ref(false);
const cropedUrl = ref<string>();
const cropedFile = ref<any>();
const onCloseImageCropper = () => {
    showImageCroper.value = false;
};
const onDeleteFile = () => {
    cropedUrl.value = undefined;
    cropedFile.value = undefined;
}
const onCropImage = async (f: any) => {
    console.log('onCropImage', f);
    const imageUrl = await getImgUrlFromFile(f);
    if (imageUrl) {
        cropedUrl.value = imageUrl;
    }
    cropedFile.value = f;
};
</script>
<template>
    <BasePage class="content-limit">
        <BaseCard title="Image Cropper">
            <q-card-section>
                <div class="row">
                    <div class="col-12 col-md-4">
                        <q-item>
                            <q-item-section avatar top>
                                <q-avatar size="75px" rounded>
                                    <q-img v-if="cropedUrl" spinner-color="white" :src="cropedUrl" />
                                    <q-img v-else spinner-color="white" src="/images/no_picture_thumb.jpg" />
                                    <q-btn color="primary" round size="sm" unelevated style="left: 50px;"
                                        class="absolute-top" :icon="biPencilFill" @click="showImageCroper = true">
                                        <q-tooltip>{{ t('base.changeAvatar') }}</q-tooltip>
                                    </q-btn>
                                    <q-btn v-if="cropedFile != undefined" color="negative" round size="sm" unelevated
                                        style="left: 100px;" class="absolute-top" :icon="biTrash" @click="onDeleteFile">
                                        <q-tooltip>{{ t('base.delete') }}</q-tooltip>
                                    </q-btn>
                                </q-avatar>
                            </q-item-section>
                        </q-item>
                    </div>
                    <div class="col-12 col-md-8 q-pa-md">
                        <div class="q-gutter-sm">


                            <q-img v-if="cropedUrl == undefined" spinner-color="white" src="/images/no_picture.jpg" />
                            <template v-if="cropedUrl">
                                <base-image :src="cropedUrl" :ratio="1" alt="1"
                                    style="height: 250px; max-width: 250px" />

                                <base-image :src="cropedUrl" :ratio="4/3" alt="4/3"
                                    style="height: 250px; max-width: 250px" />

                                <base-image :src="cropedUrl" :ratio="16 / 9" alt="16/9"
                                    style="height: 250px; max-width: 250px" />

                                <p>cover</p>
                                <base-image :src="cropedUrl" fit="cover" alt="contain" />
                                <p>contain</p>
                                <base-image :src="cropedUrl" fit="contain" alt="contain" />
                                <p>fill</p>
                                <base-image :src="cropedUrl" fit="fill" alt="fill" />
                                <p>scale-down</p>
                                <base-image :src="cropedUrl" fit="scale-down" image-bg />
                            </template>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </BaseCard>

        <base-image-cropper :title="t('cropAvatar')" :dialog="showImageCroper" @on-close="onCloseImageCropper" @on-okay="onCropImage"/>
    </BasePage>
</template>
<style lang="scss" scoped></style>