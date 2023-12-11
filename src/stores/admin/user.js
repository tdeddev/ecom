import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, doc, getDocs, getDoc, setDoc } from 'firebase/firestore'
export const useAdminUserStore = defineStore('admin-user', {
    state: () => ({
        list:[]
    }),
    actions: {
        async loadUser(){
            try {
                const userCol = collection(db, 'users')
                const userSnapshot = await getDocs(userCol)
                const userList = userSnapshot.docs.map(doc => {
                    let convertedUser = doc.data()
                    convertedUser.uid = doc.id
                    convertedUser.updatedAt = convertedUser.updatedAt.toDate().toLocaleString()
                    return convertedUser
                })
                this.list = userList
            } catch (error) {
                console.log('error', error)
            }
        },
        async getUser(uid){
            try {
                const userRef = doc(db, 'users', uid)
                const userSnap = await getDoc(userRef)
                return userSnap.data()
            } catch (error) {
                console.log('error', error)
            }
        },
        async updateUser(uid, userData){
            try {
                // เราอยากได้ข้อมูลอะไรไปอัพเดท
                const updatetedUser = {
                    fullname : userData.fullname,
                    status : userData.status,
                    role : userData.role
                }
                updatetedUser.updatedAt = new Date();
                const docRef = doc(db, 'users', uid)
                let status = await setDoc(docRef, updatetedUser)
            } catch (error) {
                console.log('error', error)
            }
        },
    }
})