<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Result </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section class="q-gutter-y-lg">
                <q-card bordered flat>
                    <base-result :description="t('error.dataNotfound')" status="empty"/>
                </q-card>
                
                <q-card bordered flat>
                    <base-result title="403" description="Forbidden" status="403"/>
                </q-card>
               
                <q-card bordered flat>
                    <base-result title="404" description="Not found" status="404"/>
                </q-card>
                <q-card bordered flat>
                    <base-result description="Error" status="error"/>
                </q-card>
                <q-card bordered flat>
                    <base-result description="Info" :icon="biImage" status="info"/>
                </q-card>
                <q-card bordered flat>
                    <base-result description="Success" status="success"/>
                </q-card>
                <q-card bordered flat>
                    <base-result description="Warning" status="warning"/>
                </q-card>
               
                <!-- <base-result :description="t('error.dataNotfound')">
                    <template #extra>
                        <q-icon :name="biEmojiSmile"></q-icon>
                    </template>
                </base-result> -->
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import { biImage } from '@quasar/extras/bootstrap-icons';
const { t } = useLang();
useHead({
    title: 'Page result'
})
</script>

<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}
</style>