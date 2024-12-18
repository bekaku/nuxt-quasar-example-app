<script setup lang="ts">
import { biAppIndicator, biEmojiSmile, biImage, biPenFill, biSend } from '@quasar/extras/bootstrap-icons';
import { mdiAbTesting, mdiAccount } from '@quasar/extras/mdi-v7';
import { laAddressBook } from '@quasar/extras/line-awesome';

const authenStore = useAuthenStore();
useHead({
    title: 'Emoji picker/Icon'
})
const { isDark } = useTheme();
const contentID = useId();
const message = ref();
const onEmojiClick = (emoji: string) => {
    if (!message.value) {
        message.value = '';
    }
    message.value += emoji;
};
</script>
<template>
    <q-page padding>
        <q-card flat bordered class="content-limit">
            <q-card-section>
                <q-toolbar>
                    <q-toolbar-title> Emoji picker </q-toolbar-title>
                    <q-space />
                </q-toolbar>
                <q-separator />
            </q-card-section>
            <q-card-section>
                <div class="text-h5">
                    Emoji picker
                </div>
                <q-input v-model="message" outlined type="textarea" autogrow label="Type message">
                    <template v-if="authenStore?.auth?.avatar?.thumbnail" #prepend>
                        <base-avatar :src="authenStore?.auth?.avatar?.thumbnail" />
                    </template>
                    <template #before>
                        <quasar-button round flat :icon="biImage" color="grey-7" />
                        <ClientOnly>
                            <q-btn round flat :icon="biEmojiSmile" color="grey-7">
                                <q-menu>
                                    <base-emoji-picker :picker-id="`emo-${contentID}`"
                                        :theme="isDark ? 'dark' : 'light'" @on-click="onEmojiClick" />
                                </q-menu>
                            </q-btn>
                        </ClientOnly>
                    </template>
                    <template #after>
                        <quasar-button flat round :icon="biSend" color="primary">
                            <q-tooltip>
                                Send
                            </q-tooltip>
                        </quasar-button>
                    </template>
                </q-input>
            </q-card-section>
            <q-separator />
            <q-card-section class="q-gutter-md">
                <div class="text-h5">
                    Icon
                </div>
                <div class="text-h6">
                    Nuxt Icon
                </div>

                <!-- npm i -D @iconify-json/vscode-icons -->
                <BaseIcon icon="vscode-icons:file-type-ai" />
                <!-- npm i -D @iconify-json/bi -->
                <BaseIcon icon="bi:balloon-heart" size="32px" />
                <!-- npm i -D @iconify-json/ic -->
                <BaseIcon icon="ic:baseline-attractions" style="color: red" />
                <!-- npm i -D @iconify-json/hugeicons -->
                <BaseIcon icon="hugeicons:artificial-intelligence-04" />
                <BaseIcon icon="ri:aliens-fill" color="deep-purple" />
                <BaseIcon icon="ri:ancient-gate-line" />
                <!-- npm i -D @iconify-json/uil -->
                <BaseIcon icon="uil:car-sideview" />
                <BaseIcon icon="uil:envelope-minus" />
                <BaseIcon icon="uil:plane-departure" />
                <BaseIcon icon="uil:vuejs" color="teal" />
                <BaseIcon icon="uil:youtube" color="red" />
                <BaseIcon icon="uil:syringe" color="blue" />
                <BaseIcon icon="uil:shovel" />
                <QuasarButton color="primary">
                    <BaseIcon icon="uil:trophy" class="q-mr-sm" /> With button
                </QuasarButton>
                <QuasarButton outline>
                    <BaseIcon icon="uil:utensils-alt" color="pink" class="q-mr-sm" /> With button
                </QuasarButton>

                <div class="text-h6">
                    Quasar Icon
                </div>
                <BaseIcon :icon="biAppIndicator" icon-set="quasar"/>
                <BaseIcon :icon="biPenFill" icon-set="quasar" color="blue-grey-13"/>
                <BaseIcon :icon="mdiAbTesting" icon-set="quasar"/>
                <BaseIcon :icon="mdiAccount" icon-set="quasar"/>
                <BaseIcon :icon="laAddressBook" icon-set="quasar"/>
            </q-card-section>
        </q-card>
    </q-page>
</template>

<style lang="scss" scoped></style>