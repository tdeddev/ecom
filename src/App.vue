<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useCartStore } from '@/stores/user/cart'
import { useEventStore } from '@/stores/event'

const cartStore = useCartStore()
const eventStore = useEventStore()

onMounted(() => {
})
</script>

<template>
  <div v-if="eventStore.alert" class="toast">
    <div class="alert" :class="`alert-${eventStore.data.status}`">
      <span class="text-2xl">{{ eventStore.data.message }}</span>
    </div>
  </div>
  <RouterView />
</template>
