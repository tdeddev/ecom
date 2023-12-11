import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/user/HomeView.vue'
import SearchView from '@/views/user/SearchView.vue'
import ProfileView from '@/views/user/ProfileView.vue'
import CheckoutView from '@/views/user/CheckoutView.vue'
import CartView from '@/views/user/CartView.vue'
import SuccessView from '@/views/user/SuccessView.vue'
import AdminDashboard from '@/views/admin/DashboardView.vue'
import AdminLogin from '@/views/admin/LoginView.vue'

import AdminProductUpdate from '@/views/admin/product/UpdateView.vue'
import AdminProductList from '@/views/admin/product/ListView.vue'

import AdminOrderDetail from '@/views/admin/order/DetailView.vue'
import AdminOrderList from '@/views/admin/order/ListView.vue'

import AdminUserUpdate from '@/views/admin/user/UpdateView.vue'
import AdminUserList from '@/views/admin/user/ListView.vue'

import { useAccountStore } from '@/stores/account'
import { useCartStore } from '@/stores/user/cart'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/success',
      name: 'success',
      component: SuccessView
    },

    /* Admin Router  */
    {
      path: '/admin/dashboard',
      name : 'admin-dashboard',
      component: AdminDashboard
    },
    {
      path: '/admin/login',
      name : 'login',
      component: AdminLogin
    },
    {
      path: '/admin/products',
      name : 'admin-products-list',
      component: AdminProductList
    },
    {
      path: '/admin/products/create',
      name : 'admin-products-create',
      component: AdminProductUpdate
    },
    {
      path: '/admin/products/update/:id',
      name : 'admin-products-update',
      component: AdminProductUpdate
    },
    {
      path: '/admin/users',
      name : 'admin-users-list',
      component: AdminUserList
    },
    {
      path: '/admin/users/update/:id',
      name : 'admin-users-update',
      component: AdminUserUpdate
    },
    {
      path: '/admin/orders',
      name : 'admin-orders-list',
      component: AdminOrderList
    },
    {
      path: '/admin/orders/detail/:id',
      name : 'admin-orders-detail',
      component: AdminOrderDetail
    },
  ]
})
router.beforeEach(async(to, from, next) => {
  const accountStore = useAccountStore()
  await accountStore.checkAuth()
  const cartStore = useCartStore()
  await cartStore.loadCart()
  if(to.name.includes('admin') && !accountStore.isAdmin){
    next({name : 'home'})
  }else if(to.name == 'login' && accountStore.isAdmin){
    next({name : 'admin-dashboard'})
  }
  else{
    next()
  }
})
export default router
