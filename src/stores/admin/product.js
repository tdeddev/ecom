import { defineStore } from 'pinia'
import { db } from '@/firebase'
import { collection, getDocs, getDoc, setDoc, doc, deleteDoc, addDoc, query, where, orderBy, limit, startAfter, endBefore, limitToLast, getCountFromServer } from "firebase/firestore"; 
export const useAdminProductStore = defineStore('admin-product', {
    state: () => ({
        list: [],
        docList : [],
        filter : {
            search : '',
            status : '',
            sort : {
                updateAt : 'desc',
            }
        },
        total : 1
    }),
    getters: {
        list(state){
            return state.docList.map(doc => {
                const convertedProduct = doc.data()
                convertedProduct.productId = doc.id
                convertedProduct.price = parseInt(convertedProduct.price)
                convertedProduct.quantity = parseInt(convertedProduct.quantity)
                convertedProduct.remainQuantity = parseInt(convertedProduct.remainQuantity)
                convertedProduct.date = convertedProduct.date.toDate().toLocaleString()
                console.log(convertedProduct)
                return convertedProduct
            })
        },
        totalPage(state){
            return Math.ceil(state.total / 5)
        }
    },
    actions: {
        async loadProduct(){
            try {
                let productCol = query(collection(db, 'products'), orderBy('date', this.filter.sort.updateAt))
                if(this.filter.search){
                    productCol = query(productCol, where('name', '==', this.filter.search))
                }
                if(this.filter.status){
                    productCol = query(productCol, where('status', '==', this.filter.status))
                }
                
                const rawProductCol = productCol

                productCol = query(productCol, limit(5))
                
                const productSnap = await getDocs(productCol)
                this.docList = productSnap.docs

                const allSnapshot = await getCountFromServer(rawProductCol)
                this.total = allSnapshot.data().count
                
            } catch (error) {
                console.log('error', error)
            }
        },
        async loadNextPage(mode) {
            let productCol = query(collection(db, 'products'), orderBy('date', this.filter.sort.updateAt))

            if(mode === 'next'){
                const lastDocument = this.docList[this.docList.length-1]
                //หน้าต่อไป
                productCol = query(productCol, startAfter(lastDocument), limit(5))
            }else{
                const firstDocument = this.docList[0]
                //หน้าที่แล้ว
                productCol = query(productCol, endBefore(firstDocument), limitToLast(5))
            }

            const productSnap = await getDocs(productCol)
            this.docList = productSnap.docs
        },
        async getProduct(productId){
            try {
                const productRef = doc(db, 'products', productId)
                const productSnap = await getDoc(productRef)
                return productSnap.data()
            } catch (error) {
                console.log('error', error)
            }

        },
        async addProduct(productData){
            try {
                productData.remainQuantity = productData.quantity
                productData.date = new Date()
                const productCol = collection(db, 'products')
                await addDoc(productCol, productData)
            } catch (error) {
                console.log('error', error)
            }
        },
        async updateProduct(productId, productData){
            try {
                const updateProduct = {}
                updateProduct.name = productData.name
                updateProduct.imageUrl = productData.imageUrl
                updateProduct.price = productData.price
                updateProduct.about = productData.about
                updateProduct.quantity = productData.quantity
                updateProduct.remainQuantity = productData.quantity
                updateProduct.status = productData.status
                updateProduct.date = new Date()

                const productRef = doc(db, 'products', productId)
                await setDoc(productRef, updateProduct)
            } catch (error) {
                console.log('error', error)
            }
        },
        async removeProduct(productId){
            try {
                const productRef = doc(db, 'products', productId)
                await deleteDoc(productRef)
            } catch (error) {
                console.log('error', error)
            }

        }
    }
})