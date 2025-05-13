import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RutaPrivada({ children }) {
  const { cliente, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  return cliente ? children : <Navigate to="/" />;
}

export default RutaPrivada;
