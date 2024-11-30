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



                <q-input outlined v-model="message" type="textarea" autogrow label="Type message">
                    <template #prepend v-if="authenStore?.auth?.avatar?.thumbnail">
                        <base-avatar :src="authenStore?.auth?.avatar?.thumbnail" />
                    </template>
                    <template #before>
                        <quasar-button round flat :icon="biImage" color="grey-7" />
                        <ClientOnly>
                            <q-btn round flat :icon="biEmojiSmile" color="grey-7">
                                <q-menu>
                                    <base-emoji-picker :picker-id="`emo-${contentID}`"
                                        :theme="dark.isActive ? 'dark' : 'light'" @on:emojiClick="onEmojiClick">
                                    </base-emoji-picker>
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
        </q-card>
    </q-page>
</template>

<script setup lang="ts">
import BaseEmojiPicker from '@/components/base/BaseEmojiPicker.vue';
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import { useLang } from '@/composables/useLang';
import { useAuthenStore } from '@/stores/authenStore';
import { biEmojiSmile, biImage, biSend } from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';

const authenStore = useAuthenStore();
const { t } = useLang();
useHead({
    title: `Emoji picker | ${t('app.name')}`
})
const {dark} = useQuasar();
const contentID = useId();
const message = ref();
const onEmojiClick = (emoji: string) => {
    if (!message.value) {
        message.value = '';
    }
    message.value += emoji;
};
</script>

<style lang="scss" scoped></style>