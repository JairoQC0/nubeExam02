const express = require('express');
const cors = require('cors');
const clientesRoutes = require('./routes/clientes');
const productosRoutes = require('./routes/productos');
const carritoRoutes = require('./routes/carrito');
const clientesRouter = require('./routes/clientes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/clientes', clientesRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/carrito', carritoRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
