import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";
import { getEnvVar } from "../utils/env";

const apiClient = axios.create({
  baseURL: getEnvVar("VITE_API_BASE_URL"),
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a cada solicitud
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = localStorage.getItem("token");
      if (token) {
        // Asegúrate de que headers esté inicializado como un objeto vacío si no está presente
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );
  
// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (!error.response) {
      console.error("🚨 Error de red:", error.message);
      return Promise.reject(new Error("No se pudo conectar con el servidor. Inténtalo más tarde."));
    }

    // const originalRequest = error.config;
    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;

    //   try {
    //     const { data } = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH());
    //     localStorage.setItem("token", data.token);
    //     apiClient.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
    //     return apiClient(originalRequest); // Reintentar la solicitud original
    //   } catch (refreshError) {
    //     // window.location.href = "/login";
    //     return Promise.reject(refreshError);
    //   }
    // }

    return Promise.reject(error);
  }
);

export default apiClient;
