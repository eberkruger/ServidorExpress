import express from 'express'
import ProductManager from './productManager.js'

const app = express()
const productManager = new ProductManager('./src/products.json')

app.use(express.urlencoded({extended:true}))

app.get('/products', async (req, res) => {
  try {
    const limit  =  Number(req.query.limit)
    const products = await productManager.getProducts()
    const limitedProducts = products.slice(0, limit)
  
    limit ? res.json(limitedProducts) : res.json(products)
  
  } catch (error) {
    console.log(error)
  }
})

app.get('/products/:pid', async (req, res) => {
  
  try {
    const productId = Number(req.params.pid)
    const products = await productManager.getProducts()
    const productFound = products.find((prod) => prod.id === productId)
  
    productFound ? res.json(productFound) : res.send(`Error: el ID ${productId} no existe en nuestra base de datos`)

  } catch (error) {
    console.log('No se encuentra el producto', error)
  }
})

app.listen(8080, () => {
  console.log('Servidor en ejecución en el puerto 8080')
})