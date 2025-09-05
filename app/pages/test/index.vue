<script setup lang="ts">
import { biArrowLeft } from '@quasar/extras/bootstrap-icons'

const { t, locale, onSetLocale } = useLang()
useSeoMeta({
  title: 'Test Page'
})
definePageMeta({
  layout: 'empty'
})
const { getFavoriteMenuItems } = useMenu()
async function downloadPDF(url: any, filename : any) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const tempUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = tempUrl;
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(tempUrl);
    console.log(`Download of '${filename}' initiated successfully.`);

  } catch (error) {
    console.error('Error downloading the PDF:', error);
  }
}

// Example usage:
const pdfURL = 'https://drive.google.com/file/d/1xqKRsTS03pgPDTWmAfYZuz-4jV5nL3do/view';
const pdfFilename = 'dummy-file.pdf';

downloadPDF(pdfURL, pdfFilename);
</script>
<template>
  <BasePage>
    <BaseCard title="Test Page" subtitle="This is a test page">
      <template #start>
        <BaseButton :icon="biArrowLeft" round flat to="/" />
      </template>
      <q-card-section>
        <template v-if="getFavoriteMenuItems.length > 0">
          <BaseMenuItems :items="getFavoriteMenuItems"></BaseMenuItems>
        </template>
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>
