const express = require('express');
const router = express.Router();
const CartManager = require('../manager/cartManager');
const ProductManager = require('../manager/productManager');

router.get('/:cid', (req, res) => {
  const { cid } = req.params;
  const cart = CartManager.getById(cid);
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

router.post('/', (req, res) => {
  const newCart = CartManager.create();
  res.status(201).json(newCart);
});

router.post('/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;
  const product = ProductManager.getById(pid);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const updatedCart = CartManager.addProductToCart(cid, pid);

  if (updatedCart) {
    res.status(200).json(updatedCart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

module.exports = router;
