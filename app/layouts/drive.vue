<script setup lang="ts">
import { biHouseDoor } from '@quasar/extras/bootstrap-icons'
import { login } from '~/libs/permissions'
import type { LabelValue } from '~/types/common'
const {
  isMobileOrTablet,
} = useAppDevice()
const modelValue = ref(!isMobileOrTablet)
const expandDrawer = ref(!isMobileOrTablet)
const miniState = ref(!isMobileOrTablet)
const overlay = ref(false)
const miniToOverlay = ref(true)
const menus: LabelValue<any>[] = [
  {
    icon: { name: 'lucide:home' },
    label: 'nav.dashboard',
    to: '/',
    rbac: {
      permissions: [login]
    }
  },
  {
    icon: { name: 'lucide:folder', iconSet: 'nuxt' },
    label: 'drive.title',
    to: '/my-drive'
  },
  {
    icon: { name: 'lucide:star', iconSet: 'nuxt' },
    label: 'drive.stared',
    to: '/my-drive/type/stared'
  },
  {
    icon: { name: 'lucide:clock', iconSet: 'nuxt' },
    label: 'drive.recent',
    to: '/my-drive/type/recent'
  },
  {
    icon: { name: 'lucide:image', iconSet: 'nuxt' },
    label: 'drive.photos',
    to: '/my-drive/type/image'
  },
  {
    icon: { name: 'lucide:file-video-camera', iconSet: 'nuxt' },
    label: 'drive.videos',
    to: '/my-drive/type/video'
  },
  {
    icon: { name: 'lucide:file', iconSet: 'nuxt' },
    label: 'drive.documents',
    to: '/my-drive/type/document'
  },
  {
    icon: { name: 'lucide:trash-2', iconSet: 'nuxt' },
    label: 'drive.detleted',
    to: '/my-drive/trash',
    border: true
  }
]
const onMounseover = () => {
  if (!isMobileOrTablet) {
    miniState.value = false
  }
}
const onMounseout = () => {
  if (!isMobileOrTablet) {
    miniState.value = true
  }
}
const onOpenDrawer = () => {
  if (!isMobileOrTablet) {
    expandDrawer.value = !expandDrawer.value
  } else {
    modelValue.value = !modelValue.value
  }
}
</script>
<template>
  <q-layout view="lHh Lpr lff">
    <BaseHeader :show-togle-drawer="true" :show-logo="true" bordered>
      <template #toggleBtn>
        <q-btn dense flat round @click="onOpenDrawer">
          <BaseIcon
            :name="expandDrawer ? 'lucide:panel-left-close' : 'lucide:panel-left-open'"
            icon-set="nuxt"
          />
        </q-btn>
      </template>
    </BaseHeader>
    <BaseDrawer
      v-model="modelValue"
      :mini="miniState && !expandDrawer"
      :mini-to-overlay="miniToOverlay && !expandDrawer"
      :width="270"
      :overlay="overlay"
      :bordered="true"
      :tranparent="false"
      :show-header="!miniState || expandDrawer"
      @mouseover="onMounseover"
      @mouseout="onMounseout"
    >
      <BaseMenuItems :items="menus" />
    </BaseDrawer>
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>
