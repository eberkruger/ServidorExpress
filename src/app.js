const express = require('express')
const data = require('./test.json')
const app = express()
const port = 8080

//app.use(express.urlencoded({extended:true}))

app.get('/products', async (req, res) => {
  const { limit } = req.query

  if (limit) {
    const limitedProducts = data.slice(0, parseInt(limit))
    res.json({ productos: limitedProducts })
  } else {
    res.json({ productos: data })
  }
})


app.get('/products/:pid', async (req, res) => {
  const productId = req.params.pid
  const productFound = data.find((prod) => {
    return prod.id == productId
  })

  res.json({ productFound })
})

app.listen(port, async () => {
  console.log('Servidor en ejecución en el puerto 8080')
})