import { ref, watch, shallowRef, onUnmounted } from 'vue'
import { useBroadcastChannel } from '@vueuse/core'

const TAB_ID = (() => {
    if (process.env.SERVER) {
        return null;
    }
    const key = 'app-tab-id'
    let id = sessionStorage.getItem(key)
    if (!id) {
        id = crypto.randomUUID()
        sessionStorage.setItem(key, id)
    }
    return id
})()

export function useSafeBroadcastChannel<T>(name: string) {
    const payload = ref<T | null>(null)
    const isClosed = ref(false)

    const channel = shallowRef<ReturnType<typeof useBroadcastChannel> | null>(null)

    const setupChannel = () => {
        const c: any = useBroadcastChannel<any, { senderId: string, payload: T }>({ name })

        watch(c.data, (msg) => {
            if (!msg || msg.senderId === TAB_ID)
                return
            payload.value = msg.payload
        })

        channel.value = c
        isClosed.value = false
    }

    const send = (val: T) => {
        if (channel.value && !isClosed.value && channel.value.isSupported.value) {
            channel.value.post({ senderId: TAB_ID, payload: val })
        } else {
            console.warn(`[BroadcastChannel:${name}] Cannot post — channel is closed`)
        }
    }

    const close = () => {
        if (channel.value) {
            channel.value.close()
            isClosed.value = true
            channel.value = null
        }
    }

    const reopen = () => {
        if (isClosed.value) {
            setupChannel()
        }
    }

    // Auto-setup on first use
    setupChannel()

    onUnmounted(() => {
        close()
    })

    return {
        payload,
        send,
        close,
        reopen,
        isClosed,
    }
}