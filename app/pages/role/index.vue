<script setup lang="ts">
import { biPeople } from '@quasar/extras/bootstrap-icons'
import {
  CrudListDataType,
  ICrudListHeaderOptionSearchType,
  type ICrudListHeader
} from '~/types/common'
import type { Role } from '~/types/models'
import { RolePermission } from '~/libs/permissions'
definePageMeta({
  pageName: 'model.role.table',
  requiresPermission: [RolePermission.list]
})
useInitPage()
const { t } = useLang()
const headerItems: ICrudListHeader[] = [
  {
    label: 'model.role.name',
    column: 'name',
    type: CrudListDataType.TEXT,
    options: {
      searchable: true,
      sortable: true,
      fillable: true,
      searchType: ICrudListHeaderOptionSearchType.TEXT,
      searchModel: '',
      searchOperation: ':'
    }
  },
  {
    label: 'base.enable',
    column: 'active',
    type: CrudListDataType.STATUS,
    options: {
      searchable: true,
      sortable: true,
      fillable: true,
      searchType: ICrudListHeaderOptionSearchType.BOOLEAN,
      searchModel: '',
      searchOperation: '=',
      align: 'center'
    }
  },
  {
    label: 'base.tool',
    type: CrudListDataType.BASE_TOOL,
    options: {
      fillable: true,
      editButton: true,
      deleteButton: true,
      copyButton: true,
      viewButton: true,
      align: 'center'
    }
  }
]
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
} = useCrudList<Role>({
  crudName: 'role',
  apiEndpoint: '/api',
  headers: headerItems,
  defaultSort: {
    column: 'id',
    mode: 'desc'
  }
})
</script>
<template>
  <BasePage>
    <BaseCrudList
      :icon="biPeople"
      :title="t('model.role.table')"
      :crud-name="crudName"
      :loading="loading"
      :first-loaded="firstLoaded"
      :pages="pages"
      :headers="headers"
      :sort="sort"
      :list="dataList"
      show-search-text-box
      :view-permission="{
        permissions: [RolePermission.view]
      }"
      :manage-permission="{
        permissions: [RolePermission.manage]
      }"
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
    />
  </BasePage>
</template>
