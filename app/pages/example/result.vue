<script setup lang="ts">
import { biImage } from '@quasar/extras/bootstrap-icons';
const { t } = useLang();
useHead({
    title: 'Page result'
})
</script>
<template>
    <BasePage>
        <BaseCard class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Result </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section class="q-gutter-y-lg">
                <base-result :description="t('error.dataNotfound')" status="empty" />

                <base-result title="403" description="Forbidden" status="403" />

                <base-result title="404" description="Not found" status="404" />
                <base-result description="Error" status="error" />
                <base-result description="Info" :icon="biImage" status="info" />
                <base-result description="Success" status="success" />
                <base-result description="Warning" status="warning" />

                <!-- <base-result :description="t('error.dataNotfound')">
                    <template #extra>
                        <q-icon :name="biEmojiSmile"></q-icon>
                    </template>
</base-result> -->
            </q-card-section>
        </BaseCard>
    </BasePage>
</template>
<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}
</style>