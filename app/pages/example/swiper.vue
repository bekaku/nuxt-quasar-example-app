<script setup lang="ts">
import type { BaseSwiperSlides } from '#components';
import { biArrowLeft, biArrowRight } from '@quasar/extras/bootstrap-icons';
import type { SlideOptions } from '~/types/common';

const { t } = useLang();
useHead({
    title: 'Swipper'
})
const testSwiperRef = useTemplateRef<InstanceType<typeof BaseSwiperSlides>>('testSwiperRef');
// Create 10 slides
const slides = ref(Array.from({ length: 10 }))
const slideOpts: SlideOptions = {
    initialSlide: 0,
    slidesPerView: 4.7,
    spaceBetween: 5,
    centeredSlides: false,
    navigation: true,
    autoplay: false,
    // style: {
    //     '--swiper-navigation-color': '#00aba9',
    //     '--swiper-pagination-color': '#00aba9',
    // },
    loop: true,
    pagination: true,
    paginationDynamic: true,
    paginationType: 'bullets',
    effect: 'slide',
    zoom: true
};
const slideOptsVertical: SlideOptions = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 3.7,
    spaceBetween: 5,
    centeredSlides: false,
    navigation: true,
    autoplay: false,
    pagination: true,
    paginationDynamic: false,
    paginationType: 'progressbar',
    direction: 'vertical',
    effect: 'slide',
    zoom: true
};
const items = [
    {
        id: 1,
        name: 'Cody Fisher',
        time: '12.30',
        new: 9,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
        message: 'Hey there! I\'ve heard about PrimeVue. Any cool tips for getting started?'
    },
    {
        id: 2,
        name: 'PrimeTek Team',
        time: '12.30',
        new: 0,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
        message: 'Let\'s implement PrimeVue. Elevating our UI game! 🚀'
    },
    {
        id: 3,
        name: 'Robert Fox',
        time: '12.30',
        new: 8,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
        message: 'Interesting! PrimeVue sounds amazing. What\'s your favorite feature?\n'
    },
    {
        id: 4,
        name: 'Esther Howard',
        time: '12.30',
        new: 1,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
        message: 'Quick one, team! Anyone'
    },
    {
        id: 5,
        name: 'Darlene Robertson',
        time: '12.30',
        new: 0,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
        message: 'ust explored PrimeVue\'s themes'
    },
    {
        id: 6,
        name: 'Ralph Edwards',
        time: '12.30',
        new: 0,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png',
        message: 'PrimeVue is a game-changer, righ'
    },
    {
        id: 7,
        name: 'Darrell Steward',
        time: '12.30',
        new: 0,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png',
        message: 'Reflecting on PrimeVue\'s impact o'
    },
    {
        id: 8,
        name: 'PrimeTek Team',
        time: '12.30',
        new: 0,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar-primetek.png',
        message: 'Let\'s implement PrimeVue'
    },
    {
        id: 9,
        name: 'Cody Fisher',
        time: '12.30',
        new: 9,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
        message: 'Hey there! I\'ve heard about PrimeVue. Any cool tips for getting started?'
    },
    {
        id: 10,
        name: 'PrimeTek Team',
        time: '12.30',
        new: 0,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
        message: 'Let\'s implement PrimeVue. Elevating our UI game! 🚀'
    },
    {
        id: 11,
        name: 'Robert Fox',
        time: '12.30',
        new: 8,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
        message: 'Interesting! PrimeVue sounds amazing. What\'s your favorite feature?\n'
    },
    {
        id: 12,
        name: 'Esther Howard',
        time: '12.30',
        new: 1,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
        message: 'Quick one, team! Anyone'
    },
    {
        id: 13,
        name: 'Darlene Robertson',
        time: '12.30',
        new: 0,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
        message: 'ust explored PrimeVue\'s themes'
    },
    {
        id: 14,
        name: 'Ralph Edwards',
        time: '12.30',
        new: 0,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png',
        message: 'PrimeVue is a game-changer, righ'
    },
    {
        id: 15,
        name: 'Darrell Steward',
        time: '12.30',
        new: 0,
        online: true,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png',
        message: 'Reflecting on PrimeVue\'s impact o'
    },
    {
        id: 16,
        name: 'PrimeTek Team',
        time: '12.30',
        new: 0,
        online: false,
        image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar-primetek.png',
        message: 'Let\'s implement PrimeVue'
    }
];
</script>
<template>
    <BasePage padding class="content-limit">

        <div class="row">
            <div class="col col-md-6 q-pa-sm">
                <BaseCard title="Horizontal">
                    <q-card-section>
                        <base-swiper-slides ref="testSwiperRef" :params="slideOpts">
                            <swiper-slide v-for="(item, i) in items" :key="i">
                                <q-card flat class="text-center" style="height: 150px;">
                                    <base-ripple-item>
                                        <base-avatar rounded :src="item.image" size="56px" />
                                        <q-item>
                                            <q-item-section>
                                                <q-item-label lines="1">
                                                    {{ item.name }}
                                                </q-item-label>
                                                <q-item-label caption lines="1" class="q-text-caption">
                                                    {{ item.time }}
                                                </q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </base-ripple-item>
                                </q-card>
                            </swiper-slide>

                            <template #start>
                                Slot start
                            </template>
                            <template #end>
                                <q-card-actions  v-if="testSwiperRef"  align="around">
                                    <BaseButton label="Prev" light :icon="biArrowLeft" @click="testSwiperRef.onPrev()" />
                                    <BaseButton label="Next" light :icon="biArrowRight" @click="testSwiperRef.onNext()" />
                                </q-card-actions>
                            </template>
                        </base-swiper-slides>
                    </q-card-section>
                </BaseCard>
            </div>
            <div class="col col-md-6 q-pa-sm">
                <BaseCard title="Virtical">
                    <q-card-section>
                        <base-swiper-slides :params="slideOptsVertical" style="height: 400px;">
                            <swiper-slide v-for="(item, i) in items" :key="`virtical-${i}`">
                                <q-card flat class="text-center" style="height: 150px;">
                                    <base-ripple-item>
                                        <base-avatar rounded :src="item.image" size="56px" />
                                        <q-item>
                                            <q-item-section>
                                                <q-item-label lines="1">
                                                    {{ item.name }}
                                                </q-item-label>
                                                <q-item-label caption lines="1" class="q-text-caption">
                                                    {{ item.time }}
                                                </q-item-label>
                                            </q-item-section>
                                        </q-item>
                                    </base-ripple-item>
                                </q-card>
                            </swiper-slide>
                        </base-swiper-slides>
                    </q-card-section>
                </BaseCard>
            </div>
            <div class="col col-md-6 q-pa-sm">
                <BaseCard title="Card">
                    <q-card-section>
                        <base-swiper-slides :params="{
                            slidesPerView: 1,
                            spaceBetween: 5,
                            navigation: true,
                            pagination: true,
                            paginationDynamic: true,
                            paginationType: 'bullets',
                            effect: 'cards',
                            grabCursor: true,
                            loop: true,
                            speed: 800
                        }" style="height: 350px; width: 250px;">
                            <swiper-slide v-for="(item, i) in items" :key="`card-${i}`">
                                <q-card flat bordered class="text-center cursor-pointer" style="height:300px;">
                                    <base-image :src="item.image" />
                                    <q-item>
                                        <q-item-section>
                                            <q-item-label lines="1">
                                                {{ item.name }}
                                            </q-item-label>
                                            <q-item-label caption lines="1" class="q-text-caption">
                                                {{ item.time }}
                                            </q-item-label>
                                        </q-item-section>
                                    </q-item>
                                </q-card>
                            </swiper-slide>
                        </base-swiper-slides>
                    </q-card-section>
                </BaseCard>
            </div>
            <div class="col-12 q-pa-sm">
                <BaseCard title="Grid">
                    <q-card-section>
                        <ClientOnly>
                            <base-swiper-slides :params="{
                                initialSlide: 0,
                                slidesPerView: 5,
                                spaceBetween: 30,
                                pagination: true,
                                gridRows: 2
                            }" style="height: 350px;">
                                <swiper-slide v-for="(item, i) in items" :key="`gird-row-${i}`">
                                    <q-card bordered flat class="text-center q-my-sm" style="height: 150px;">
                                        <base-ripple-item>
                                            <base-avatar rounded :src="item.image" size="56px" />
                                            <q-item>
                                                <q-item-section>
                                                    <q-item-label lines="1">
                                                        {{ item.name }}
                                                    </q-item-label>
                                                    <q-item-label caption lines="1" class="q-text-caption">
                                                        {{ item.time }}
                                                    </q-item-label>
                                                </q-item-section>
                                            </q-item>
                                        </base-ripple-item>
                                    </q-card>
                                </swiper-slide>
                            </base-swiper-slides>
                        </ClientOnly>
                    </q-card-section>
                </BaseCard>
            </div>
        </div>
    </BasePage>
</template>
<style lang="scss" scoped>
.btn-fixed-width {
    width: 200px
}

.swiperslide {
    height: 100px;
    border: 1px solid red;
}
</style>