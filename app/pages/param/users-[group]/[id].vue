<script setup lang="ts">
const { getParam, getQuery } = useBase();
onMounted(() => {
    console.log(`Params => group : ${getParam('group')} - id : ${getParam('id')}`);
    console.log(`Query => action : ${getQuery('action')}`);
})
</script>
<template>
    <q-page padding>

        <p>{{ $route.params.group }} - {{ $route.params.id }}</p>
        <NuxtLink to="/">Back</NuxtLink>
    </q-page>
</template>