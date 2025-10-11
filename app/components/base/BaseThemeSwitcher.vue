<script setup lang="ts">
import { biCheck2 } from '@quasar/extras/bootstrap-icons';
const {
  closeOnClick = false,
  anchor = 'bottom left',
  self = 'top start',
  width = '180px',
  toggle = true
} = defineProps<{
  closeOnClick?: boolean
  anchor?: any
  self?: any
  width?: string
  toggle?: boolean
}>()
const { dark } = useQuasar()
const { onSetTheme, availableThemes, currentTheme } = useTheme()
const { t } = useLang()
</script>
<template>
  <BaseButton
    v-if="toggle"
    flat
    :icon="{ name: dark.isActive ? 'lucide:sun' : 'lucide:moon' }"
    round
    dense
    :tooltip="dark.isActive ? t('theme.switchThemeLight') : t('theme.switchThemeDark')"
    @click="!dark.isActive ? onSetTheme('dark') : onSetTheme('light')"
  >
  </BaseButton>
  <q-menu v-else :anchor="anchor" :self="self" v-bind="$attrs" :auto-close="closeOnClick">
    <q-list :style="{ minWidth: width }" dense class="q-pa-xs">
      <q-item
        v-for="theme in availableThemes"
        :key="theme.key"
        clickable
        class="rounded"
        @click="onSetTheme(theme.key)"
      >
        <q-item-section avatar>
          <q-icon :name="theme.icon" />
        </q-item-section>
        <q-item-section>{{ t(theme.text) }}</q-item-section>
        <q-item-section v-if="theme.key == currentTheme" side>
          <q-icon :name="biCheck2" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-menu>
</template>
