import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useTestStore = defineStore('testStore', () => {
    const counter = ref(0);
    const setIncrement = () => {
        counter.value++;
    };
    const setDecrement = () => {
        counter.value--;
    };
    return {
        counter,
        setIncrement,
        setDecrement
    };
});
