import { useEffect, useState } from 'react';
import { obtenerProductos } from '../api/productos';
import { useCarrito } from '../context/CarritoContext';
import { agregarProductoAlCarrito } from '../api/carrito';

function Productos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await obtenerProductos();
        setProductos(data);
      } catch (error) {
        console.error('Error al obtener productos', error);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const handleAgregarAlCarrito = async (producto) => {
    try {
      const cliente = JSON.parse(localStorage.getItem('cliente'));

      if (!cliente || !cliente.id) {
        console.error('Cliente no autenticado');
        alert('Debes iniciar sesión para agregar productos al carrito.');
        return;
      }

      // Enviar al backend
      await agregarProductoAlCarrito({
        cliente_id: cliente.id,
        producto_id: producto.id,
        cantidad: 1
      });

      // Agregar al contexto local (UI)
      agregarAlCarrito(producto);
      alert('Producto agregado al carrito');

    } catch (error) {
      console.error('Error al agregar al carrito', error);
      alert('Hubo un problema al agregar el producto');
    }
  };

  return (
    <div>
      <h2>Productos disponibles</h2>
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <ul>
          {productos.map((p) => (
            <li key={p.id}>
              <strong>{p.nombre}</strong><br />
              {p.descripcion}<br />
              Precio: ${p.precio}<br />
              <button onClick={() => handleAgregarAlCarrito(p)}>
                Agregar al carrito
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Productos;
