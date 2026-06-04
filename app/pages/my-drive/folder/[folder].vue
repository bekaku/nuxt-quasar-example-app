<script setup lang="ts">
import { FileManagermission } from '~/libs/permissions'
import FileManagerService from '~/api/FileManagerService'
import type { FileManager, FilesDirectory } from '~/types/models'
import type { LabelValue } from '~/types/common'
import { biGrid, biListTask } from '@quasar/extras/bootstrap-icons'
import { isNumber } from '~/utils/appUtil'

definePageMeta({
  layout: 'drive',
  pageName: 'drive.title',
  requiresPermission: [FileManagermission.manage]
})
useInitPage()
const { t } = useLang()
const { isDark } = useTheme()
const { getParam, appLoading } = useBase()
const { isScreenMobileOrTablet } = useAppDevice()
const { findOneFolder, createFolder } = FileManagerService()
const folderId = computed<number | string>(() => getParam('folder') || '0')
const searchText = ref<string>('')
const viewModeState = useState<string>('mydrive-view-mode', () => 'grid')
const viewMode = ref<string>(viewModeState.value)
const folderItem = ref<FilesDirectory>()
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
const folderPath = ref<LabelValue<any>[]>([])
const showFileCurrent = ref(false)
const fileCurrent = ref<FileManager>()
const showFolderForm = ref(false)
const showChangeNameForm = ref(false)
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
  isInfiniteDisabled,
  getItemById
} = usePagefecth<FileManager>({
  apiEndpoint: '/api/fileManager',
  additionalUri: `directoryId=${folderId.value}`,
  defaultSort: { column: 'fileName', mode: 'asc' },
  itemsPerPage: 20,
  pageStartZero: false,
  concatList: true
})
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
const onFolderClick = async (folderId: string | number) => {
  if (!folderId) {
    return
  }
  await navigateTo(`/my-drive/folder/${folderId}`)
}
const onItemCLick = (id: string | number | null) => {
  if (!id) {
    return
  }
  const item = getItemById(id)
  if (!item) {
    return
  }
  if (item && item.fileMimeType == 'DIRECTORY') {
    onFolderClick(id)
    return
  }
  fileCurrent.value = item
  showFileCurrent.value = true
}
const onClearSelected = () => {
  selected.value = []
}
const onViewModeChange = (mode: string) => {
  viewModeState.value = mode
}
const onOpenChangeName = () => {
  console.log('onOpenChangeName', selected.value)
  if (!selected.value || selected.value.length > 1) {
    return
  }
  const selecetId = selected.value[0]
  if (!selecetId) {
    return
  }
  const item = getItemById(selecetId)
  if (!item) {
    return
  }
  console.log('onOpenChangeName', item)
  fileCurrent.value = item
  showChangeNameForm.value = true
}
const onUploadMenuClick = (value: number | string | undefined) => {
  console.log('onUploadMenuClick', value)
}
const onFolderCreate = async (name: string) => {
  if (!name || name.trim().length == 0) {
    return
  }
  showFolderForm.value = false
  appLoading()
  const createResponse = await createFolder({
    active: true,
    name: name,
    filesDirectoryParentId: validateFolderId() ? folderId.value : 0
  })
  if (createResponse) {
    dataList.value.push(createResponse)
  }
  appLoading(false)
}
const onChangeNameUpdate = async (name?: string) => {
  console.log('onChangeNameUpdate', name)
  showChangeNameForm.value = false
  // change name to server

  // reset fileCurrent = null
}

const nextPage = async (index: number, done: any) => {
  console.log('nextPage', index)
  await onNextPage()
  if (done != undefined) {
    done()
  }
}

const validateFolderId = () => {
  return !(!folderId.value || !isNumber(folderId.value) || parseInt(folderId.value.toString()) <= 0)
}
const loadFolder = async (): Promise<void> => {
  if (!validateFolderId()) {
    return
  }
  const folderResponse = await findOneFolder(folderId.value)
  folderPath.value.length = 0
  if (folderResponse) {
    const paths = folderResponse.paths || []
    for (const fd of paths) {
      if (fd.root) {
        folderPath.value.push({
          label: 'model_files_manager',
          to: '/my-drive/folder/0',
          translateLabel: true
        })
      } else {
        folderPath.value.push({
          label: fd.name,
          to: !fd.current ? `/my-drive/folder/${fd.id}` : undefined,
          translateLabel: false
        })
      }
    }
    folderItem.value = folderResponse
  }
  return new Promise(resolve => resolve())
}
onMounted(async () => {
  await loadFolder()
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
        <BaseButtonToggle
          v-model="viewMode"
          :options="viewModeOptions"
          @on-change="onViewModeChange"
        />
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
                <BaseButton v-if="selected.length === 1" dense flat @click="onOpenChangeName">
                  <BaseIcon name="lucide:text-cursor-input" icon-set="nuxt" />
                  <span class="q-ml-sm">{{ t('drive.changName') }}</span>
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
      <LazyBaseBreadcrumbs :items="folderPath" />
      <template v-if="!firstLoaded">
        <LazySkeletonItem v-if="viewMode === 'list'" />
        <LazySkeletonCard v-else col="col-12 col-md-2 q-pa-xs" :no="6" />
      </template>
      <template v-else-if="dataList.length > 0">
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
      </template>
      <template v-else>
        <LazyBaseResult status="empty" :description="t('base.items', 0)" />
      </template>
    </BaseCard>

    <LazyDriveNameForm v-if="showFolderForm" v-model="showFolderForm" @on-create="onFolderCreate" />
    <LazyDriveNameForm
      v-if="showChangeNameForm && fileCurrent"
      :file="fileCurrent"
      v-model="showChangeNameForm"
      @on-update="onChangeNameUpdate"
    />

    <LazyBaseFileViewDialog
      v-if="showFileCurrent && fileCurrent"
      v-model:show="showFileCurrent"
      :item="fileCurrent"
      :select-index="0"
      :title="fileCurrent.fileName"
      :show-arrow="false"
    />
  </BasePage>
</template>
<style lang="scss" scoped>
.my-fixed-div {
  z-index: 555;
}
</style>
