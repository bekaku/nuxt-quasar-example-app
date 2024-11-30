<script setup lang="ts">
const { t } = useLang();
useHead({
    title: `Avatar | ${t('app.name')}`
});
const authenStore = useAuthenStore();
const items = ref<string[]>([
    'https://cdn.quasar.dev/img/avatar1.jpg',
    'https://cdn.quasar.dev/img/avatar2.jpg',
    'https://cdn.quasar.dev/img/avatar3.jpg',
    'https://cdn.quasar.dev/img/avatar4.jpg',
    'https://cdn.quasar.dev/img/avatar5.jpg',
    'https://cdn.quasar.dev/img/avatar6.jpg',
    'https://cdn.quasar.dev/img/avatar7.jpg',
    'https://cdn.quasar.dev/img/avatar8.jpg',
])
const getTooltipBy = (index: number) => {
    return items.value[index]
}
</script>
<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Avatar </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>

                <div class=" row q-pa-md q-gutter-md">
                    <base-avatar v-if="authenStore.auth?.avatar?.image" :src="authenStore.auth?.avatar?.image"
                        fetch-image size="120px" />
                    <base-avatar src="https://cdn.quasar.dev/img/avatar2.jpg" size="120px" />

                    <base-avatar rounded src="https://cdn.quasar.dev/img/avatar1.jpg" size="120px" />

                    <base-avatar square src="https://cdn.quasar.dev/img/avatar3.jpg" size="120px" />
                    <!-- <div style="border: 4px solid #23d160;border-radius: 50%;">
                        <base-avatar src="https://cdn.quasar.dev/img/avatar6.jpg" size="120px" />
                    </div> -->
                    <base-avatar src="https://cdn.quasar.dev/img/avatar6.jpg" bordered bordered-color="#23d160"
                        bordered-width="4px" size="120px" class="shadow-10" />
                    <base-avatar src="https://cdn.quasar.dev/img/avatar4.jpg" size="120px">
                        <template #extra>
                            <q-badge floating color="primary">new</q-badge>
                        </template>
                    </base-avatar>
                    <base-avatar src="https://cdn.quasar.dev/img/avatar5.jpg" bordered size="42px">
                        <template #extra>
                            <q-badge floating color="positive" rounded transparent class="absolute" style="top: 2px;" />
                        </template>
                    </base-avatar>
                </div>



                <div class="row q-gutter-x-xl">
                    <base-avatar-group :items="items" :limit="5" size="42px">
                        <template #extra="{ index }">
                            <q-tooltip>
                                {{ getTooltipBy(index) }}
                            </q-tooltip>
                        </template>
                    </base-avatar-group>
                    <base-avatar-group :items="items" :limit="5" size="42px" boder-color="#00a0dc" />
                </div>
            </q-card-section>
        </q-card>
    </q-page>
</template>