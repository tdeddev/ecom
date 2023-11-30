<script setup>
import Userlayout from '@/layouts/Userlayout.vue'
import { onMounted, ref } from 'vue';

let email = ref('')
let name = ref('')


const saveProfile = () => {
    let userData = {
        email : email.value,
        name : name.value
    }
    localStorage.setItem('profile-data', JSON.stringify(userData))
    alert('บันทึกข้อมูลสำเร็จ')
}

onMounted(() => {   
    let profileData = localStorage.getItem('profile-data')
    if(profileData){
        profileData = JSON.parse(profileData)
        email.value = profileData.email
        name.value = profileData.name
    }
})
</script>

<template>
    <Userlayout>
        <div class="max-w-2xl mx-auto border border-base-200 shadow-xl p-8 my-4">
            <div class="font-bold text-2xl">โปรไฟล์ของคุณ</div>
            <div class="flex flex-col items-center">
                <div class="avatar">
                    <div class="w-24 rounded-full">
                        <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png">
                    </div>                    
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">E-Mail</span>
                    </label>
                    <input v-model="email" type="text" placeholder="Email" class="input input-bordered w-full" />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Name</span>
                    </label>
                    <input v-model="name" type="text" placeholder="Name" class="input input-bordered w-full" />
                </div>
                <button class="btn btn-primary mt-3 w-full" @click="saveProfile">บันทึกข้อมูล</button>
            </div>
        </div>
    </Userlayout>
</template>