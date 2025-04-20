// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER,
});

export default API;
    