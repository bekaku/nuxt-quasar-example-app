<script setup lang="ts">
import { biImage } from '@quasar/extras/bootstrap-icons';
import { ionBatteryHalfOutline, ionCheckmarkOutline, ionEyeOffOutline, ionLockClosedOutline, ionShieldOutline } from '@quasar/extras/ionicons-v7';
const { t } = useLang();
useHead({
    title: 'Page result'
})
</script>
<template>
    <BasePage :full="false">
        <BaseCard title="Alert">
            <q-card-section>
                <div class="row">
                    <div class="col-6 q-pa-md">
                        <div class="q-gutter-md">
                            <BaseAlert type="is-primary" :icon="ionBatteryHalfOutline" message="This is primary!!" />
                            <BaseAlert type="is-warning" :icon="ionEyeOffOutline" message="This is warning!!"
                                :radius="false" :closeable="false" />
                            <BaseAlert type="is-danger" :icon="biImage" icon-set="bootstrap-icons"
                                message="This is danger!!" />
                            <BaseAlert type="is-info" :icon="ionLockClosedOutline" message="This is info!!" />
                            <BaseAlert type="is-light" :icon="ionBatteryHalfOutline" message="This is light!!" />
                            <BaseAlert type="is-link" :icon="ionShieldOutline" message="This is link!!" />
                            <BaseAlert type="is-success" :icon="ionCheckmarkOutline" message="This is success!!" />
                        </div>
                    </div>
                    <div class="col-6 q-pa-md">
                        <div class="q-gutter-md">
                            <BaseAlert type="is-primary" :icon="ionBatteryHalfOutline" message="This is primary!!"
                                secondary />
                            <BaseAlert type="is-warning" :icon="ionEyeOffOutline" message="This is warning!!"
                                :radius="false" :closeable="false" secondary />
                            <BaseAlert type="is-danger" :icon="biImage" icon-set="bootstrap-icons"
                                message="This is danger!!" secondary />
                            <BaseAlert type="is-info" :icon="ionLockClosedOutline" message="This is info!!" secondary />
                            <BaseAlert type="is-light" :icon="ionBatteryHalfOutline" message="This is light!!"
                                secondary />
                            <BaseAlert type="is-link" :icon="ionShieldOutline" message="This is link!!" secondary />
                            <BaseAlert type="is-success" :icon="ionCheckmarkOutline" message="This is success!!"
                                secondary />
                        </div>
                    </div>
                </div>

            </q-card-section>
        </BaseCard>
        <BaseCard title="Result">
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