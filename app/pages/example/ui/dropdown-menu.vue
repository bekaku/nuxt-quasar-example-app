<script setup lang="ts">
import {
    biChat,
    biCopy,
    biCreditCard,
    biDisplay,
    biEnvelope,
    biGear,
    biPencil,
    biPeople,
    biPerson,
    biPersonPlus,
    biPlusCircle,
    biThreeDots,
    biTrash
} from '@quasar/extras/bootstrap-icons';
import { ref } from 'vue';
import type { LabelValue } from '~/types/common';
useHead({
    title: 'Dropdown menu'
})
const showMenu = ref(false);
const menus = ref<LabelValue<number>[]>([
    {
        label: 'Edit',
        description: 'edit this item',
        icon: biPencil,
        fetch: false,
        value: 1
    },
    {
        label: 'Delete',
        icon: biTrash,
        color: 'negative',
        fetch: false,
        value: 2
    },
    {
        label: 'Copy',
        description: 'Copy this item',
        icon: biCopy,
        fetch: false,
        value: 3
    }
]);
const menus2: LabelValue<number>[] = [
    {
        label: 'Cody Fisher',
        value: 1,
        description: 'Fisher',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg'
    },
    {
        label: 'Robert Fox',
        value: 2,
        description: 'Fox',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
    },
    {
        label: 'Esther Howard',
        value: 3,
        description: 'Howard',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
    },
    {
        label: 'Darlene Robertson',
        value: 4,
        description: 'Robertson',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
    },
    {
        label: 'Ralph Edwards',
        value: 5,
        description: 'Edwards',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png'
    },
];
const submenus: LabelValue<string>[] = [
    {
        label: 'Cody Fisher',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
        border: true
    },
    {
        label: 'Profile',
        value: 'Profile',
        icon: biPerson
    },
    {
        label: 'Billing',
        value: 'Billing',
        icon: biCreditCard
    },
    {
        label: 'Keyboard shortcuts',
        value: 'Keyboard',
        icon: biDisplay,
        border: true
    },
    {
        label: 'Team',
        value: 'Team',
        icon: biPeople
    },
    {
        label: 'Invite users',
        icon: biPersonPlus,
        children: [
            {
                label: 'Email',
                value: 'Email',
                icon: biEnvelope,
            },
            {
                label: 'Message',
                value: 'Message',
                icon: biChat,
            },
            {
                label: 'More',
                icon: biPlusCircle,
                children: [
                    {
                        label: 'Message',
                        value: 'Message',
                        icon: biChat,
                    },
                    {
                        label: 'Email',
                        value: 'Email',
                        icon: biEnvelope,
                    },
                ]
            },
        ]
    },
];
const onMenuClick = (value: number |string | undefined) => {
    console.log('onMenuClick', value);
    showMenu.value = false;
}
const openMenu = (event: any) => {
    if (event) {
        event.stopImmediatePropagation();
    }
    showMenu.value = true;
};
const onItemClick = () => {
    console.log('onItemClick');
}

</script>
<template>
    <QuasarPage>
        <QuasarCard>
            <q-card-section class="q-gutter-md">
                <div class="text-h6">Menu</div>
                <q-separator />
                <QuasarButton :icon="biThreeDots" outline label="Simple menu">
                    <QuasarDropdownMenu :items="menus" @on-click="onMenuClick" />
                </QuasarButton>
                <QuasarButton :icon="biThreeDots" outline label="Submenus">
                    <QuasarDropdownMenu :items="submenus" @on-click="onMenuClick" />
                </QuasarButton>
                <q-item clickable @click="onItemClick">
                    <q-item-section>
                        Q-item open state
                    </q-item-section>
                    <q-item-section side>
                        <!-- <QuasarButton dense :icon="biThreeDots" round flat @click="openMenu($event)" />
                        <q-menu v-model="showMenu" cover anchor="top middle">
                            <QuasarDropdownMenuItem v-for="(item, index) in menus2" :key="`app-menu-${item.value}-${index}`"
                                v-close-popup :item="item" @click="onMenuClick(item.value)" />
                        </q-menu> -->
                        <QuasarButton :icon="biThreeDots" outline label="Click here" @click="openMenu($event)">
                            <QuasarDropdownMenu v-model:open="showMenu" :items="menus2" @on-click="onMenuClick" />
                        </QuasarButton>
                    </q-item-section>
                </q-item>
            </q-card-section>
        </QuasarCard>
    </QuasarPage>
</template>