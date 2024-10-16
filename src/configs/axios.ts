import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

const app = axios.create({ baseURL });

export default app;