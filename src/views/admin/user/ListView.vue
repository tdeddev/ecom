<script setup>
import { RouterLink } from 'vue-router';
import AdminLayout from '@/layouts/Adminlayout.vue'
import TrashIcon from '@/components/icons/Trash.vue'
import EditIcon from '@/components/icons/Edit.vue'
import Table from '@/components/Table.vue'

import { useAdminUserStore } from '@/stores/admin/user'
import { onMounted } from 'vue';

let adminUserStore = useAdminUserStore()
const changeStatus = async (index) => {
    let selectedUser = adminUserStore.list[index]
    selectedUser.status = selectedUser.status === 'เปิดใช้งาน' ? 'ปิดใช้งาน': 'เปิดใช้งาน'
    await adminUserStore.updateUser(selectedUser.uid, selectedUser)
}
onMounted(async () => {
    await adminUserStore.loadUser()
})
</script>
<template>
    <AdminLayout>
        <div class="flex justify-between items-center my-4">
            <div class="text-3xl font-bold">
                จัดการสมาชิก
            </div>
            <!-- <div>
                <RouterLink :to="{name : 'admin-users-create'}" class="btn btn-neutral">เพิ่มสมาชิก</RouterLink>
            </div> -->
        </div>
        <div class="divider"></div>
        <Table :headers="['ลำดับ','ชื่อ','ต่ำแหน่ง','สถานะ','วันที่สร้าง/แก้ไข','']">
            <tr v-for="(user, index) in adminUserStore.list" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ user.fullname }}</td>
                <td>{{ user.role }}</td>
                <td>
                    <div>
                        <span 
                        class="badge"
                        :class="user.status == 'เปิดใช้งาน'? 'badge-success' : 'badge-error'"
                        >
                        {{ user.status }}
                        </span>
                    </div>
                </td>
                <td>{{ user.updatedAt }}</td>
                <td>
                    <div class="flex gap-3">
                        <RouterLink :to="{name : 'admin-users-update', params: {id : user.uid}}" class="btn btn-info"><EditIcon>แก้ไข</EditIcon></RouterLink>
                        <div class="btn btn-ghost" @click="changeStatus(index)">{{ user.status === 'เปิดใช้งาน' ? 'ปิดใช้งาน' : 'เปิดใช้งาน' }}</div>
                    </div>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>
