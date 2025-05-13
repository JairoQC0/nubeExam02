const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener productos
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM productos');
  res.json(result.rows);
});

module.exports = router;
