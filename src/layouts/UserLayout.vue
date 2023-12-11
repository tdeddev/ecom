<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useAccountStore } from '@/stores/account'
import { useCartStore } from '@/stores/user/cart'
let searchText = ref('')
let router = useRouter()
const cartStore = useCartStore()
const accountStore = useAccountStore()

const login = async () => {
  try {
    await accountStore.signInWithGoogle()
    window.location.reload()
  } catch (error) {
    console.log('error', error)
  }
}
const logout = async () => {
  try {
    await accountStore.logout()
    window.location.reload()
  } catch (error) {
    console.log('error', error)
  }
}

const handleSearch = (e) => {
  if (e.key === 'Enter') {
    router.push({
      name: 'search',
      query: {
        q: searchText.value
      }
    })
  }
}

</script>

<template>
  <div class="container mx-auto">
    <!-- Navbar -->
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <RouterLink :to="{ name: 'home' }" class="btn btn-ghost text-xl">บริษัท บ้านน้ำอาร์โอ จำกัด</RouterLink>
      </div>
      <div class="flex-none gap-2">
        <div class="form-control">
          <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" v-model="searchText"
            @keyup="handleSearch" />
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="badge badge-sm indicator-item">{{ cartStore.summaryQuantity }}</span>
            </div>
          </div>
          <div tabindex="0" class="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div class="card-body">
              <span class="font-bold text-lg">{{ cartStore.summaryQuantity }} ชิ้น</span>
              <span class="text-info">Subtotal: {{ cartStore.summaryPrice }} บาท</span>
              <div class="card-actions">
                <RouterLink :to="{ name: 'cart' }" class="btn btn-primary btn-block">View cart</RouterLink>
              </div>
            </div>
          </div>
        </div>
        <button @click="login" v-if="!accountStore.isLoggedIn" class="btn btn-ghost">LOGIN</button>
        <div v-else class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component"
                :src="accountStore.profile.imageUrl || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png'" />
            </div>
          </div>
          <ul class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <RouterLink :to="{ name: 'profile' }">Profile</RouterLink>
            </li>
            <li><a><button @click="logout">Logout</button></a></li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <slot></slot>

    <!-- Footer -->
    <footer class="footer footer-center p-4 bg-base-300 text-base-content">
      <aside>
        <p>Copyright © 2023 - All right reserved by บริษัท บ้านน้ำอาร์โอ จำกัด</p>
      </aside>
    </footer>
  </div>
</template>
