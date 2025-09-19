<script setup lang="ts">
import { biEnvelope, biPerson, biShieldLock } from '@quasar/extras/bootstrap-icons'
import type { LabelValue } from '~/types/common'
const navs: LabelValue<any>[] = [
  {
    label: '',
    children: [
      {
        icon: { name: 'lucide:user' },
        translateLabel: true,
        label: 'page.settingsPublicProfile',
        to: '/settings',
        noActiveLink: true
      }
    ]
  },
  {
    label: 'Access',
    translateLabel: false,
    border: true,
    children: [
      {
        icon: { name: 'lucide:shield' },
        translateLabel: true,
        label: 'page.settingsSecurity',
        to: '/settings/security',
        noActiveLink: true
      },
      {
        icon: { name: 'lucide:mail' },
        translateLabel: true,
        label: 'contactInfo',
        to: '/settings/emails',
        noActiveLink: true
      }
    ]
  }
]
</script>
<template>
  <BasePage v-bind="$attrs" padding>
    <div class="row">
      <div class="col-12 col-md-3 q-px-md">
        <BaseMenuItems :items="navs" />
      </div>

      <div class="col-12 col-md-9">
        <slot name="content" />
      </div>
    </div>
    <slot />
  </BasePage>
</template>
