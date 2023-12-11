import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword  } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase'
import { defineStore } from 'pinia'
const provider = new GoogleAuthProvider();

export const useAccountStore = defineStore('account', {
    state:() => ({
        isLoggedIn : false,
        isAdmin : false,
        user : {},
        profile : {}
    }),
    actions: {
        async signInAdmin(email, password){
            try {
                const result = await signInWithEmailAndPassword(auth, email, password)
                this.user = result
                this.isLoggedIn = true
                this.isAdmin = true
            } catch (error) {
                console.log(error.code)
                switch(error.code){
                    case 'auth/invalid-email':
                        throw new Error('อีเมลล์ ไม่ถูกต้อง!!')
                    case 'auth/wrong-password':
                        throw new Error('พาสเวิร์ด ไม่ถูกต้อง!!')
                    default:
                        throw new Error('Login มีปัญหา!!')
                }
            }
        },
        async checkAuth(){
            return new Promise((resolve) => {
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        this.user = user
                        // เพิ่มการอ้างอิงจาก collaction, users, document id
                        const docRef = doc(db, 'users', user.uid)
                        const docSnap = await getDoc(docRef)
                        if(docSnap.exists()){
                            //ไม่สร้างข้อมูลใหม่
                            this.profile = docSnap.data()
                        }else{
                            // ยังไม่มีข้อมูล = สร้างข้อมูลใหม่
                            const newUser = {
                                fullname : user.displayName,
                                role : 'Member',
                                status : 'เปิดใช้งาน',
                                updatedAt : new Date()
                            }
                            await setDoc(docRef, newUser)
                            this.profile = newUser;
                        }
                        if(this.profile.role == 'Admin' || this.profile.role == 'Support'){
                            this.isAdmin = true
                        }
                        this.isLoggedIn = true
                        this.profile.email = user.email
                      resolve(true)
                    }else{
                        resolve(false)
                    }
                  });
            })
        },
        async updateProfile(userData){
            try {
                const updateUserData = {
                    fullname : userData.fullname,
                    imageUrl : userData.imageUrl
                }

                const userRef = doc(db, 'users', this.user.uid)
                await updateDoc(userRef, updateUserData)
            } catch (error) {
                console.log('error', error)
            }
        },
        async signInWithGoogle(){
            try {
                const result = await signInWithPopup(auth, provider)
                this.isLoggedIn = true
                this.user = result.user
            } catch (error) {
                console.log('error', error)
            }
        },
        async logout(){
            try {
                this.isLoggedIn = false
                this.isAdmin = false
                await signOut(auth)
            } catch (error) {
                console.log('error', error)
            }
        }
    }
})