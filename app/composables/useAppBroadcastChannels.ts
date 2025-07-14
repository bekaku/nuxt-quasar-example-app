export const useAppBroadcastChannels = () => {
    const {
        send: sendReloadBroadcast,
        reopen: reopenReloadBroadcast,
        isClosed,
    } = useSafeBroadcastChannel<boolean>('app-reload-bradcast-channel')
    const sendBroradcastChanelReload = () => {
        return new Promise((resolve) => {
            if (isClosed.value) {
                reopenReloadBroadcast()
            }
            sendReloadBroadcast(true)
            resolve(true)
        })
    }
    return {
        sendBroradcastChanelReload
    }
}