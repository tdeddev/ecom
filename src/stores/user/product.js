import { defineStore } from 'pinia'
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from '@/firebase'
export const useProductStore = defineStore('product', {
  state: () => ({
    list : []
  }),
  actions: {
    async loadProduct(){
      const productsCol = query(collection(db, "products"), where('status', '==', 'open'))
      const productsSnapshot = await getDocs(productsCol);
      const products = productsSnapshot.docs.map(doc => {
        const convertProduct = doc.data()
        convertProduct.productId = doc.id
        return convertProduct
      })
      if(products.length > 0){
          this.list = products
          this.loaded = !this.loaded
      }
  },
    filterProducts(searchText){
      return this.list.filter(product => product.name.includes(searchText))
    }
  }
})

