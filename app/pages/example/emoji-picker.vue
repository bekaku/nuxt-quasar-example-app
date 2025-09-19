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

        <p>
          <BaseLink href="https://icon-sets.iconify.design/" color="primary" external>
            <BaseIcon name="lucide:move-up-right" icon-set="nuxt" color="light" /> Iconify
          </BaseLink>
          <BaseLink href="https://icon-sets.iconify.design/hugeicons/?keyword=huge" color="primary" external>
            <BaseIcon name="lucide:move-up-right" icon-set="nuxt" /> Huge Icon
          </BaseLink>
          <BaseLink href="https://icon-sets.iconify.design/lucide/?keyword=lucide" color="primary" external>
            <BaseIcon name="lucide:move-up-right" icon-set="nuxt" /> lucide Icon
          </BaseLink>
        </p>

        <BaseIcon name="lucide:cookie" icon-set="nuxt" color="light" />

        <!-- npm i -D @iconify-json/vscode-icons -->
        <BaseIcon name="vscode-icons:file-type-ai" icon-set="nuxt" />

        <!-- <BaseIcon name="lucide:panel-left-open" icon-set="nuxt" /> -->

        <!-- npm i -D @iconify-json/bi -->
        <BaseIcon name="bi:balloon-heart" icon-set="nuxt" size="32px" />
        <!-- npm i -D @iconify-json/ic -->
        <BaseIcon name="ic:baseline-attractions" icon-set="nuxt" style="color: red" />
        <!-- npm i -D @iconify-json/hugeicons -->
        <BaseIcon name="hugeicons:artificial-intelligence-04" icon-set="nuxt" />
        <!-- npm i -D @iconify-json/uil -->
        <BaseIcon name="uil:car-sideview" icon-set="nuxt" />
        <BaseIcon name="uil:envelope-minus" icon-set="nuxt" />
        <BaseIcon name="uil:plane-departure" icon-set="nuxt" />
        <BaseIcon name="uil:vuejs" color="teal" icon-set="nuxt" />
        <BaseIcon name="uil:youtube" color="red" icon-set="nuxt" />
        <BaseIcon name="uil:syringe" color="blue" icon-set="nuxt" />
        <BaseIcon name="uil:shovel" icon-set="nuxt" />
        <BaseButton color="primary">
          <BaseIcon name="uil:trophy" class="q-mr-sm" icon-set="nuxt" /> With button
        </BaseButton>
        <BaseButton outline>
          <BaseIcon name="uil:utensils-alt" color="pink" class="q-mr-sm" icon-set="nuxt" /> With
          button
        </BaseButton>

        <div class="text-h6">Quasar Icon</div>
        <BaseIcon :name="biAppIndicator" icon-set="quasar" />
        <BaseIcon :name="biPenFill" icon-set="quasar" color="blue-grey-13" />
        <BaseIcon :name="mdiAbTesting" icon-set="quasar" />
        <BaseIcon :name="mdiAccount" icon-set="quasar" />
        <BaseIcon :name="laAddressBook" icon-set="quasar" />
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>

<style lang="scss" scoped></style>
