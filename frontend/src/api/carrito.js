export async function agregarProductoAlCarrito(data) {
  const res = await fetch('http://localhost:8000/api/carrito/agregar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Error al agregar producto al carrito');
  return res.json();
}

export async function obtenerCarrito(cliente_id) {
  const res = await fetch(`http://localhost:8000/api/carrito/${cliente_id}`);
  if (!res.ok) throw new Error('Error al obtener el carrito');
  return res.json();
}
