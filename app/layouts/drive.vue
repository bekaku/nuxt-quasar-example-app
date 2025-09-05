<script setup lang="ts">
import { biDatabase, biFile, biHouseDoor } from '@quasar/extras/bootstrap-icons'
import { login, FileManagermission } from '~/libs/permissions'
import type { LabelValue } from '~/types/common'
const { isMobileOrTablet } = useAppDevice()
const { isDark } = useTheme()
const modelValue = ref(true)
const expandDrawer = ref(true)
const drawerOpen = ref(true)
const miniState = ref(false)
const overlay = ref(false)
const miniToOverlay = ref(true)
const menus: LabelValue<any>[] = [
  {
    icon: { name: biHouseDoor },
    label: 'nav.dashboard',
    to: '/',
    rbac: {
      permissions: [login]
    }
  },
  {
    icon: { name: 'lucide:folder', iconSet: 'nuxt' },
    label: 'drive.title',
    to: '/my-drive',
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
</script>
<template>
  <q-layout view="lHh Lpr lff">
    <BaseHeader :show-togle-drawer="true" :show-logo="true" bordered>
      <template #toggleBtn>
        <q-btn
          dense
          flat
          round
          @click="!isMobileOrTablet ? (expandDrawer = !expandDrawer) : (drawerOpen = !drawerOpen)"
        >
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
      <!-- <q-scroll-area class="fit">
        <div v-show="!miniState || expandDrawer">
          <div class="row justify-center q-pa-sm">
            <q-btn flat dense round to="/" class="btn--no-hover">
              <q-avatar style="height: auto; width: 44px" square>
                <img alt="logo" :src="!isDark ? '/logo/logo-black.png' : '/logo/logo-white.png'" />
              </q-avatar>
            </q-btn>
          </div>
          <q-separator />
        </div> -->
      <BaseMenuItems :items="menus" />
      <!-- </q-scroll-area> -->
    </BaseDrawer>
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>
