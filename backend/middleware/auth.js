const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Formato: "Bearer token"

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, 'secreto_super_seguro', (err, usuario) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido o expirado' });
    }

    req.usuario = usuario;
    next();
  });
}

module.exports = verificarToken;
