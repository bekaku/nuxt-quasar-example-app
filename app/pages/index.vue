<script setup lang="ts">

definePageMeta({
    // middleware: ["auth"]
    pageName: 'base.home',//custom meta
    // requiresPermission: ['role_manage'],//custom meta
})
useInitPage();
const { onSetTheme } = useTheme();
const { getPageMeta, getPageMetaByKey } = useBase();

if (!import.meta.server) {
    console.log('getPageMeta', getPageMeta());
    console.log('getPageMetaByKey', 'pageName: ', getPageMetaByKey('pageName'), ', requiresPermission: ', getPageMetaByKey('requiresPermission'));
}
const items = ref<any[]>([]);

const generateItems = () => {
    let count = items.value.length;
    for (let i = 0; i < 40; i++) {
        count++;
        items.value.push({
            id: count,
            label: 'Option ' + count
        })
    }
};
generateItems();
const nextPage = (index: number, done: any) => {
    setTimeout(() => {
        generateItems();
        if (done != undefined) {
            done();
        }
    }, 500);
}
</script>
<template>
    <BasePage scroll-event show-to-top>
        <BaseCard title="Dashboard" sub-title="This is index page of the site">
            <BaseInfiniteScroll @on-infinite="nextPage">
                <q-list>
                    <q-item v-for="(item, index) in items" :key="item.id" clickable>
                        <q-item-section avatar>
                            <q-avatar>
                                <img src="https://cdn.quasar.dev/img/avatar.png">
                            </q-avatar>
                        </q-item-section>
                        <q-item-section>
                            {{ item.label }}
                        </q-item-section>
                        <q-item-section side>
                            <q-chip>
                                #{{ index }}
                            </q-chip>
                        </q-item-section>
                    </q-item>
                </q-list>
            </BaseInfiniteScroll>
        </BaseCard>
    </BasePage>
</template>