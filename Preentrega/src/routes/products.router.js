const express = require('express');
const router = express.Router();
const ProductManager = require('../manager/productManager');
const productValidator = require('../middleware/productValidator');

router.get('/', (req, res) => {
  const { limit } = req.query;
  const products = ProductManager.getAll(limit);
  res.json(products);
});

router.get('/:pid', (req, res) => {
  const { pid } = req.params;
  const product = ProductManager.getById(pid);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.post('/', productValidator, (req, res) => {
  const newProduct = ProductManager.create(req.body);
  res.status(201).json(newProduct);
});

router.put('/:pid', productValidator, (req, res) => {
  const { pid } = req.params;
  const updatedProduct = ProductManager.update(pid, req.body);
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

router.delete('/:pid', (req, res) => {
  const { pid } = req.params;
  const deleted = ProductManager.delete(pid);
  if (deleted) {
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Producto no encontrado' });
  }
});

module.exports = router;
