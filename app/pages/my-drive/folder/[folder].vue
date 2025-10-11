<script setup lang="ts">
import { FileManagermission } from '~/libs/permissions'
import FileManagerService from '~/api/FileManagerService'
import type { FileManager } from '~/types/models'
import type { ISortModeType, LabelValue } from '~/types/common'
import { biGrid, biListTask, biMic, biMusicNote, biPlay } from '@quasar/extras/bootstrap-icons'
import type { IconProps } from '~/types/props'
import { pl } from 'date-fns/locale'
definePageMeta({
  layout: 'drive',
  pageName: 'drive.title',
  requiresPermission: [FileManagermission.manage]
})
useInitPage()
const { t } = useLang()
const { isDark } = useTheme()
const { getParam } = useBase()
const { isScreenMobileOrTablet } = useAppDevice()
const { findAllFolderAndFiles } = FileManagerService()
const folderId = computed<string>(() => getParam('folder') || '0')
// const { pages, resetPaging } = usePaging(10)
// const { sort } = useSort({
//   column: 'fileName',
//   mode: 'asc'
// })
// const queryParam = computed((): string | undefined => {
//   let haveParam = false
//   let q = ''
//   q += `page=${pages.value.current}`
//   q += `&size=${pages.value.itemsPerPage}`
//   haveParam = true
//   if (haveParam) {
//     q += '&'
//   }
//   q += `${sort.value.column && sort.value.mode ? 'sort=' + sort.value.column + ',' + sort.value.mode : ''}`
//   return !isEmpty(q) ? q : undefined
// })

// const { data, refresh, clear, status, error } = await useAsyncData<FileManager[] | null>(
//   `folder-${folderId.value}`,
//   async () => {
//     const response = await findAllFolderAndFiles(folderId.value, queryParam.value)
//     return response
//   }
// )
const showFolderForm = ref(false)
const searchText = ref<string>('')
const viewMode = ref<string>('grid')
const viewModeOptions: LabelValue<string>[] = [
  { label: t('base.listView'), value: 'list', icon: biListTask as any },
  { label: t('base.gridView'), value: 'grid', icon: biGrid as any }
]
const {
  firstLoaded,
  pages,
  dataList,
  loadData,
  onReload,
  onNextPage,
  sort,
  onSortColumn,
  onSortMode,
  loading,
  isInfiniteDisabled
} = usePagefecth<FileManager>({
  apiEndpoint: '/api/fileManager',
  additionalUri: `directoryId=${folderId.value}`,
  defaultSort: { column: 'fileName', mode: 'asc' },
  itemsPerPage: 20,
  pageStartZero: false,
  concatList: true
})

