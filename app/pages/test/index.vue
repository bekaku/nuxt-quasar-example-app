<script setup lang="ts">
import FileManagerService from '~/api/FileManagerService';

const { t, locale, onSetLocale } = useLang();
const test = ref();
useSeoMeta({
    title: 'Test Page'
})
const { fethCdnData } = FileManagerService();

const fetchImageFromServer = async () => {
    const response = await fethCdnData('/api/fileManager/files/stream?path=images/202502/1_1738834032363_35bb20615b61481dbca0a44c401e8d9b.jpg');
    console.log('response', response);
}
</script>
<template>
   <BasePage>
    <BaseButton label="Fetch Image from server" @click="fetchImageFromServer" />
   </BasePage>
</template>