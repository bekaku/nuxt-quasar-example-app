<script setup lang="ts">
import { biPerson } from '@quasar/extras/bootstrap-icons'
import UserService from '~/api/UserService'
import { userListApi } from '~/libs/data'
import type { ICrudListHeader, ISortModeType } from '~/types/common'
import { CrudListDataType, ICrudListHeaderOptionSearchType } from '~/types/common'
import type { UserDto } from '~/types/models'
import { sortArray } from '~/utils/appUtil'
useHead({
  title: 'Crud table'
})

const headers = ref<ICrudListHeader[]>([
  {
    label: 'Image',
    translateLabel: false,
    column: 'avatar.thumbnail',
    type: CrudListDataType.AVATAR,
    options: {
      fillable: true,
      align: 'center'
    }
  },
  {
    label: 'Email',
    translateLabel: false,
    column: 'email',
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
    label: 'Username',
    translateLabel: false,
    column: 'username',
    type: CrudListDataType.TEXT,
    options: {
      fillable: true,
      searchable: true,
      sortable: true,
      searchType: ICrudListHeaderOptionSearchType.TEXT,
      searchModel: '',
      searchOperation: ':'
    }
  },
  {
    label: 'Active',
    translateLabel: false,
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
      clickable: true
    }
  },
  {
    label: 'Select options',
    translateLabel: false,
    column: 'selectedOption',
    type: CrudListDataType.TEXT,
    options: {
      searchable: true,
      searchType: ICrudListHeaderOptionSearchType.OPTIONS,
      searchModel: null,
      searchOperation: '=',
      selectOption: {
        items: [
          {
            label: 'Cody Fisher',
            value: 6,
            description: 'Fisher',
            avatar: {
              src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
            },
          },
          {
            label: 'Robert Fox',
            value: 7,
            description: 'Fox',
            avatar: {
              src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
            },
          },
          {
            label: 'Esther Howard',
            value: 8,
            description: 'Howard',
            avatar: {
              src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
            },
          },
          {
            label: 'Darlene Robertson',
            value: 9,
            description: 'Robertson',
            avatar: {
              src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
            },
          },
          {
            label: 'Ralph Edwards',
            value: 10,
            description: 'Edwards',
            avatar: {
              src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png',
            },
          },
        ],
        multiple: false,
      },
    },
  },
  {
    label: 'Tools',
    translateLabel: false,
    type: CrudListDataType.BASE_TOOL,
    options: {
      fillable: true,
      editButton: true,
      deleteButton: true,
      copyButton: true,
      align: 'center'
    }
  }
])
const { findAll } = UserService()
const { appConfirm } = useBase()
const { t } = useLang()
const { pages, resetPaging } = usePaging(10)
const { sort } = useSort({
  column: 'id',
  mode: 'desc'
})
const dataList = ref<UserDto[]>([])
const fristLoaded = ref(false)
const loading = ref(false)
onMounted(async () => {
  fetchData()
})
const pageParam = computed<string>(
  () =>
    `?page=${pages.value.current - 1}&size=${pages.value.itemsPerPage}&sort=${sort.value.column},${sort.value.mode}`
)
const fetchData = async () => {
  loading.value = true
  // TODO fetch from api server
  const response = userListApi
  console.log('findAll', response)
  if (response) {
    dataList.value = response.dataList.slice(0, pages.value.itemsPerPage)
    if (response.totalPages != undefined) {
      pages.value.totalPages = response.totalPages
    }
    if (response.totalElements != undefined) {
      pages.value.totalElements = response.totalElements
    }
    if (response.last != undefined) {
      pages.value.last = response.last
    }
  }
  if (!fristLoaded.value) {
    fristLoaded.value = true
  }
  setTimeout(() => (loading.value = false), 1000)
  return new Promise(resolve => resolve(true))
}
const onReload = async () => {
  resetData()
  await fetchData()
}
const resetData = () => {
  resetPaging()
  dataList.value = []
  fristLoaded.value = false
}

const onItemClick = (index: number) => {
  console.log('onItemClick', index)
}
const onItemCopy = (index: number) => {
  console.log('onItemCopy', index)
}
const onPageNoChange = async (no: number | undefined) => {
  console.log('onPageNoChange', no)
  if (no == undefined) {
    return
  }
  pages.value.current = no
  await fetchData()
}
const onItemPerPageChange = async (no: number | undefined) => {
  console.log('onItemPerPageChange', no)
  if (no == undefined) {
    return
  }
  pages.value.itemsPerPage = no
  await fetchData()
}
const onSort = async (column: any) => {
  if (sort.value.column === column) {
    sort.value.mode = sort.value.mode === 'asc' ? 'desc' : 'asc'
  } else {
    sort.value.column = column
  }
  console.log('onSort', sort.value)
  onSortProcess()
  // TODO fetch data to your API
  // await fetchData();
}
const onSortProcess = async () => {
  dataList.value = await sortArray(
    dataList.value,
    sort.value.column as any,
    sort.value.mode || 'asc'
  )
}
const onSortMode = async (mode: ISortModeType) => {
  console.log('onSortMode', mode)
  sort.value.mode = mode
  onSortProcess()
  // TODO fetch data to your API
  // await fetchData();
}
const onAdvanceSearch = async (event: any) => {
  console.log('onAdvanceSearch', event)
}
const onItemDelete = async (indexOrIds: number | number[], isSingle: boolean) => {
  const conf = await appConfirm(t('app.monogram'), t('base.deleteConfirm'))
  if (!conf) {
    return
  }
  console.log('onItemDelete', { indexOrIds, isSingle })
  // single or multiple single emit with index, multiple emit with ids
  if (isSingle) {
    dataList.value = dataList.value.filter((item, index) => index !== indexOrIds)
  } else if (Array.isArray(indexOrIds)) {
    dataList.value = dataList.value.filter(item => item.id && !indexOrIds.includes(item.id))
  }
}
const onNewForm = () => {
  console.log('onNewForm')
}
const onColClick = (event: any, index: number, headerOption: ICrudListHeader, colValue: any) => {
  console.log('pages/permission/index.vue : onColClick', {
    index,
    event,
    headerOption,
    colValue
  })
  if (headerOption && headerOption.column && headerOption.column == 'active') {
    const rowItem = dataList.value[index]
    if (rowItem) {
      console.log('rowItem.active', rowItem.active)
      dataList.value.map(item => {
        if (item.id == rowItem.id) {
          item.active = !item.active
        }
        return item
      })
    }
  }
}
</script>
<template>
  <BasePage>
    <BaseCrudList
      :icon="biPerson"
      :title="t('model_user')"
      crud-name="user"
      :loading="loading"
      :first-loaded="fristLoaded"
      :pages="pages"
      :headers="headers"
      :sort="sort"
      :list="dataList"
      @on-item-click="onItemClick"
      @on-item-copy="onItemCopy"
      @on-page-no-change="onPageNoChange"
      @on-items-perpage-change="onItemPerPageChange"
      @on-sort="onSort"
      @on-sort-mode="onSortMode"
      @on-reload="onReload"
      @on-advance-search="onAdvanceSearch"
      @on-item-delete="onItemDelete"
      @on-new-form="onNewForm"
      @on-col-click="onColClick"
    />
  </BasePage>
</template>
