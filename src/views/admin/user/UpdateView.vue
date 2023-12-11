<script setup>
import AdminLayout from '@/layouts/Adminlayout.vue'
import { useAdminUserStore } from '@/stores/admin/user'
import { onMounted, reactive, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useEventStore } from '@/stores/event'
let userIndex = ref('')
const formData = [
    {
        name: 'Name',
        field : 'fullname',
        type: 'text'
    },
    {
        name: 'Role',
        field : 'role',
        type: 'select',
        dropDownList : ['Admin', 'Support', 'Member']
    },
    {
        name: 'Status',
        field : 'status',
        type: 'select',
        dropDownList : ['เปิดใช้งาน', 'ปิดใช้งาน']
    },
]
const userData = reactive({
    fullname : '',
    role : '',
    status : ''
})
const route = useRoute()
const eventStore = useEventStore()
let adminUserStore = useAdminUserStore()
const updateUser = async () => {
    await adminUserStore.updateUser(userIndex.value, userData)
    eventStore.popMessage('info', 'แก้ไขข้อมูลสำเร็จ!')
}
onMounted(async () => {
    if(route.params.id){
        userIndex.value = route.params.id
        let selectedUser = await adminUserStore.getUser(userIndex.value)
        userData.fullname = selectedUser.fullname
        userData.role = selectedUser.role
        userData.status = selectedUser.status
    }
})
</script>
<template>
    <AdminLayout>
        <div class="shadow-xl p-8">
            <div class="text-3xl mt-4">แก้ไขข้อมูลสมาชิก</div>
            <div class="divider"></div>
            <div class="grid grid-cols-1 gap-2">
                <label v-for="(form, index) in formData" class="form-control w-full">
                    <div class="label">
                        <span class="label-text">{{ form.name }}</span>
                    </div>
                    <input v-model="userData[form.field]" v-if="form.type === 'text'" type="text" class="input input-bordered w-full" />
                    <select v-model="userData[form.field]" v-if="form.type === 'select'" class="input input-bordered w-full" >
                        <option v-for="item in form.dropDownList">{{ item }}</option>
                    </select>
                </label>
            </div>
            <div class="divider"></div>
            <div class="mt-6 flex justify-center gap-3">
                <RouterLink :to="{name : 'admin-users-list'}" class="btn btn-ghost">ยกเลิก</RouterLink>
                <RouterLink :to="{name : 'admin-users-list'}" class="btn btn-neutral" @click="updateUser">ยืนยัน</RouterLink>
            </div>
        </div>
    </AdminLayout>
</template>
