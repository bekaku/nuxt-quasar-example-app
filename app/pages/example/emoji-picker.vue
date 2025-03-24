<script setup lang="ts">
import {
  biAppIndicator,
  biEmojiSmile,
  biImage,
  biPenFill,
  biSend
} from '@quasar/extras/bootstrap-icons'
import { mdiAbTesting, mdiAccount } from '@quasar/extras/mdi-v7'
import { laAddressBook } from '@quasar/extras/line-awesome'

const authenStore = useAuthenStore()
useHead({
  title: 'Emoji picker/Icon'
})
const { isDark } = useTheme()
const contentID = useId()
const message = ref()
const onEmojiClick = (emoji: string) => {
  if (!message.value) {
    message.value = ''
  }
  message.value += emoji
}
</script>
<template>
  <BasePage class="content-limit">
    <BaseCard title="Emoji picker">
      <q-card-section>
        <q-input v-model="message" outlined type="textarea" autogrow label="Type message">
          <template v-if="authenStore?.auth?.avatar?.thumbnail" #prepend>
            <base-avatar :src="authenStore?.auth?.avatar?.thumbnail" />
          </template>
          <template #before>
            <BaseButton round flat :icon="biImage" color="grey-7" />
            <ClientOnly>
              <q-btn round flat :icon="biEmojiSmile" color="grey-7">
                <q-menu>
                  <base-emoji-picker
                    :picker-id="`emo-${contentID}`"
                    :theme="isDark ? 'dark' : 'light'"
                    @on-click="onEmojiClick"
                  />
                </q-menu>
              </q-btn>
            </ClientOnly>
          </template>
          <template #after>
            <BaseButton flat round :icon="biSend" color="primary">
              <BaseTooltip> Send </BaseTooltip>
            </BaseButton>
          </template>
        </q-input>
      </q-card-section>
      <q-separator />
      <q-card-section class="q-gutter-md">
        <BaseTextHeader title="Icon" />
        <div class="text-h6">Nuxt Icon</div>

        <!-- npm i -D @iconify-json/vscode-icons -->
        <BaseIcon icon="vscode-icons:file-type-ai" icon-set="nuxt" />

        <!-- <BaseIcon icon="lucide:panel-left-open" icon-set="nuxt" /> -->

        <!-- npm i -D @iconify-json/bi -->
        <BaseIcon icon="bi:balloon-heart" icon-set="nuxt" size="32px" />
        <!-- npm i -D @iconify-json/ic -->
        <BaseIcon icon="ic:baseline-attractions" icon-set="nuxt" style="color: red" />
        <!-- npm i -D @iconify-json/hugeicons -->
        <BaseIcon icon="hugeicons:artificial-intelligence-04" icon-set="nuxt" />
        <BaseIcon icon="ri:aliens-fill" color="deep-purple" icon-set="nuxt" />
        <BaseIcon icon="ri:ancient-gate-line" icon-set="nuxt" />
        <!-- npm i -D @iconify-json/uil -->
        <BaseIcon icon="uil:car-sideview" icon-set="nuxt" />
        <BaseIcon icon="uil:envelope-minus" icon-set="nuxt" />
        <BaseIcon icon="uil:plane-departure" icon-set="nuxt" />
        <BaseIcon icon="uil:vuejs" color="teal" icon-set="nuxt" />
        <BaseIcon icon="uil:youtube" color="red" icon-set="nuxt" />
        <BaseIcon icon="uil:syringe" color="blue" icon-set="nuxt" />
        <BaseIcon icon="uil:shovel" icon-set="nuxt" />
        <BaseButton color="primary">
          <BaseIcon icon="uil:trophy" class="q-mr-sm" icon-set="nuxt" /> With button
        </BaseButton>
        <BaseButton outline>
          <BaseIcon icon="uil:utensils-alt" color="pink" class="q-mr-sm" icon-set="nuxt" /> With
          button
        </BaseButton>

        <div class="text-h6">Quasar Icon</div>
        <BaseIcon :icon="biAppIndicator" icon-set="quasar" />
        <BaseIcon :icon="biPenFill" icon-set="quasar" color="blue-grey-13" />
        <BaseIcon :icon="mdiAbTesting" icon-set="quasar" />
        <BaseIcon :icon="mdiAccount" icon-set="quasar" />
        <BaseIcon :icon="laAddressBook" icon-set="quasar" />
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>

<style lang="scss" scoped></style>
