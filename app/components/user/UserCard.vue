<script setup lang="ts">
const { height = '250px', avatarTop = '75px', avatarSize = '120px', avatarFlat = false, flat = false } = defineProps<{
    coverImage?: string
    avatarImage?: string
    height?: string
    avatarTop?: string
    avatarFlat?: boolean
    avatarSize?: string
    descriptionStyle?: string
    name?: string
    description?: string
    flat?: boolean
}>();
</script>
<template>
    <q-card v-bind="$attrs" :flat class="bg-transparent">
        <q-card flat>
            <div :style="`height: ${height};
            background: url(${coverImage ? coverImage : '/cover.jpg'
                }), linear-gradient(to right, #000, #000);
            background-position: center;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;`" />
            <slot name="avatar">
                <div class="text-white absolute-center">
                    <base-avatar v-if="avatarImage" :src="avatarImage" :size="avatarSize" :style="{ top: avatarTop }"
                        :class="{ 'shadow-5': !avatarFlat }" />
                </div>
            </slot>
            <slot name="extra"/>
        </q-card>
        <slot name="description">
            <q-card-section class="text-center" :style="descriptionStyle">
                <q-item dense>
                    <q-item-section>
                        <q-item-label class="text-weight-bold" lines="1">
                            {{ name }}
                        </q-item-label>
                        <q-item-label caption>
                            {{ description }}
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </q-card-section>
        </slot>
    </q-card>
</template>