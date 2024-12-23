<script setup lang="ts">
const { getParam, getQuery } = useBase();
onMounted(() => {
    console.log(`Params => group : ${getParam<string>('group')} - id : ${getParam<number>('id')}`, getParam<number>('id'));
    console.log(`Query => action : ${getQuery<string>('action')}`);
})
</script>
<template>
    <q-page padding>

        <p v-if="$route && $route.params">{{ $route?.params?.group }} - {{ $route.params.id }}</p>
        <NuxtLink to="/">Back</NuxtLink>
    </q-page>
</template>