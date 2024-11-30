<script setup lang="ts">
import { biCheck2 } from '@quasar/extras/bootstrap-icons';
const { closeOnClick = false, anchor='bottom left', self='top start' } = defineProps<{
    closeOnClick?: boolean
    anchor?:any
    self?:any
}>();
const { locale, onSwitchLocale, availableLocales } = useLang();
const { screen } = useQuasar();
</script>
<template>
    <!-- :anchor="!screen.gt.xs ? 'bottom left' : 'top end'" self="top start" -->
    <q-menu :anchor="anchor" :self="self" v-bind="$attrs">
        <q-list style="min-width: 150px">
            <q-item  clickable v-for="lang in availableLocales" :key="lang.iso" @click="onSwitchLocale(lang.iso)"
                :v-close-popup="closeOnClick">
                <q-item-section>{{ lang.name }}</q-item-section>
                <q-item-section v-if="lang.iso == locale" side>
                    <q-icon :name="biCheck2" />
                </q-item-section>
            </q-item>
        </q-list>
    </q-menu>
</template>