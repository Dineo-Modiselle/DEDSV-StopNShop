import { create } from "zustand";
import axios from "axios";

const API_URL = "/api/auth";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, { email, password, name });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error signing up", isLoading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const token = response.headers['x-auth-token'];
      if (token) localStorage.setItem('token', token);
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Login failed", isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${API_URL}/logout`);
      localStorage.removeItem('token');
      set({ user: null, isAuthenticated: false, error: null, isLoading: false });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({ user: response.data.user, isAuthenticated: true, isLoading: false });
      return response.data;
    } catch (error) {
      set({ error: error.response?.data?.message || "Error verifying email", isLoading: false });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/check-auth`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
    } catch (error) {
      set({ isAuthenticated: false, isCheckingAuth: false, user: null });
    }
  },
}));
