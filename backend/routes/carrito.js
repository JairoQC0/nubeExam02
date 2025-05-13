const express = require('express');
const router = express.Router();
const db = require('../db');

// Agregar al carrito
router.post('/agregar', async (req, res) => {
  console.log('👉 Recibido en /api/carrito/agregar:', req.body);
  const { cliente_id, producto_id, cantidad } = req.body;

  try {
    await db.query(
      'INSERT INTO carrito(cliente_id, producto_id, cantidad) VALUES ($1, $2, $3)',
      [cliente_id, producto_id, cantidad]
    );
    res.json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

// Obtener carrito de un cliente
router.get('/:cliente_id', async (req, res) => {
  const { cliente_id } = req.params;
  
  try {
    const result = await db.query(
      `SELECT c.id, p.nombre, p.precio, c.cantidad
       FROM carrito c
       JOIN productos p ON c.producto_id = p.id
       WHERE c.cliente_id = $1`,
      [cliente_id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Carrito vacío' });
    }
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

module.exports = router;
