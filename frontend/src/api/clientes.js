import axios from "axios";

const API_URL = "http://localhost:8000/api/clientes"; // Cambiar en producción

export const login = async (correo, password) => {
  const res = await axios.post(`${API_URL}/login`, { correo, password });
  return res.data;
};

export const registro = async (nombre, correo, password) => {
  const res = await axios.post(`${API_URL}/registro`, { nombre, correo, password });
  return res.data;
};

export const obtenerPerfil = async (token) => {
  const res = await axios.get(`${API_URL}/perfil`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
