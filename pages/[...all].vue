<script setup lang="ts">
const { onPageBack } = useBase()
definePageMeta({
    layout: 'empty'
})
</script>

<template>
    <q-page padding class="content-limit">
        <q-card flat bordered>
            <q-card-section class="text-center">
                <div text-4xl>
                    <div i-ep-warning inline-block />
                </div>
                <div>Not found</div>
                <div>
                    <q-btn outline @click="onPageBack()">
                        Back
                    </q-btn>
                </div>
            </q-card-section>

        </q-card>

    </q-page>
</template>