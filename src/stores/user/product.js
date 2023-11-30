import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    list : [
      {
      name: 'เครื่องกรองน้ำดื่ม1',
      imageUrl: 'https://cn.lnwfile.com/_/cn/_raw/31/ld/k6.jpg',
      quantity: 1,
      about: 'เครื่องกรอง',
      status: 'open',
      price: 15000,
    },
      {
      name: 'ตู้ทำน้ำเย็น Maxcool',
      imageUrl: 'https://cn.lnwfile.com/_/cn/_raw/91/55/zb.jpg',
      quantity: 1,
      about: 'ตู้ทำน้ำเย็น',
      status: 'open',
      price: 9999,
    },
      {
      name: 'เครื่องผลิตโอโซน',
      imageUrl: 'https://cn.lnwfile.com/_/cn/_raw/z0/nz/qw.png',
      quantity: 1,
      about: 'เครื่องผลิตโอโซน',
      status: 'open',
      price: 7777,
    },
      {
      name: 'สารกรองน้ำ',
      imageUrl: 'https://cn.lnwfile.com/_/cn/_raw/6g/b3/4s.jpg',
      quantity: 1,
      about: 'สารกรองน้ำ',
      status: 'open',
      price: 3333,
    },
      {
      name: 'ชุด UV สำหรับฆ่าเชื้อโรคในน้ำ',
      imageUrl: 'https://cn.lnwfile.com/_/cn/_raw/sq/9o/tc.jpg',
      quantity: 10,
      about: 'ชุด UV',
      status: 'open',
      price: 19999,
    }
  ]
  }),
  actions: {
    filterProducts(searchText){
      return this.list.filter(product => product.name.includes(searchText))
    }
  }
})

