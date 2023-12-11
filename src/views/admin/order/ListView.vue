<script setup>
import AdminLayout from '@/layouts/Adminlayout.vue'
import TrashIcon from '@/components/icons/Trash.vue'
import EditIcon from '@/components/icons/Edit.vue'
import Table from '@/components/Table.vue'
import { useAdminOrderStore } from '@/stores/admin/order'
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const adminOrderStore = useAdminOrderStore()


</script>
<template>
    <AdminLayout>
        <div class="flex justify-between items-center my-4">
            <div class="text-3xl font-bold">
                รายการคำสั่งซื้อ
            </div>
        </div>
        <div class="divider"></div>
        <Table
        :headers="['ชื่อลูกค้า','ราคา','สถานะสินค้า','วันที่ทำรายการ','']"
        >
        <tr v-for="(order, index) in adminOrderStore.list">
            <td>{{ order.customerName }}</td>
            <td>{{ order.totalPrice }}</td>
            <td>{{ order.status }}</td>
            <td>{{ order.updatedAt }}</td>
            <td>
                <RouterLink :to="{name : 'admin-orders-detail',  params : { id : index}}" class="btn btn-neutral">รายละเอียด</RouterLink>
            </td>
        </tr>
        </Table>
    </AdminLayout>
</template>
