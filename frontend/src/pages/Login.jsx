import { useState } from 'react';
import { login as loginAPI, obtenerPerfil } from '../api/clientes';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      // 1. Hacer login y guardar token
      const data = await loginAPI(correo, password);
      login(data.token);
      localStorage.setItem('token', data.token);

      // 2. Obtener perfil del cliente usando el token
      const perfil = await obtenerPerfil(data.token);
      localStorage.setItem('cliente', JSON.stringify(perfil));

      // 3. Redirigir a productos
      navigate('/productos');
    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <input type="email" value={correo} onChange={e => setCorreo(e.target.value)} placeholder="Correo" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
      <button onClick={handleLogin}>Entrar</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;
