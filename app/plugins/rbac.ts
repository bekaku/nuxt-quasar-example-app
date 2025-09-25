import type { DirectiveBinding } from 'vue'
import type { RBACProps } from '~/types/props'
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('rbac', {
        mounted(el: HTMLElement, binding: DirectiveBinding<RBACProps | undefined>) {
            const { value: rbac } = binding
            const { hasPermission } = useRbac()
            if (!hasPermission(rbac)) {
                el.remove() // Cleanly remove unauthorized element from DOM
            }
        }
    })
})