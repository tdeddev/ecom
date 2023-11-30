<script setup>
import Userlayout from '@/layouts/Userlayout.vue'
import { reactive } from 'vue';


import { useCartStore } from '@/stores/user/cart'
import { RouterLink, useRouter } from 'vue-router';
const cartStore = useCartStore()
const router = useRouter()
const userFromData = reactive({
    email : '',
    name : '',
    address : '',
    note : ''
})
const fromData = [
    {
        name : 'Email',
        field : 'email'
    },
    {
        name : 'Name',
        field : 'name'
    },
    {
        name : 'Address',
        field : 'address'
    },
    {
        name : 'Note',
        field: 'note'
    }]

const payment = () => {
    cartStore.placeOrder(userFromData)
    router.push({name : 'success'})
}
</script>

<template>
    <Userlayout>
        <div class="flex">
            <section class="flex-auto w-64 bg-base-200 p-8">
                <div v-for="from in fromData" class="form-control w-full">
                    <label class="label">
                        <span class="label-text">{{ from.name }}</span>
                    </label>
                    <textarea v-if="from.name == 'Address'" v-model="userFromData[from.field]" class="textarea textarea-bordered h-36" placeholder="199/19 หมู่ 3 อำเภอเมือง ตำบลในเมือง จังหวัดนครศรีธรรมราช 80000"></textarea>
                    <input v-else v-model="userFromData[from.field]" type="text" placeholder="Type here" class="input input-bordered w-full" />
                </div>
                <button class="btn btn-neutral w-full mt-3" @click="payment">ชำระเงิน</button>
            </section>
            <section class="flex-auto w-32 bg-slate-200 px-2">
                <div v-for="item in cartStore.items" class="flex bg-gray-300 m-8 py-4">
                    <div class="flex-1">
                        <img :src="item.imageUrl" class="p-2 pr-3">
                    </div>
                    <div class="flex-1">
                        <div class="flex flex-col justify-between h-full">
                            <div>
                                <div><b>{{ item.name }}</b></div>
                                <div>จำนวน: {{ item.quantity }}</div>
                            </div>
                            <RouterLink :to="{name : 'cart'}" class="btn btn-outline m-4">แก้ไขสินค้า</RouterLink>
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="p-4">
                    <div><b>Order Summary</b></div>
                    <div class="flex justify-between mt-2">
                        <div>ราคาสินค้าทั้งหมด</div>
                        <div>{{ cartStore.summaryPrice }} บาท</div>
                    </div>
                    <div class="flex justify-between mt-2">
                        <div>ค่าจัดส่ง</div>
                        <div>0 บาท</div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="flex justify-between p-4 mb-4">
                    <div>ราคาทั้งหมด</div>
                    <div>{{ cartStore.summaryPrice }} บาท</div>
                </div>
            </section>
        </div>
    </Userlayout>
</template>