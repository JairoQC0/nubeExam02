const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verificarToken = require('../middleware/auth');

// Obtener todos los clientes
router.get('/', async (req, res) => {
  const result = await db.query('SELECT * FROM clientes');
  res.json(result.rows);
});

// Ruta protegida - perfil del cliente autenticado
router.get('/perfil', verificarToken, async (req, res) => {
  try {
    const result = await db.query('SELECT id, nombre, correo FROM clientes WHERE id = $1', [req.usuario.id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Registrar cliente
router.post('/registro', async (req, res) => {
  const { nombre, correo, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      'INSERT INTO clientes(nombre, correo, password) VALUES ($1, $2, $3)',
      [nombre, correo, hashedPassword]
    );

    res.json({ message: 'Cliente registrado con contraseña encriptada' });
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Login de cliente
// Login con verificación y token
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM clientes WHERE correo = $1', [correo]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    const cliente = result.rows[0];
    const validPassword = await bcrypt.compare(password, cliente.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    // Generar token (puedes cambiar la clave secreta y duración)
    const token = jwt.sign(
      { id: cliente.id, correo: cliente.correo },
      'secreto_super_seguro',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      cliente: {
        id: cliente.id,
        nombre: cliente.nombre,
        correo: cliente.correo
      }
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});



module.exports = router;
