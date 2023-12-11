<script setup>
import { defineProps } from 'vue'
defineProps({
    activePage : Number,
    maxPage : Number,
    changePage : Function
})
</script>
<template>
    <div class="flex justify-center my-4">
        <div class="join">
            <button class="join-item btn"
            v-if="activePage - 1 > 0"
            @click="changePage(activePage - 1)"
            >
                «
            </button>
            <button class="join-item btn">Page {{ activePage }} / {{ maxPage }}</button>
            <button class="join-item btn"
            @click="changePage(activePage + 1)"
            v-if="activePage + 1 <= maxPage"
            >
                »
            </button>
        </div>
    </div>
</template>