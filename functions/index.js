const {onRequest} = require("firebase-functions/v2/https");
const express = require('express')
const app = express()

const { db, auth } = require('./firebaseConfig.js')

app.post('/placeorder', async (req, res) => {
  const checkOut = req.body.checkout
  const products = checkOut.products
  let totalPrice = 0
  let checkoutProdcuts = []
  for (product of products){
    const productRef = db.collection('products').doc(product.productId)
    const productSnapshot = (await productRef.get())
    const productData = productSnapshot.data()

    let checkoutProdcut = product
    checkoutProdcut.price = productData.price
    checkoutProdcut.totalPrice = productData.price * product.quantity
    checkoutProdcuts.push(checkoutProdcut)
    totalPrice += (productData.price * product.quantity)
  }
  res.json({
    message : 'ok',
    checkoutProdcut : checkoutProdcuts,
    totalPrice : totalPrice
  })
})

exports.api = onRequest(app)
