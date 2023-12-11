<script setup>
import { onMounted, ref } from 'vue';
import Userlayout from '@/layouts/Userlayout.vue'

import { useAccountStore } from '@/stores/account'
import { storage } from '@/firebase'
import {  ref as storageRef , uploadBytes, getDownloadURL } from 'firebase/storage'

let email = ref('')
let fullname = ref('')
let profileImageUrl = ref('')
const accountStore = useAccountStore()

const saveProfile = async () => {
    try {
        let userData = {
        imageUrl : profileImageUrl.value,
        email : email.value,
        fullname : fullname.value
    }
    await accountStore.updateProfile(userData)
    } catch (error) {
        console.log('error', error);
    }
}

const handleFileUpload = async (event) => {
    const file = event.target.files[0]

    if(file){
        const uploadRef = storageRef(storage, `users/${accountStore.user.uid}/${file.name}`)
        const snapshot = await uploadBytes(uploadRef, file)
        const downloadUrl = await getDownloadURL(snapshot.ref)
        profileImageUrl.value = downloadUrl
    }
}

onMounted(() => {   
    const profileData = accountStore.profile
    profileImageUrl.value = (profileData.imageUrl || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png')
    email.value = profileData.email
    fullname.value = profileData.fullname
})
</script>

<template>
    <Userlayout>
        <div class="max-w-2xl mx-auto border border-base-200 shadow-xl p-8 my-4">
            <div class="font-bold text-2xl">โปรไฟล์ของคุณ</div>
            <div class="flex flex-col items-center">
                <div class="avatar">
                    <div class="w-24 rounded-full">
                        <img :src="profileImageUrl">
                    </div>
                </div>
                <div class="form-control w-full items-center">
                    <input type="file" @change="handleFileUpload"/>
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">E-Mail</span>
                    </label>
                    <input type="text" placeholder="Email" class="input input-bordered w-full" :value="email" disabled />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <input v-model="fullname" type="text" placeholder="Name" class="input input-bordered w-full" />
                </div>
                <button class="btn btn-primary mt-3 w-full" @click="saveProfile">บันทึกข้อมูล</button>
            </div>
        </div>
    </Userlayout>
</template>