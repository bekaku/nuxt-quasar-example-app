<script setup lang="ts">
import {  biShieldLock } from '@quasar/extras/bootstrap-icons';
import { ExampleHomeBreadcrumb } from '~/libs/appBreadcrumbs';
import { PermissionPermission } from '~/libs/appPermissions';
import { CrudListDataType, ICrudListHeaderOptionSearchType, type ICrudListHeader } from '~/types/common';
import type { Permission } from '~/types/models';
definePageMeta({
  pageName: 'model_permission',
  requiresPermission: [PermissionPermission.list],
  breadcrumbs: ExampleHomeBreadcrumb,
})
useInitPage();
const headerItems: ICrudListHeader[] = [
  {
    label: 'model_permission_id',
    column: 'id',
    type: CrudListDataType.NUMBER_FORMAT,
    options: {
      searchable: true,
      sortable: true,
      searchType: ICrudListHeaderOptionSearchType.NUMBER,
      searchModel: '',
      searchOperation: '=',
    },
  },
  {
    label: 'model_permission_name',
    column: 'code',
    type: CrudListDataType.TEXT,
    options: {
      fillable: true,
      searchable: true,
      sortable: true,
      searchType: ICrudListHeaderOptionSearchType.TEXT,
      searchModel: '',
      searchOperation: ':',
    },
  },
  {
    label: 'model_permission_description',
    column: 'description',
    type: CrudListDataType.TEXT,
    options: {
      fillable: true,
    },
  },
  {
    label: 'model_permission_frontEnd',
    column: 'frontEnd',
    type: CrudListDataType.STATUS,
    options: {
      fillable: true,
      sortable: true,
      searchable: true,
      align: 'center',
      searchType: ICrudListHeaderOptionSearchType.BOOLEAN,
      searchModel: false,
      searchOperation: '=',
    },
  },
  {
    label: 'base.tool',
    type: CrudListDataType.BASE_TOOL,
    options: {
      fillable: true,
      editButton: true,
      deleteButton: true,
      copyButton: true,
      viewButton:true,
      align: 'center',
    },
  },
];
const {
  dataList,
  loading,
  firstLoaded,
  pages,
  sort,
  onPageNoChange,
  onItemPerPageChange,
  onSort,
  onSortMode,
  onReload,
  onAdvanceSearch,
  onItemDelete,
  onNewForm,
  onItemClick,
  onItemCopy,
  crudName,
  onKeywordSearch,
  headers
} = useCrudList<Permission>(
  {
    crudName: 'permission',
    apiEndpoint: '/api',
    headers: headerItems,
    defaultSort: {
      column: 'code',
      mode: 'asc',
    },
  },
);
const {t}=useLang();
</script>
<template>
  <QuasarPage>
    <BaseCrudList
      :icon="biShieldLock"
      :title="t('model_permission')"
      :crud-name="crudName"
      :loading="loading"
      :first-loaded="firstLoaded"
      :pages="pages"
      :headers="headers"
      :sort="sort"
      :list="dataList"
      show-search-text-box
      @on-item-click="onItemClick"
      @on-item-copy="onItemCopy"
      @on-page-no-change="onPageNoChange"
      @on-items-perpage-change="onItemPerPageChange"
      @on-sort="onSort"
      @on-sort-mode="onSortMode"
      @on-reload="onReload"
      @on-advance-search="onAdvanceSearch"
      @on-keyword-search="onKeywordSearch"
      @on-item-delete="onItemDelete"
      @on-new-form="onNewForm"
    >
    <!--
    <template #additionalBaseTool>
    </template>
    <template #baseTool="{index, item}">
    </template>
    <template #belowInnerSearchExtra>
    </template>
    <template #belowSearchExtra>
    </template>
    <template #extraBeforeInnerToolbar>
    </template>
    <template #extraInnerToolbar>
    </template>
    <template #extraToolbar>
    </template>
    <template #headerCard>
    </template>
    <template #paging>
    </template>
    <template #table>
    </template>
    <template #tbody="{fillableHeaders, list}">
    </template>
    -->
    </BaseCrudList>
  </QuasarPage>

</template>