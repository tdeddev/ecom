<script setup>
import { useRouter, useRoute, RouterLink } from 'vue-router';
import { onMounted, reactive } from 'vue';
import AdminLayout from '@/layouts/Adminlayout.vue'
import { useAdminProductStore } from '@/stores/admin/product'
import { useEventStore } from '@/stores/event'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '@/firebase'
const formData = [
    {
        name: 'ชื่อสินค้า',
        field: 'name',
        type: 'text'
    },
    {
        name: 'ราคาสินค้า',
        field: 'price',
        type: 'number'
    },
    {
        name: 'จำนวนสินค้า',
        field: 'quantity',
        type: 'number'
    },
    {
        name: 'รูปภาพสินค้า',
        field: 'imageUrl',
        type: 'upload-image'
    },
    {
        name: 'รายละเอียดสินค้า',
        field: 'about',
        type: 'textarea'
    },
]

const productData = reactive({
    name: '',
    imageUrl: '',
    price: 0,
    quantity: 0,
    about: '',
    status: ''
})
const eventStore = useEventStore()
const adminProduct = useAdminProductStore()
const router = useRouter()
const route = useRoute()
let productIndex = reactive('')
let mode = reactive('เพิ่มสินค้า')

const update = async () => {
    try {
        if (mode === 'เพิ่มสินค้า') {
            await adminProduct.addProduct(productData)
        } else {
            await adminProduct.updateProduct(productIndex, productData)
        }
        eventStore.popMessage('info', `${mode}สำเร็จ!`)
        router.push({ name: 'admin-products-list' })
    } catch (error) {
        console.log('error', error);
    }
}

const handleFileUpload = async (event) => {
    const file = event.target.files[0]

    let mainPath = ''

    if (productIndex !== -1) {
        mainPath = productIndex.value + '-'
    }

    if (file) {
        const uploadRef = storageRef(storage, `products/${mainPath}${file.name}`)
        const snapshot = await uploadBytes(uploadRef, file)
        const downloadUrl = await getDownloadURL(snapshot.ref)
        productData.imageUrl = downloadUrl
    }
}


onMounted(async () => {
    if (route.params.id) {
        productIndex = route.params.id
        mode = 'แก้ไขสินค้า'
        const selectedProduct = await adminProduct.getProduct(productIndex)
        productData.name = selectedProduct.name
        productData.imageUrl = selectedProduct.imageUrl
        productData.price = selectedProduct.price
        productData.quantity = selectedProduct.quantity
        productData.about = selectedProduct.about
        productData.status = selectedProduct.status
    }
})
</script>
<template>
    <AdminLayout>
        <div class="shadow-xl p-8">
            <div class="text-3xl mt-4">{{ mode }}</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-2">
                <label v-for="form in formData" class="form-control w-full">
                    <div class="label">
                        <span class="label-text">{{ form.name }}</span>
                    </div>
                    <input :type="form.type" v-if="form.type != 'textarea' && form.type != 'upload-image'"
                        v-model="productData[form.field]" class="input input-bordered w-full" />
                    <textarea v-if="form.type == 'textarea'" v-model="productData[form.field]" placeholder="รายละเอียด"
                        class="textarea textarea-bordered textarea-lg w-full"></textarea>
                    <div v-if="form.type == 'upload-image'">
                        <div class="card w-3/5 bg-base-100 shadow-xl">
                            <figure>
                                <img :src="productData[form.field]" />
                            </figure>
                            <div class="card-body">
                                <input type="file" @change="handleFileUpload" />
                            </div>
                        </div>
                    </div>
                </label>
            </div>
            <div class="divider"></div>
            <div class="label">
                <span class="label-text">สถานะสินค้า</span>
            </div>
            <select v-model="productData.status" class="select select-bordered w-full">
                <option selected disabled>เลือกสถานะสินค้า</option>
                <option value="open">เปิด</option>
                <option value="close">ปิด</option>
            </select>
            <div class="mt-6 flex justify-center gap-3">
                <RouterLink :to="{ name: 'admin-products-list' }" class="btn btn-ghost">ยกเลิก</RouterLink>
                <button class="btn btn-neutral" @click="update">{{ mode }}</button>
            </div>
        </div>
    </AdminLayout>
</template>
