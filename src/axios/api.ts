import axios, { AxiosError } from "axios";
import { Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const getBaseUrl = () => {
  if (__DEV__) {
    return Platform.OS === "android"
      ? "http://10.0.2.2:8000"
      : "http://127.0.0.1:8000";
  }
  return "http://api.flowl.com.br"; // produção insegura (evitar)
};

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 30000,
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('@flowl:token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      if (__DEV__) console.warn("Erro ao recuperar token:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    if (response.data?.token) {
      AsyncStorage.setItem('@flowl:token', response.data.token)
        .catch(err => __DEV__ && console.warn("Erro ao salvar token:", err));
    }
    return response;
  },
  (error: AxiosError) => {
    if (__DEV__) console.error('API ERROR', error);

    const userMessage = "Erro interno. Tente novamente.";

    switch (error.response?.status) {
      case 401:
        console.warn("Sessão expirada");
        AsyncStorage.removeItem('@flowl:token').catch(() => {});
        break;
      case 403:
        console.warn("Acesso negado");
        break;
      case 404:
        console.warn("Recurso não encontrado");
        break;
      case 500:
        console.warn("Erro no servidor");
        break;
      default:
        console.warn("Erro desconhecido", error.message);
        break;
    }
    return Promise.reject(new Error(userMessage));
  }
);

export default api;