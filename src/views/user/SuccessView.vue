<script setup>
import Userlayout from '@/layouts/Userlayout.vue'
import { useCartStore } from '@/stores/user/cart';
import { onMounted, ref } from 'vue';
const cartStore = useCartStore()
const orderData = ref({})
onMounted(() => {
    cartStore.loadCheckout()
    if(cartStore.checkout.orderNumber){
        orderData.value = cartStore.checkout
    }
})
</script>

<template>
    <Userlayout>
        <div class="max-w-2xl mx-auto border border-base-200 shadow-xl p-8 my-4">
            <div>
                <div class="text-2xl font-bold">คุณสั่งซื้อสินค้าสำเร็จ!</div>
                <div>สวัสดี {{ orderData.name }}</div>
                <div>เตรียมรอรับสินค้าของคุณได้เลย</div>
            </div>
            <div class="divider"></div>
            <div class="grid grid-cols-4 gap-2">
                <div>
                    <div class="font-bold">วันที่สั่งซื้อ</div>
                    <div>{{ orderData.createdDate }}</div>
                </div>
                <div>
                    <div class="font-bold">เลขที่สินค้า</div>
                    <div>{{ orderData.orderNumber }}</div>
                </div>
                <div>
                    <div class="font-bold">ช่องทางชำระเงิน</div>
                    <div>{{ orderData.paymentMethod }}</div>
                </div>
                <div>
                    <div class="font-bold">ที่อยู่จัดส่ง</div>
                    <div>{{ orderData.address }}</div>
                </div>
            </div>
            <div class="divider"></div>
            <div v-for="product in orderData.products" class="grid grid-cols-4 gap-2 mb-4 items-start">
                <div><img class="w-full" :src="product.imageUrl"></div>
                <div><b>{{ product.name }}</b></div>
                <div>จำนวน: {{ product.quantity }}</div>
                <div>ราคารวม: {{ product.price * product.quantity }} บาท</div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between">
                <div class="font-bold">ราคาสินค้าทั้งหมด</div>
                <div>{{ orderData.totalPrice }} บาท</div>
            </div>
            <div class="flex justify-between mt-4">
                <div class="font-bold">ค่าจัดส่ง</div>
                <div>0 บาท</div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between">
                <div class="font-bold">รวมราคาทั้งสิ้น</div>
                <div>{{ orderData.totalPrice }} บาท</div>
            </div>
            <div class="divider"></div>
            <div>ขอบคุณที่มาซื้อสินค้ากับเรา</div>
        </div>
    </Userlayout>
</template>