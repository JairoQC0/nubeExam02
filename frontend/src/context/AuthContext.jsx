import { createContext, useContext, useState, useEffect } from 'react';
import { obtenerPerfil } from '../api/clientes';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const cargarPerfil = async () => {
      if (token) {
        try {
          const data = await obtenerPerfil(token);
          setCliente(data);
        } catch (err) {
          console.error('Token inválido o expirado');
          localStorage.removeItem('token');
          setCliente(null);
        }
      }
      setLoading(false);
    };
    cargarPerfil();
  }, [token]);

  const login = (nuevoToken) => {
    localStorage.setItem('token', nuevoToken);
    setLoading(true);
    obtenerPerfil(nuevoToken)
      .then(data => setCliente(data))
      .finally(() => setLoading(false));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCliente(null);
  };

  return (
    <AuthContext.Provider value={{ cliente, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
