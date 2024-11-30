<template>
    <q-avatar :size="size" :square="square" :rounded="rounded" v-bind="$attrs" :color="color">
        <slot>
            <template v-if="!fetch">
                <q-img :src="src"
                    :class="{ 'bordered': bordered, 'avatar-rounded': !square && rounded, 'avatar-round': !square && !rounded }"
                    :spinner-color="spinnerColor" no-native-menu />
            </template>
            <template v-else>
                <base-image v-if="src" :src="src"
                    :class="{ 'bordered': bordered, 'avatar-rounded': !square && rounded, 'avatar-round': !square && !rounded }"
                    :ratio="1" :fetch="fetch">
                </base-image>
            </template>
            <slot name="extra"></slot>
        </slot>
    </q-avatar>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
    src: string;
    spinnerColor?: string;
    color?: string;
    imgBg?: string;
    ratio?: number;
    size?: string;
    square?: boolean;
    rounded?: boolean;
    fetch?: boolean;
    bordered?: boolean;
    borderedColor?: string;
    borderedWidth?: string;
}>(),
    {
        spinnerColor: 'white',
        imgBg: 'bg-grey-8',
        ratio: 4 / 3,
        size: '32px',
        square: false,
        rounded: false,
        fetch: false,
        bordered: false,
        borderedColor: '#fff',
        borderedWidth: '2px',
    }
);
</script>
<style lang="scss" scoped>
.bordered {
    border: v-bind(borderedWidth) solid v-bind(borderedColor)
}

.avatar-holder {
    display: flex;
}

.avatar {
    width: v-bind(size);
    height: v-bind(size);
}

.avatar-round {
    border-radius: 50%;
}

.avatar-rounded {
    border-radius: 10px;
}
</style>