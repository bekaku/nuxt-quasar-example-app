<script setup lang="ts">
import { biCopy } from '@quasar/extras/bootstrap-icons';
const { t } = useLang();
useHead({
    title: 'useBase'
})
const { appLoading, appToast, appConfirm, writeToClipboard, appNavigateTo } = useBase();
const textModel = ref<string>('Text to copy');
const confirm = async () => {
    const conf = await appConfirm(t('app.monogram'), t('base.deleteConfirm'));
    if (conf) {
        appToast('Confirm', { type: 'positive', multiLine: false });
    } else {
        appToast('Cancel', { type: 'negative', multiLine: false });
    }
};
const confirm2 = async () => {
    const conf = await appConfirm(
        t('app.monogram'),
        t('base.deleteConfirm'),
        {
            textColor: 'white',
            flat: false,
            noCaps: true,
            color: 'positive',
            label: 'Acknowledge',
        },
        {
            textColor: 'white',
            flat: false,
            color: 'negative',
            label: 'Just text',
            noCaps: true,
        },
    );
    console.log('confirm2',conf);
};
const loader = () => {
    appLoading();
    setTimeout(() => {
        appLoading(false);
    }, 3000);
};
const toaster = () => {
    appToast('this is a toast', {
        avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
        multiLine: false,
        color: 'primary',
        timeout: 5000,
        position: 'bottom-left',
        caption: 'This is a caption of this toast'
    });
};
const onCopyText = async () => {
    await writeToClipboard(textModel.value);
};
</script>
<template>
    <BasePage>
        <BaseCard>
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> useBase </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section class="q-gutter-md">
                <BaseButton label="show loading" color="primary" outline unelevated @click="loader" />
                <BaseButton label="show toast" color="warning" @click="toaster" />
                <BaseButton label="show confirm" color="negative" @click="confirm" />
                <BaseButton label="show confirm Custom Btn" @click="confirm2" />
                <BaseButton label="Navigate to" outline @click="appNavigateTo('/example/image-view')" />
                <BaseInput v-model="textModel" style="width: 250px">
                    <template #append>
                        <BaseButton flat round :icon="biCopy" @click="onCopyText" />
                    </template>
                </BaseInput>
            </q-card-section>
        </BaseCard>
    </BasePage>
</template>
<style lang="scss" scoped></style>