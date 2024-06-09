const express = require('express');
const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());

// Routes
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
