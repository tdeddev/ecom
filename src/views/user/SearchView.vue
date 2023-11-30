<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed, watch } from 'vue'

import Product from '@/components/Product.vue'
import Userlayout from '@/layouts/Userlayout.vue'

import { useProductStore } from '@/stores/user/product'
import { useCartStore } from '@/stores/user/cart'

const productStore = useProductStore()
const cartStore = useCartStore()
const route = useRoute()
const searchText = ref('')
const router = useRouter()
const filterProduct = computed(() => {
    return productStore.filterProducts(searchText.value)
})

const addToCart = (product) => {
  cartStore.addToCart(product)
  router.push({
    name: 'cart'
  })
}

watch(() => route.query.q, (newSearchText) => {
    searchText.value = newSearchText
},
    {
        immediate: true
    }
)
</script>

<template>
    <Userlayout>
        <div class="text-3xl m-4">ค้นหา: <b>{{ searchText }}</b></div>
        <Product :products="filterProduct" :addToCart="addToCart"></Product>
    </Userlayout>
</template>