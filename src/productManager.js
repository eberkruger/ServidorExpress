const fs = require('fs')

class ProductManager {
  constructor(path) {
    this.path = path
    this.products = []
  }

  async addProduct(title, description, price, thumbnail, code, stock) {

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log('Todos los campos son obligatorios')
      return
    }

    if (this.products.some(product => product.code === code)) {
      console.log(`Ya existe un producto con el mismo código ${code}`)
      return
    }

    const product = {
      id: this.products.length + 1,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    }

    this.products.push(product)

    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2), 'utf-8')
      /* if (product.id) {
        console.log('El producto ya fue agregado')
      } */
      return product.id
    } catch (err) {
      console.log('Error al agregar producto', err)
    }
  }

  async getProduts() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8')
      const dataParse = JSON.parse(data)
      if (dataParse.length <= 0) {
        console.log('No hay productos en la base de datos!!')
      } else {
        console.log('Lista de productos existentes: \n', dataParse)
      }
    } catch (err) {
      console.log('Error al obtener los productos', err)
    }
  }

  async getProdutsById(id) {
    const data = await fs.promises.readFile(this.path, 'utf-8')
    const dataParse = JSON.parse(data)
    const product = dataParse.find((prod) => prod.id === id)
    if (!product) {
      console.log('El producto no se encuentra')
    } else {
      console.log(`El producto con el ID ${id} es: ${JSON.stringify(product, null, 2)}`)
    }
  }

  async deleteProduct(id) {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8')
      const dataParse = JSON.parse(data)
      const index = dataParse.findIndex((prod) => prod.id === id)
      if (index === -1) {
        console.log('El producto no se encuentra')
        return
      }

      const deletedProduct = dataParse.splice(index, 1)[0]
      await fs.promises.writeFile(this.path, JSON.stringify(dataParse, null, 2), 'utf-8')
      console.log(`El producto con el ID ${id} ha sido eliminado: ${JSON.stringify(deletedProduct, null, 2)}`)
    } catch (err) {
      console.log('Error al eliminar el producto', err)
    }
  }

  async deleteAllProducts() {
    try {
      await fs.promises.writeFile(this.path, 'utf-8')
      console.log('Todos los productos han sido eliminados')
    } catch (err) {
      console.log('Error al eliminar todos los productos', err)
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      const data = await fs.promises.readFile(this.path, 'utf-8')
      const dataParse = JSON.parse(data)
      const productIndex = dataParse.findIndex((prod) => prod.id === id)
      if (productIndex === -1) {
        console.log('El producto no se encuentra')
        return
      }

      const updatedProduct = { ...dataParse[productIndex], ...updatedFields }
      dataParse[productIndex] = updatedProduct

      await fs.promises.writeFile(this.path, JSON.stringify(dataParse, null, 2), 'utf-8')
      console.log(`El producto con ID ${id} ha sido actualizado: ${JSON.stringify(updatedProduct, null, 2)}`)
    } catch (err) {
      console.log('Error al actualizar el producto', err)
    }
  }
}

const productManager = new ProductManager('./test.json');

// Testing

//Agrega productos al array
productManager.addProduct('Producto 1', 'Descripción prueba 1', 800, 'imagen1.jpg', 'P001', 20)
productManager.addProduct('Producto 2', 'Descripción prueba 2', 400, 'imagen2.jpg', 'P002', 20)
productManager.addProduct('Producto 3', 'Descripción prueba 3', 600, 'imagen3.jpg', 'P003', 20)
productManager.addProduct('Producto 4', 'Descripción prueba 4', 150, 'imagen4.jpg', 'P004', 20)
productManager.addProduct('Producto 5', 'Descripción prueba 5', 200, 'imagen5.jpg', 'P005', 20)
productManager.addProduct('Producto 6', 'Descripción prueba 6', 700, 'imagen6.jpg', 'P006', 20)
productManager.addProduct('Producto 7', 'Descripción prueba 7', 650, 'imagen7.jpg', 'P007', 20)
productManager.addProduct('Producto 8', 'Descripción prueba 8', 120, 'imagen8.jpg', 'P008', 20)
productManager.addProduct('Producto 9', 'Descripción prueba 9', 850, 'imagen9.jpg', 'P009', 20)
productManager.addProduct('Producto 10', 'Descripción prueba 10', 900, 'imagen10.jpg', 'P0010', 20)

//productManager.getProduts() // Muestra todos los productos existentes

//productManager.getProdutsById(2) // Muestra el producto con el id que pasamos

//productManager.deleteProduct(5) // Elimina el producto con id específico

//productManager.deleteAllProducts() // Elimina todos los productos

//productManager.updateProduct(1, {title:'Celular Modificado', price: 5000}) // Actualiza el producto con ID especificado utilizando los campos actualizados

