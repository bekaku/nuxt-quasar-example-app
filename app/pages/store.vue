<script setup lang="ts">
const testStore = useTestStore();
useSeoMeta({
    title: 'Pinia store'
})
const test = ref('');
</script>
<template>
    <BasePage>


        <div>
            Pinia Store
            <p>count store : {{ testStore.counter }}</p>
            <button @click="testStore.setIncrement()">Click++</button>
            <button @click="testStore.setDecrement()">Click--</button>
        </div>
        <NuxtLink to="/">Back</NuxtLink>
    </BasePage>
</template>