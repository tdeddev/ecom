<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAccountStore } from '@/stores/account';
import { useEventStore } from '@/stores/event'
let email = ref('')
let pass = ref('')
const accountStore = useAccountStore()
const eventStore = useEventStore()
const router = useRouter()
const login = async () => {
    try {
       await accountStore.signInAdmin(email.value, pass.value)
       router.push({name : 'admin-dashboard'})
       eventStore.popMessage('success', 'Login สำเร็จ!!')
    } catch (error) {
        eventStore.popMessage('warning', error.message)
    }
}
</script>

<template>
    <div class="flex h-screen items-center">
        <div class="flex-1 max-w-2xl shadow-xl mx-auto p-8">
            <div class="flex flex-col items-center">
                <div class="text-3xl">Login</div>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Email</span>
                    </div>
                    <input v-model="email" type="email" placeholder="Your Email" class="input input-bordered w-full" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Password</span>
                    </div>
                    <input v-model="pass" type="password" placeholder="Your Email" class="input input-bordered w-full" />
                </label>
                <button @click="login" class="btn btn-neutral mt-4 w-full">LOGIN</button>
            </div>
        </div>
    </div>
</template>