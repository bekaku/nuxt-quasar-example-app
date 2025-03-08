<script setup lang="ts">
import FileManagerService from "~/api/FileManagerService";
import type { ISeriresCategories } from "~/types/chart";

const { t, locale, onSetLocale } = useLang();
const test = ref();
useSeoMeta({
  title: "Test Page",
});
</script>
<template>
  <BasePage>
    <div>{{t('app.name')}}</div>
  </BasePage>
</template>
