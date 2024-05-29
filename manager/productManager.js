const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

const readProducts = () => {
  const data = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(data);
};

const writeProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
};

class ProductManager {
  static getAll(limit) {
    let products = readProducts();
    if (limit) {
      products = products.slice(0, Number(limit));
    }
    return products;
  }

  static getById(id) {
    const products = readProducts();
    return products.find(p => p.id === id);
  }

  static create(data) {
    const products = readProducts();
    const newProduct = {
      id: String(Date.now()),
      ...data,
      status: data.status !== undefined ? data.status : true
    };
    products.push(newProduct);
    writeProducts(products);
    return newProduct;
  }
}

module.exports = ProductManager;
