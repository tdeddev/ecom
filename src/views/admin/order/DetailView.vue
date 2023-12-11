<script setup>
import AdminLayout from '@/layouts/Adminlayout.vue'
import TrashIcon from '@/components/icons/Trash.vue'
import EditIcon from '@/components/icons/Edit.vue'
import Table from '@/components/Table.vue'
import { useAdminOrderStore } from '@/stores/admin/order'
import { onMounted, reactive, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
let orderIndex = ref(-1)
const route = useRoute()
const adminOrderStore = useAdminOrderStore()
let orderData = ref({
    products : []
})
onMounted(() => {
    if(route.params.id){
        orderIndex.value = parseInt(route.params.id)
        const selectedOrder = adminOrderStore.getOrder(orderIndex.value)
        orderData.value = selectedOrder
    }
})
</script>
<template>
    <AdminLayout>
        <div class="shadow-xl p-8">
            <div class="text-3xl mt-4">รายละเอียดคำสั่งซื้อ</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <div class="font-bold">วันที่สร้างรายการ</div>
                    <div>{{ orderData.updatedAt }}</div>
                </div>
                <div>
                    <div class="font-bold">เลขที่รายการ</div>
                    <div>{{ orderData.no }}</div>
                </div>
                <div>
                    <div class="font-bold">วิธีชำระเงิน</div>
                    <div>{{ orderData.paymentMethod }}</div>
                </div>
                <div>
                    <div class="font-bold">ที่อยู่จัดส่ง</div>
                    <div>{{ orderData.address }}</div>
                </div>
            </div>
            <div class="divider"></div>
            <div v-for="product in orderData.products" class="grid grid-cols-4 items-center">
                <div class="mx-auto">
                    <img :src="product.imageUrl" class="p-2 w-40">
                </div>
                <div>
                    <div class="font-bold">{{ product.name }}</div>
                    <div>{{ product.description }}</div>
                </div>
                <div>จำนวน {{ product.quantity }} ชิ้น</div>
                <div>{{ product.price }} บาท</div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between p-8">
                <div class="font-bold">ราคาสินค้าทั้งหมด</div>
                <div>{{ orderData.totalPrice }} บาท</div>
            </div>
            <div class="flex justify-end mt-4">
                <RouterLink :to="{name : 'admin-orders-list'}" class="btn btn-ghost">Back</RouterLink>
            </div>
        </div>
    </AdminLayout>
</template>
