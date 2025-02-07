import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api", // Ajusta la URL de tu backend
    withCredentials: true, // Si usas cookies o sesiones
});

export default api;
