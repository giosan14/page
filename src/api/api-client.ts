import { LoginResponse, ProfileResponse, RegisterData } from "../interface/auth.interface";
import apiClient from "./axios-client";
import { API_ENDPOINTS } from "./endpoints";

export const authApi = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN(), { email, password });
    console.log(data);
    localStorage.setItem("token", data.data.token);
    return data;
  },

  register: async (registerData: RegisterData): Promise<unknown> => {
    const { data } = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER(), registerData);
    return data;
  },

  verify: async (token: string): Promise<unknown> => {
    const { data } = await apiClient.get(`${API_ENDPOINTS.AUTH.VERIFY()}?token=${token}`);
    return data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT());
    localStorage.removeItem("token");
  },

  getProfile: async (): Promise<ProfileResponse> => {
    const { data } = await apiClient.get<ProfileResponse>(API_ENDPOINTS.AUTH.ME());
    return data;
  },
};
