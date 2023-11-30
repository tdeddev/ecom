<script setup>
import { useRouter } from 'vue-router'

import Userlayout from '@/layouts/Userlayout.vue'
import Product from '@/components/Product.vue'
import { useProductStore } from '@/stores/user/product'
import { useCartStore } from '@/stores/user/cart'

const productStore = useProductStore()
const cartStore = useCartStore()
const router = useRouter()

const addToCart = (product) => {
  cartStore.addToCart(product)
  router.push({
    name: 'cart'
  })
}
</script>

<template>
    <Userlayout>
        <div class="hero h-96 bg-base-200">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-2xl font-bold">ผลงาน บริการติดตั้งเครื่องกรองของเรา</h1>
          <p class="py-3">Trust your intuition!</p>
        </div>
      </div>
    </div>
    <!-- Product shelf -->
    <Product 
    :products="productStore.list"
    :addToCart="addToCart"
    />
    </Userlayout>
</template>