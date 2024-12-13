<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Darg drop </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section class="q-gutter-y-lg">



                <q-card>

                    <div class="text-h5 q-pa-md">
                        Two List
                    </div>
                    <client-only>
                        <div class="row">
                            <div class="col-6 q-pa-sm">
                                <q-card flat>
                                    <q-card-section>

                                        <div class="text-h6">Draggable 1 {{ draging ? 'under drag...' : '' }}</div>
                                        <p>{{ list1 }}</p>
                                        <draggable
v-model="list1" class="drag-area" item-key="name" v-bind="dragOptions"
                                            :component-data="{ name: 'flip-list', type: 'transition' }"
                                            @change="log" @start="onStartDrag"
                                            @end="onEndDrag">
                                            <template #item="{ element, index }">
                                                <q-item clickable>
                                                    <q-item-section avatar>
                                                        <q-avatar>
                                                            <img src="https://cdn.quasar.dev/img/avatar.png">
                                                        </q-avatar>
                                                    </q-item-section>
                                                    <q-item-section>
                                                        {{ element.name }} {{ index }}
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </draggable>

                                    </q-card-section>
                                </q-card>
                            </div>

                            <div class="col-6 q-pa-sm">
                                <q-card flat>
                                    <q-card-section>
                                        <div class="text-h6">Draggable 2</div>
                                        <p>{{ list2 }}</p>
                                        <draggable
v-model="list2" class="drag-area" item-key="name" v-bind="dragOptions"
                                            :component-data="{ name: 'flip-list', type: 'transition' }"
                                            @change="log">
                                            <template #item="{ element, index }">
                                                <q-item clickable>
                                                    <q-item-section avatar>
                                                        <q-avatar>
                                                            <img src="https://cdn.quasar.dev/img/avatar.png">
                                                        </q-avatar>
                                                    </q-item-section>
                                                    <q-item-section>
                                                        {{ element.name }} {{ index }}
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </draggable>
                                    </q-card-section>
                                </q-card>
                            </div>
                            <div class="col-6 q-pa-sm">
                                <div class="text-h6">Draggable 3</div>
                                <draggable
v-model="list3" class="drag-area-2" item-key="name" v-bind="dragOptions"
                                    :component-data="{ name: 'flip-list', type: 'transition' }" @change="log">
                                    <template #item="{ element, index }">
                                        <div class="q-ma-md">
                                            <q-card>
                                                <q-img
style="max-height: 100px;"
                                                    src="https://cdn.quasar.dev/img/avatar1.jpg" />
                                                <q-card-section>
                                                    {{ element.name }} {{ index }}
                                                </q-card-section>
                                            </q-card>
                                        </div>
                                    </template>
                                </draggable>
                            </div>


                        </div>
                    </client-only>
                </q-card>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import draggable from "vuedraggable";
import { biImage } from '@quasar/extras/bootstrap-icons';
const { t } = useLang();
//https://github.com/SortableJS/vue.draggable.next
useHead({
    title: 'Darg drop'
})
const drgaGroup = 'people';
const list1 = ref([
    { name: "John", id: 1 },
    { name: "Joao", id: 2 },
    { name: "Jean", id: 3 },
    { name: "Gerard", id: 4 }
])

const list2 = ref([
    { name: "Juan", id: 5 },
    { name: "Edgard", id: 6 },
    { name: "Johnson", id: 7 }
])
const list3 = ref([
    { name: "Salah", id: 8 },
    { name: "Virgil", id: 9 },
    { name: "Alison", id: 10 }
])
const draging = ref(false);
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
    draging.value = true;
}
const onEndDrag = () => {
    draging.value = false;
}
</script>

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