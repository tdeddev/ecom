<script setup>
import AdminLayout from '@/layouts/Adminlayout.vue'

import TrashIcon from '@/components/icons/Trash.vue'
import EditIcon from '@/components/icons/Edit.vue'
import Table from '@/components/Table.vue'
import Pagination from '@/components/Pagegination.vue'

import { useAdminProductStore } from '@/stores/admin/product'
import { RouterLink } from 'vue-router';
import { onMounted, ref } from 'vue';

const adminProduct = useAdminProductStore()
let currentPage = ref(1)
onMounted(async () => {
    await adminProduct.loadProduct()
})

const removeProduct = async (index) => {
    try {
        await adminProduct.removeProduct(index)
        await adminProduct.loadProduct()
    } catch (error) {
        console.log(error);
    }
}

const searchProduct = async () => {
    await adminProduct.loadProduct()
}
const changeStatusFilter = async (newStatus) => {
    adminProduct.filter.status = newStatus
    await adminProduct.loadProduct()
}

const changeDateFilter = async (newFilter) => {
    adminProduct.filter.sort.updateAt = newFilter
    await adminProduct.loadProduct()
}

const changePage = async (newPage) => {
    if(newPage < currentPage.value){
        //ย้อนกลับ
        await adminProduct.loadNextPage('previous')
    } else if (newPage > currentPage.value){
        //ไปข้างหน้า
        await adminProduct.loadNextPage('next')
    }
    currentPage.value = newPage
}
</script>
<template>
    <AdminLayout>
        <div class="flex justify-between items-center my-4">
            <div class="text-3xl font-bold">
                รายการสินค้า
            </div>
        </div>
        <div class="flex gap-4 items-center">
            <div class="flex-1">
                <input v-model="adminProduct.filter.search" type="text" class="input input-bordered w-1/2 me-2" placeholder="ค้นหาด้วยชื่อสินค้า">
                <button @click="searchProduct" class="btn btn-primary">ค้นหา</button>
            </div>
            <div class="flex-1 ms-4">
                <div>ค้นหาจากวันที่อัพเดท/สร้าง</div>
                <div class="join">
                    <button class="btn join-item"
                    @click="changeDateFilter('asc')"
                    :class="adminProduct.filter.sort.updateAt == 'asc'?'btn-active' : ''">
                    Old</button>
                    <button class="btn join-item"
                    @click="changeDateFilter('desc')"
                    :class="adminProduct.filter.sort.updateAt == 'desc'?'btn-active' : ''">
                    New</button>
                </div>
            </div>
            <div class="flex-1">
                <div>ค้นหาจากสถานะ</div>
                <div class="join">
                    <button @click="changeStatusFilter('open')" 
                    class="btn join-item"
                    :class="adminProduct.filter.status == 'open'?'btn-active' : ''">
                    Open</button>
                    <button @click="changeStatusFilter('close')" 
                    class="btn join-item"
                    :class="adminProduct.filter.status == 'close'?'btn-active' : ''">
                    Close</button>
                </div>
            </div>
            <div class="flex-1">
                <RouterLink :to="{ name: 'admin-products-create' }" class="btn btn-neutral">เพิ่มสินค้า</RouterLink>
            </div>

        </div>
        <div class="divider"></div>

        <Table :headers="['ลำดับ', 'ชื่อสินค้า', 'รูปภาพสินค้า', 'ราคาสินค้า', 'จำนวนสินค้า', 'สถานะสินค้า', 'วันที่อัพเดท', '']">
            <!-- head -->
            <tr v-for="(product, index) in adminProduct.list" :key="index">
                <td>{{ index + 1 }}</td>
                <th>{{ product.name }}</th>
                <td><img :src="product.imageUrl" class="w-24" /></td>
                <td>{{ product.price }}</td>
                <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
                <td>
                    <div class="badge" :class="product.status === 'open' ? 'badge-success' : 'badge-error'">{{ product.status
                    }}</div>
                </td>
                <td>{{ product.date }}</td>
                <td>
                    <div class="flex gap-2">
                        <RouterLink :to="{ name: 'admin-products-update', params: { id: product.productId } }"
                            class="btn btn-ghost">
                            <EditIcon></EditIcon>
                        </RouterLink>
                        <div @click="removeProduct(product.productId)" class="btn btn-ghost">
                            <TrashIcon></TrashIcon>
                        </div>
                    </div>
                </td>
            </tr>
        </Table>
        <Pagination
            :activePage="currentPage"
            :maxPage="adminProduct.totalPage"
            :changePage="changePage"
        >
        </Pagination>
    </AdminLayout>
</template>
