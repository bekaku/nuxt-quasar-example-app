import { component as VueMoney } from '@coders-tm/vue-number-format';
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('money-vue', VueMoney);
})