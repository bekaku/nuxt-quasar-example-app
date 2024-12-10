<script setup lang="ts">
import {
    biArrowLeft,
    biArrowRight,
    biFilePdf,
    biDownload,
    biFloppy,
    biX,
    biZoomIn,
    biZoomOut
} from '@quasar/extras/bootstrap-icons';
import FileManagerService from '~/api/FileManagerService';
import { downloadFileFromUrl } from '~/utils/fileUtil';
const { src, title, showDownload = true, fetchToServer = false, isBlob = false, scrollHeight = '80vh', minHeight = '500px', minWidth = '100%', closeable = true } = defineProps<{
    title?: string;
    src: string;
    fetchToServer?: boolean;
    showDownload?: boolean
    isBlob?: boolean
    scrollHeight?: string
    minHeight?: string
    minWidth?: string
    closeable?: boolean
}>();
const { dark } = useQuasar();
const { fethCdnData, downloadCdnData } = FileManagerService();
const emit = defineEmits(['on-close']);
const { t } = useLang();
const show = defineModel('show', { type: Boolean, default: false });
const pdfSrc = ref<any>();
const loading = ref(true);
const downloadLoading = ref(false);
const fileName = ref();
const contentType = ref();
const scale = ref(1);
const page = ref(1);
const pages = ref(0);
onMounted(async () => {
    onLoad();
});
const onLoad = async () => {
    loading.value = true;
    if (fetchToServer) {
        const response = await fethCdnData(src, 'axiosresponse');
        if (response) {
            pdfSrc.value = await getBlobFromAxiosResponse(response);
            contentType.value = response.headers['content-type'];
            fileName.value = getFileNameFromAxiosResponse(response);
            loading.value = false;
        }
    } else {
        pdfSrc.value = src;
        loading.value = false;
    }
};
const downloadPdf = async () => {
    downloadLoading.value = true;
    if (fetchToServer) {
        await downloadCdnData(src, title);
    } else {
        if (isBlob) {
            try {
                downloadFromBlob(src, title || 'pdf_file.pdf');
            } catch (err) {
                console.error(err)
            }
        } else {
            downloadFileFromUrl(src, title || 'pdf_file.pdf');
        }
    }
    downloadLoading.value = false;
};
const onPageChange = (p: number) => {
    pages.value = p;
};
const onClose = () => {
    emit('on-close');
    show.value = false;
};
</script>
<template>
    <q-card flat>
        <q-toolbar>
            <q-toolbar-title v-if="title">
                {{title}}
            </q-toolbar-title>
            <q-btn flat round dense :icon="biZoomOut" @click="scale = scale > 0.25 ? scale - 0.25 : scale">
                <q-tooltip> Zoom-</q-tooltip>
            </q-btn>
            <span>{{ scale * 100 + '%' }}</span>
            <q-btn flat round dense :icon="biZoomIn" @click="scale = scale < 2 ? scale + 0.25 : scale">
                <q-tooltip> Zoom+</q-tooltip>
            </q-btn>
            <q-separator vertical class="q-mx-xs" />

            <q-btn @click="page = page > 1 ? page - 1 : page" flat dense round :icon="biArrowLeft">
            </q-btn>
            <span>{{ page }} / {{ pages }}</span>
            <q-btn @click="page = page < pages ? page + 1 : page" dense flat round :icon="biArrowRight">
            </q-btn>

            <q-space />
            <q-btn v-if="showDownload && !loading" @click="downloadPdf" dense flat round :icon="biDownload">
                <q-tooltip>
                    {{ t('base.download') }}
                </q-tooltip>
            </q-btn>
            <q-btn v-if="closeable" round @click="onClose" flat dense :icon="biX">
                <q-tooltip>
                    {{ t('base.close') }}
                </q-tooltip>
            </q-btn>
        </q-toolbar>
        <q-separator />
        <div :class="{ 'bg-black': dark.isActive, 'bg-grey-2': !dark.isActive }">
            <div :style="{ minHeight: minHeight, minWidth: minWidth }">
                <q-linear-progress v-if="downloadLoading" query color="primary" class="q-my-sm" style="height: 5px;" />
                <template v-if="loading">
                    <skeleton-item v-if="loading" :height="100" :text-number="3" flat show></skeleton-item>
                </template>
                <template v-else-if="pdfSrc">
                    <q-scroll-area :style="{ height: scrollHeight }">
                        <BasePdfViewCore :src="pdfSrc" v-model:scale="scale" v-model:page="page" v-model:pagess="pages">
                        </BasePdfViewCore>
                    </q-scroll-area>
                </template>
                <template v-else> Error</template>
            </div>
        </div>
    </q-card>
</template>