const selected = ref<string[]>([])
const uploadMenus = ref<LabelValue<string>[]>([
  {
    label: t('drive.newFile'),
    icon: {
      name: 'lucide:file-up',
      iconSet: 'nuxt'
    },
    value: 'file'
  },
  {
    label: t('drive.uploadVideos'),
    icon: {
      name: 'lucide:file-video-camera',
      iconSet: 'nuxt'
    },
    value: 'video'
  },
  {
    label: t('drive.uploadAudios'),
    icon: {
      name: 'lucide:file-audio-2',
      iconSet: 'nuxt'
    },
    value: 'audio'
  }
])
const onFolderClick = async (folderId: string) => {
  // resetPaging()
  await navigateTo(`/my-drive/folder/${folderId}`)
  // await onReload()
}
const updateSelectedAll = (val: boolean) => {
  selected.value = []
  if (val) {
    for (let i = 0; i < dataList.value.length; i++) {
      const item = dataList.value[i]
      if (item && item.id) {
        selected.value.push(item.id as string)
      }
    }
  }
}
const onItemCLick = (id: string | number | null) => {
  console.log('onItemCLick', id)
}
const onClearSelected = () => {
  selected.value = []
}
const onUploadMenuClick = (value: number | string | undefined) => {
  console.log('onUploadMenuClick', value)
}
const onFolderCreate = async (name: string) => {
  console.log('onFolderCreate', name)
  showFolderForm.value = false
}
const onFolderUpdate = async (folder?: FileManager) => {
  console.log('onFolderUpdate', folder)
  showFolderForm.value = false
}
const nextPage = async (index: number, done: any) => {
  console.log('nextPage', index)
  await onNextPage()
  if (done != undefined) {
    done()
  }
}
onMounted(async () => {
  await loadData()
})
</script>
<template>
  <BasePage :full="true">
    <BaseCard :bordered="false" flat :title="t('drive.title')">
      <template #end>
        <BaseButton flat @click="showFolderForm = true">
          <BaseIcon name="lucide:folder-plus" icon-set="nuxt" />
          <span class="q-ml-sm">{{ t('drive.newFolder') }}</span>
        </BaseButton>

        <BaseDropdownMenu
          class="q-ml-sm"
          :items="uploadMenus"
          anchor="bottom left"
          self="top middle"
          @on-click="onUploadMenuClick"
        >
          <BaseButton color="primary">
            <BaseIcon name="lucide:plus" icon-set="nuxt" />
            <span class="q-ml-sm">{{ t('drive.newFile') }}</span>
            <BaseIcon name="lucide:chevron-down" icon-set="nuxt" />
          </BaseButton>
        </BaseDropdownMenu>
      </template>
      <q-separator />

      <q-toolbar class="app-border-radius">
        <BaseButtonToggle v-model="viewMode" :options="viewModeOptions" />
        <BaseInput
          v-if="!isScreenMobileOrTablet"
          v-bind="$attrs"
          v-model="searchText"
          :bg-color="!isDark ? 'white' : 'grey-9'"
          :debounce="500"
          :icon="{ name: 'lucide:search', iconSet: 'nuxt' }"
          :placeholder="t('drive.searchFile')"
          dense
        />
        <q-space />
        <BaseSort
          :sort="sort"
          :label="!isScreenMobileOrTablet ? t('sort.sort') : ''"
          :fields="[
            {
              label: t('drive.fileName'),
              value: 'fileName'
            },
            {
              label: t('drive.createdDate'),
              value: 'createdDate'
            },
            {
              label: t('drive.updatedDate'),
              value: 'updatedDate'
            },
            {
              label: t('drive.fileSize'),
              value: 'fileSize'
            },
            {
              label: t('drive.fileMime'),
              value: 'fileMime'
            }
          ]"
          @on-sort-column="onSortColumn"
          @on-sort-mode="onSortMode"
        />
      </q-toolbar>
      <div class="fixed-bottom-right my-fixed-div">
        <BaseTransitionWrapper name="slide-up">
          <BaseCardSection v-if="selected.length > 0" :padding="false">
            <BaseCard>
              <q-toolbar class="bg-primary text-white">
                <BaseButton dense flat>
                  <BaseIcon name="lucide:trash-2" icon-set="nuxt" />
                  <BaseEllipsis :lines="1">
                    <span class="q-ml-sm">{{ t('base.delete') }}</span>
                  </BaseEllipsis>
                </BaseButton>
                <BaseButton dense flat>
                  <BaseIcon name="lucide:folder-input" icon-set="nuxt" />
                  <BaseEllipsis :lines="1">
                    <span class="q-ml-sm">{{ t('drive.moveTo') }}</span>
                  </BaseEllipsis>
                </BaseButton>
                <BaseButton dense v-if="selected.length === 1" flat>
                  <BaseIcon name="lucide:text-cursor-input" icon-set="nuxt" />
                  <BaseEllipsis :lines="1">
                    <span class="q-ml-sm">{{ t('drive.changName') }}</span>
                  </BaseEllipsis>
                </BaseButton>
                <q-space />
                <BaseButton dense flat @click="onClearSelected">
                  <BaseIcon name="lucide:x" icon-set="nuxt" />
                  <span class="q-ml-sm">{{ t('base.selectdItems', selected.length as any) }}</span>
                </BaseButton>
              </q-toolbar>
            </BaseCard>
          </BaseCardSection>
        </BaseTransitionWrapper>
      </div>
      <template v-if="!firstLoaded">
        <LazySkeletonItem v-if="viewMode === 'list'" />
        <LazySkeletonCard v-else col="col-12 col-md-2 q-pa-xs" :no="6" />
      </template>
      <template v-else-if="dataList.length > 0">
        <!-- <BaseScrollArea height="65vh"> -->
        <BaseInfiniteScroll :disable="isInfiniteDisabled" @on-infinite="nextPage">
          <LazyDriveList
            v-if="viewMode === 'list'"
            v-model:selected="selected"
            :items="dataList"
            @on-check-all="updateSelectedAll"
            @on-item-click="onItemCLick"
          />
          <LazyDriveGrid
            v-else
            :items="dataList"
            v-model:selected="selected"
            @on-item-click="onItemCLick"
          />
        </BaseInfiniteScroll>
        <!-- </BaseScrollArea> -->
      </template>
      <template v-else>
        <LazyBaseResult status="empty" :description="t('base.items', 0)" />
      </template>
    </BaseCard>
    <LazyDriveFolderForm
      v-if="showFolderForm"
      v-model="showFolderForm"
      @on-create="onFolderCreate"
      @on-update="onFolderUpdate"
    />
  </BasePage>
</template>
<style lang="scss" scoped>
.my-fixed-div {
  z-index: 555;
}
</style>
