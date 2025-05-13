import axios from "axios";

const API_URL = "http://localhost:8000/api/productos"; // cambiar a producción en EC2

export const obtenerProductos = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};
