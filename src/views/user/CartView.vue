<script setup>
import { onMounted } from 'vue';

import Userlayout from '@/layouts/Userlayout.vue'
import Close from '@/components/icons/Close.vue'

import { useCartStore } from '@/stores/user/cart'
import { RouterLink } from 'vue-router';

const cartStore = useCartStore()

const updateQuantity = (event, index) => {
    const newQuantity = parseInt(event.target.value)
    cartStore.UpdateQuantity(index, newQuantity)
}

</script>

<template>
    <Userlayout>
        <h1 class="text-3xl font-bold m-4">Shopping Cart</h1>
        <div class="flex">
            <div class="flex-auto w-64 bg-base-200 p-4">
                <div v-if="cartStore.items.length === 0" class="font-bold">
                    Cart is empty (ไม่มีสินค้าในตระกร้า)
                </div>
                <div v-else v-for="(item, index) in cartStore.items" class="flex">
                    <div class="flex-1">
                        <img class="w-full p-8" :src="item.imageUrl">
                    </div>
                    <div class="flex-1">
                        <div class="flex flex-col justify-between h-full">
                            <div>
                                <div class="relative grid grid-cols-2">
                                    <div>
                                        <div><b>{{ item.name }}</b></div>
                                        <!-- <div>{{ item.about }}</div> -->
                                        <div>ราคาต่อชิ้น : {{ item.price }} บาท</div>
                                    </div>
                                    <div>
                                        <select v-model="item.quantity" class="select select-warning w-1/2" @change="updateQuantity($event, index)">
                                            <option v-for="quantity in [1,2,3,4,5]" :value="quantity">{{quantity}}</option>
                                        </select>
                                    </div>
                                    <div class="absolute top-0 right-5" @click="cartStore.removeItemInCart(index)">
                                        <Close></Close>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <b>In Stock</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-auto w-32 bg-slate-200 p-4">
                <div class="text-xl font-bold">Order Summary</div>
                <div class="my-4 divide-y divide-black">
                    <div class="flex justify-between py-4">
                        <div>ราคาสินค้าทั้งหมด</div>
                        <div>{{ cartStore.summaryPrice }} บาท</div>
                    </div>
                    <div class="flex justify-between py-4">
                        <div>ค่าส่งสิ้นค้า</div>
                        <div>0 บาท</div>
                    </div>
                    <div class="flex justify-between py-4">
                        <div>ราคารวมทั้งหมด</div>
                        <div>{{ cartStore.summaryPrice }} บาท</div>
                    </div>
                    <RouterLink :to="{name : 'checkout'}" class="btn btn-neutral w-full mt-3">ชำระเงิน</RouterLink>
                </div>
            </div>
        </div>
    </Userlayout>
</template>