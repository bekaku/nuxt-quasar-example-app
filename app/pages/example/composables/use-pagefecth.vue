<script setup lang="ts">
import { biArrowClockwise } from '@quasar/extras/bootstrap-icons';
import type { Permission } from '~/types/models';
const { t } = useLang();
useHead({
    title: 'usePageFetch'
})

const {
    firstLoaded,
    pages,
    dataList,
    loadData,
    onReload,
    onPageChange,
    onPerPageChange,
} = usePagefecth<Permission>({
    apiEndpoint: '/api/permission',
    defaultSort: { column: 'id', mode: 'desc' },
    itemsPerPage: 4,
});

const {
    isInfiniteDisabled,
    loading,
    firstLoaded: firstLoaded2,
    dataList: dataList2,
    loadData: loadData2,
    onReload: onReload2,
    onNextPage,
} = usePagefecth<Permission>({
    apiEndpoint: '/api/permission',
    defaultSort: { column: 'id', mode: 'desc' },
    itemsPerPage: 4,
    concatList: true,
});
onMounted(async () => {
    await loadData();
    await loadData2();
})
</script>
<template>
    <QuasarPage>
        <QuasarCard>
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> usePageFetch </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section class="q-gutter-md">
                <QuasarCard flat bordered>
                    <q-card-section>
                        <q-toolbar>
                            <q-toolbar-title> Paging </q-toolbar-title>
                            <q-space />
                            <QuasarButton  flat round :icon="biArrowClockwise" @click="onReload">
                                <q-tooltip>
                                    Reload data
                                </q-tooltip>
                                </QuasarButton>
                        </q-toolbar>
                        <template v-if="!firstLoaded">
                            <base-spinner />
                        </template>
                        <template v-else>
                            <base-result v-if="dataList.length === 0" status="empty"
                                :description="t('error.dataNotfound')" />
                            <template v-else>
                                <q-list>
                                    <q-item v-for="(item, index) in dataList" :key="`${index}-${item.id}`">
                                        <q-item-section>
                                            <q-item-label>
                                                {{ item.description }}
                                            </q-item-label>
                                            <q-item-label caption>
                                                {{ item.code }}
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-list>
                                <BasePaging v-model="pages" @update-current="onPageChange"
                                    @update-perpage="onPerPageChange" />
                            </template>
                        </template>
                    </q-card-section>
                </QuasarCard>

                <QuasarCard class="q-my-md" flat bordered>
                    <q-card-section>
                        <q-toolbar>
                            <q-toolbar-title> Loadmore </q-toolbar-title>
                            <q-space />
                            <QuasarButton  flat round :icon="biArrowClockwise" @click="onReload2">
                                <q-tooltip>
                                    Reload data
                                </q-tooltip>
                                </QuasarButton>
                        </q-toolbar>
                        <template v-if="!firstLoaded2">
                            <base-spinner />
                        </template>
                        <template v-else>
                            <base-result v-if="dataList2.length === 0" status="empty"
                                :description="t('error.dataNotfound')" />
                            <template v-else>
                                <base-scroll-area height="250px">
                                    <q-list>
                                        <q-item v-for="(item2, index2) in dataList2" :key="`${index2}-${item2.id}`">
                                            <q-item-section side>
                                                {{ index2 + 1 }}
                                            </q-item-section>
                                            <q-item-section>
                                                <q-item-label>
                                                    {{ item2.description }}
                                                </q-item-label>
                                                <q-item-label caption>
                                                    {{ item2.code }}
                                                </q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </q-list>
                                </base-scroll-area>
                                <base-loadmore v-if="!isInfiniteDisabled" :loading="loading"
                                    :frist-loaded="firstLoaded2" :is-infinite-disabled="isInfiniteDisabled"
                                    :label="t('base.loadMore')" button show-icon full-width
                                    @on-next-page="onNextPage" />
                            </template>
                        </template>
                    </q-card-section>
                </QuasarCard>
            </q-card-section>
        </QuasarCard>
    </QuasarPage>
</template>
<style lang="scss" scoped></style>