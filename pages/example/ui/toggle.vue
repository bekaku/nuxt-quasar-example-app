<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Toggle </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>
                <div class="row">
                    <div class="col-4 q-pa-md">
                        <QuasarToggle label="Toggle" v-model="toggle" :use-checkbox="true" color="primary" :useLabelTitle="false" size="md" true-label="True label" false-label="False label" />
                    </div>
                    <div class="col-4 q-pa-md">
                        <QuasarToggle label="Toggle" v-model="toggle" :use-checkbox="false" color="negative" size="md"/>
                    </div>
                    <div class="col-4 q-pa-md">
                        <QuasarToggle label="Toggle" v-model="toggle" :use-checkbox="toggle" color="negative" size="md" />
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
const { t } = useLang();
useHead({
    title:'Togle'
})
const toggle = ref<boolean>(false);
</script>

<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}
</style>