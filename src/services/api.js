import axios from "axios";

const api = axios.create({
  baseURL: "https://fintech-wallet-backend.onrender.com/api/auth",
});

export default api;