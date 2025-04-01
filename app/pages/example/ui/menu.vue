<script setup lang="ts">
import {
  biChat,
  biChevronRight,
  biCopy,
  biCreditCard,
  biDisplay,
  biEnvelope,
  biHouseDoor,
  biPencil,
  biPeople,
  biPerson,
  biPersonPlus,
  biPlusCircle,
  biShieldCheck,
  biThreeDots,
  biTrash,
  biThreeDotsVertical,
  biDiagram2
} from '@quasar/extras/bootstrap-icons'
import { ref } from 'vue'
import { additionalMenu } from '~/libs/navs'
import type { LabelValue } from '~/types/common'
useHead({
  title: 'Dropdown menu'
})
const { isDark } = useTheme()
const showMenu = ref(false)
const menus = ref<LabelValue<string>[]>([
  {
    label: 'Edit',
    description: 'edit this item',
    icon: { name: biPencil },
    value: 'edit'
  },
  {
    label: 'Delete',
    icon: { name: biTrash },
    color: 'negative',
    value: 'delete'
  },
  {
    label: 'Copy',
    description: 'Copy this item',
    icon: { name: biCopy },
    value: 'copy'
  }
])
const functionHandler = ref<LabelValue<string>[]>([
  {
    label: 'Edit',
    description: 'edit this item',
    icon: { name: biPencil },
    value: 'edit',
    onHandle() {
      console.log('onEdit')
    }
  },
  {
    label: 'Delete',
    icon: { name: biTrash },
    color: 'negative',
    value: 'delete',
    onHandle() {
      console.log('onDelete')
    }
  },
  {
    label: 'Copy',
    description: 'Copy this item',
    icon: { name: biCopy },
    value: 'copy',
    onHandle() {
      console.log('onCopy')
    }
  }
])
const menus2: LabelValue<number>[] = [
  {
    label: 'Cody Fisher',
    value: 1,
    description: 'Fisher',
    avatar: { src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg' }
  },
  {
    label: 'Robert Fox',
    value: 2,
    description: 'Fox',
    avatar: { src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg' }
  },
  {
    label: 'Esther Howard',
    value: 3,
    description: 'Howard',
    avatar: { src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg' }
  },
  {
    label: 'Darlene Robertson',
    value: 4,
    description: 'Robertson',
    avatar: { src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg' }
  },
  {
    label: 'Ralph Edwards',
    value: 5,
    description: 'Edwards',
    avatar: { src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png' }
  }
]
const submenus: LabelValue<string>[] = [
  {
    label: 'Cody Fisher',
    avatar: { src: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg' },
    border: true
  },
  {
    label: 'Profile',
    value: 'Profile',
    icon: { name: biPerson }
  },
  {
    label: 'Billing',
    value: 'Billing',
    icon: { name: biCreditCard }
  },
  {
    label: 'Keyboard shortcuts',
    value: 'Keyboard',
    icon: { name: biDisplay },
    border: true
  },
  {
    label: 'Team',
    value: 'Team',
    icon: { name: biPeople }
  },
  {
    label: 'Invite users',
    icon: { name: biPersonPlus },
    children: [
      {
        label: 'Email',
        value: 'Email',
        icon: { name: biEnvelope }
      },
      {
        label: 'Message',
        value: 'Message',
        icon: { name: biChat }
      },
      {
        label: 'More',
        icon: { name: biPlusCircle },
        children: [
          {
            label: 'Message',
            value: 'Message',
            icon: { name: biChat }
          },
          {
            label: 'Email',
            value: 'Email',
            icon: { name: biEnvelope }
          }
        ]
      }
    ]
  }
]

const exampleHomeBreadcrumb: LabelValue<any>[] = [
  {
    label: 'base.home',
    to: '/',
    icon: { name: biHouseDoor },
    translateLabel: true
  },
  {
    label: 'About'
  },
  {
    label: 'Review'
  },
  {
    label: 'Permission list',
    to: '/permission',
    icon: { name: biShieldCheck }
  }
]
const onMenuClick = (value: number | string | undefined) => {
  console.log('onMenuClick', value)
  showMenu.value = false
}
const openMenu = (event: any) => {
  if (event) {
    event.stopImmediatePropagation()
  }
  showMenu.value = true
}
const onItemClick = () => {
  console.log('onItemClick')
}
</script>
<template>
  <BasePage :full="false">
    <BaseCard flat :bordered="false" title="Dropdown menu">
      <q-card-section class="q-gutter-md">
        <BaseDropdownMenu :items="menus" label="Simple menu" @on-click="onMenuClick" />
        <BaseDropdownMenu
          :items="submenus"
          :icon="biDiagram2"
          label="Submenus"
          @on-click="onMenuClick"
        />
        <BaseDropdownMenu :items="submenus" @on-click="onMenuClick">
          <BaseAvatar src="https://cdn.quasar.dev/img/avatar5.jpg" />
          <BaseTooltip> Click here </BaseTooltip>
        </BaseDropdownMenu>
        <BaseDropdownMenu :items="functionHandler" label="Function handler" />
        <q-item clickable @click="onItemClick">
          <q-item-section> Q-item open state </q-item-section>
          <q-item-section side>
            <BaseButton
              :icon="biThreeDotsVertical"
              outline
              label="Click here"
              @click="openMenu($event)"
            >
              <BaseDropdownMenu
                v-model:open="showMenu"
                empty-body
                :items="menus2"
                @on-click="onMenuClick"
              />
            </BaseButton>
          </q-item-section>
        </q-item>
      </q-card-section>
    </BaseCard>
    <BaseCard flat :bordered="false" title="Breadcrumb">
      <q-card-section>
        <BaseBreadcrumbs :items="exampleHomeBreadcrumb" />
        <BaseBreadcrumbs
          :items="exampleHomeBreadcrumb"
          :separator-icon="{ name: 'lucide:chevrons-right', iconSet: 'nuxt' }"
          text-color="orange"
          active-color="secondary"
        />
      </q-card-section>
    </BaseCard>

    <BaseCard flat :bordered="false" title="Menu">
      <div class="row">
        <div class="col-12 col-md-4 q-pa-sm">
          <BaseScrollArea>
            <BaseMenuItems :items="additionalMenu">
              <template #end="{ menuItem }">
                <q-item-section side>
                  <q-chip :color="!isDark ? 'grey-3' : 'grey-8'">
                    {{ menuItem.label?.charAt(0).toUpperCase() }}
                  </q-chip>
                </q-item-section>
              </template>
            </BaseMenuItems>
          </BaseScrollArea>
        </div>
      </div>
    </BaseCard>
  </BasePage>
</template>
