<script setup lang="ts">
import { biPerson } from '@quasar/extras/bootstrap-icons';
import { CrudListDataType, ICrudListHeaderOptionSearchType, type ICrudListHeader } from '~/types/common';
import type { Role } from '~/types/models';
import { UserPermission } from '~/libs/appPermissions';
definePageMeta({ 
  pageName: 'model_user', 
  requiresPermission: [UserPermission.list], 
}) 
useInitPage(); 
const { t }=useLang(); 
const headerItems: ICrudListHeader[] = [
{
    label: 'model_user_img_name',
    column: 'avatar.thumbnail',
    type: CrudListDataType.AVATAR,
    options: {
      fillable: true,
      align: 'center',
      size: '55px',
    },
  },
  {
    label: 'model_user_email',
    column: 'email',
    type: CrudListDataType.TEXT,
    options: {
      searchable: true,
      sortable: true,
      fillable: true,
      searchType: ICrudListHeaderOptionSearchType.TEXT,
      searchModel: '',
      searchOperation: ':',
    },
  },
  {
    label: 'model_user_username',
    column: 'username',
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
    label: 'base.enable',
    column: 'active',
    type: CrudListDataType.STATUS,
    options: {
      fillable: true,
      sortable: true,
      searchable: true,
      align: 'center',
      searchType: ICrudListHeaderOptionSearchType.BOOLEAN,
      searchModel: true,
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
      copyButton: false,
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
} = useCrudList<Role>(
  {
    crudName: 'user',
    apiEndpoint: '/api',
    headers: headerItems,
    defaultSort: {
      column: 'email',
      mode: 'asc'
    }
  },
);
</script>
<template>
      <QuasarPage>
        <BaseCrudList
      :icon="biPerson" 
      :title="t('model.role.table')"
      :crud-name="crudName" 
      :loading="loading" 
      :first-loaded="firstLoaded" 
      :pages="pages" 
      :headers="headers" 
      :sort="sort" 
      :list="dataList" 
      show-search-text-box 
      :view-permission="[UserPermission.view]"
      :manage-permission="[UserPermission.manage]"
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
        </QuasarPage>
</template>