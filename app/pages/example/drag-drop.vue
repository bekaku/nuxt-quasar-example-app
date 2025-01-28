<script setup lang="ts">
import draggable from "vuedraggable";
import QuasarCard from "~/components/quasar/QuasarCard.vue";
//https://github.com/SortableJS/vue.draggable.next
useHead({
    title: 'Darg drop'
})
const drgaGroup = 'people';
const list1 = ref([
    { name: "John", id: 1, img: 'https://cdn.quasar.dev/img/avatar1.jpg' },
    { name: "Joao", id: 2, img: 'https://cdn.quasar.dev/img/avatar2.jpg' },
    { name: "Jean", id: 3, img: 'https://cdn.quasar.dev/img/avatar3.jpg' },
    { name: "Gerard", id: 4, img: 'https://cdn.quasar.dev/img/avatar4.jpg' }
])

const list2 = ref([
    { name: "Juan", id: 5, img: 'https://cdn.quasar.dev/img/avatar5.jpg' },
    { name: "Edgard", id: 6, img: 'https://cdn.quasar.dev/img/avatar6.jpg' },
    { name: "Johnson", id: 7, img: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg' }
])
const list3 = ref([
    { name: "Salah", id: 8, img: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png' },
    { name: "Virgil", id: 9, img: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar4.png' },
    { name: "Alison", id: 10, img: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg' }
])
const draging1 = ref(false);
const draging2 = ref(false);
const draging3 = ref(false);
const dragOptions = computed(() => {
    return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
    };
})
const log = (ctx: any) => {
    console.log('log', ctx);
}
const onStartDrag = () => {
    draging1.value = true;
}
const onEndDrag = () => {
    draging1.value = false;
}
</script>
<template>
    <QuasarPage>
        <QuasarCard flat bordered>
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Darg drop </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section class="q-gutter-y-lg">
                <client-only>
                    <div class="row">
                        <div class="col-6 q-pa-sm">
                            <q-card-section>
                                <div class="text-h6">Draggable 1 {{ draging1 ? 'under drag...' : '' }}</div>
                                <div class="row">
                                    <div class="col-12 col-md-8">
                                        <draggable v-model="list1" class="drag-area" item-key="name"
                                            v-bind="dragOptions"
                                            :component-data="{ name: 'flip-list', type: 'transition' }" @change="log"
                                            @start="onStartDrag" @end="onEndDrag">
                                            <template #item="{ element, index }">
                                                <q-item clickable>
                                                    <q-item-section avatar>
                                                        <q-avatar>
                                                            <img :src="element.img">
                                                        </q-avatar>
                                                    </q-item-section>
                                                    <q-item-section>
                                                        {{ element.name }} {{ index }}
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </draggable>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <div style="max-height: 300px; overflow: auto"
                                            class="bg-black text-light-green-13">
                                            <pre>{{ list1 }}</pre>
                                        </div>
                                    </div>
                                </div>
                            </q-card-section>
                        </div>

                        <div class="col-6 q-pa-sm">
                            <q-card-section>

                                <div class="text-h6">Draggable 2 {{ draging2 ? 'under drag...' : '' }}</div>
                                <div class="row">
                                    <div class="col-12 col-md-8">
                                        <draggable v-model="list2" class="drag-area" item-key="name"
                                            v-bind="dragOptions"
                                            :component-data="{ name: 'flip-list', type: 'transition' }" @change="log"
                                            @start="draging2 = true" @end="draging2 = false">
                                            <template #item="{ element, index }">
                                                <q-item clickable>
                                                    <q-item-section avatar>
                                                        <q-avatar>
                                                            <img :src="element.img">
                                                        </q-avatar>
                                                    </q-item-section>
                                                    <q-item-section>
                                                        {{ element.name }} {{ index }}
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </draggable>
                                    </div>
                                    <div class="col-12 col-md-4">
                                        <div style="max-height: 300px; overflow: auto"
                                            class="bg-black text-light-green-13">
                                            <pre>{{ list2 }}</pre>
                                        </div>
                                    </div>
                                </div>
                            </q-card-section>
                        </div>
                        <div class="col-6 q-pa-sm">
                            <div class="text-h6">Draggable 3 {{ draging3 ? 'under drag...' : '' }}</div>
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <draggable v-model="list3" class="drag-area-2" item-key="name" v-bind="dragOptions"
                                        :component-data="{ name: 'flip-list', type: 'transition' }" @change="log"
                                        @start="draging3 = true" @end="draging3 = false">
                                        <template #item="{ element, index }">
                                            <div class="q-ma-md text-center">
                                                <QuasarCard style="width: 150px;" class="cursor-pointer">
                                                    <q-avatar>
                                                        <img :src="element.img">
                                                    </q-avatar>
                                                    <q-card-section>
                                                        {{ element.name }} {{ index }}
                                                    </q-card-section>
                                                </QuasarCard>
                                            </div>
                                        </template>
                                    </draggable>
                                </div>
                                <div class="col-12 col-md-4">
                                    <div style="max-height: 400px; overflow: auto" class="bg-black text-light-green-13">
                                        <pre>{{ list3 }}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </client-only>
            </q-card-section>
        </QuasarCard>
    </QuasarPage>
</template>
<style lang="scss" scoped>
.drag-area {
    height: 325px;
    overflow: auto;
    border: 1px dashed #ccc;
}

.drag-area-2 {
    height: 425px;
    overflow: auto;
    border: 1px dashed #ccc;
}

.flip-list-move {
    transition: transform 0.5s;
}

.no-move {
    transition: transform 0s;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>