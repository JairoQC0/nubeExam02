import { useEffect, useState } from 'react';
import { obtenerCarrito } from '../api/carrito'; // asegúrate que la ruta es correcta

function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        const cliente = JSON.parse(localStorage.getItem('cliente'));
        if (!cliente || !cliente.id) {
          setError('Debes iniciar sesión para ver tu carrito');
          return;
        }

        const data = await obtenerCarrito(cliente.id);
        setCarrito(data);
      } catch (err) {
        console.error('Error al cargar el carrito:', err);
        setError('No se pudo cargar el carrito');
      } finally {
        setLoading(false);
      }
    };

    cargarCarrito();
  }, []);

  if (loading) return <p>Cargando carrito...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Carrito de compras</h2>
      {carrito.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <ul>
          {carrito.map((item) => (
            <li key={item.id}>
              {item.nombre} - ${item.precio} x {item.cantidad}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Carrito;
