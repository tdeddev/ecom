<script setup>
import { onMounted, ref } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { useAccountStore } from '@/stores/account'
import { useEventStore } from '@/stores/event'
const eventStore = useEventStore()
const route = useRoute()
const activeMenu = ref('')
const accountStore = useAccountStore()
const router = useRouter()
onMounted(() => {
    activeMenu.value = route.name
})
const menus = [
    {
        name: 'Dashboard',
        routeName: 'admin-dashboard'
    },
    {
        name: 'User',
        routeName: 'admin-users-list'
    },
    {
        name: 'Product',
        routeName: 'admin-products-list'
    },
    {
        name: 'Order',
        routeName: 'admin-orders-list'
    },
]

const logout = async () => {
    try {
       await accountStore.logout()
       eventStore.popMessage('success', 'Logout สำเร็จ!')
        router.push({name : 'login'})
    } catch (error) {
        eventStore.popMessage('success', 'Logout สำเร็จ!')
    }
}


</script>

<template>
    <div class="drawer drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content mx-4">
            <slot></slot>
        </div> 
        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
            <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                <li class="text-2xl font-bold">
                    <a>ADMIN BACKOFFICE</a>
                </li>
                <div class="ms-16 mb-2">
                    <a class="font-bold text-lg">User : {{ accountStore.profile.fullname }}</a> <br>
                    <a class="font-bold text-lg">Role : {{ accountStore.profile.role }}</a>
                </div>
                <!-- Sidebar content here -->
                <li v-for="menu in menus">
                    <RouterLink :class="menu.routeName === activeMenu ?'active': ''" :to="{name : menu.routeName}">{{ menu.name }}</RouterLink>
                </li>
                <li>
                    <a @click="logout">Logout</a>
                </li>
            </ul>
        
        </div>
    </div>
    
</template>