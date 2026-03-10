import axios from 'axios';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';