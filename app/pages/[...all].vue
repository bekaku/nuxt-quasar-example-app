<script setup lang="ts">
import { biArrowLeft } from '@quasar/extras/bootstrap-icons';
definePageMeta({
    layout: 'empty'
})
const { onPageBack } = useBase()
const { t } = useLang();
useHead({
    title:'404 Page notfound'
})
</script>

<template>
    <BasePage class="content-limit">
        <div class="fullscreen text-center q-pa-md flex flex-center">
            <base-result status="404" :description="t('error.pageNotFound')">
                <template #extra>
                    <BaseButton rounded flat :icon="biArrowLeft" :label="t('base.back')" @click="onPageBack" />
                </template>
            </base-result>
        </div>
    </BasePage>
</template>