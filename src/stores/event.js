import { defineStore } from 'pinia'

export const useEventStore = defineStore('event', {
    state: () => ({
        alert: false,
        data: {}
    }),
    actions: {
        popMessage(status, message){
            this.data = {
                status,
                message
            }
            this.alert = true
            setTimeout(() => {
                this.clearPopup()
            }, 3000)
        },
        clearPopup(){
            this.alert = false
            this.data = {}
        }
    }
})