import { getEnvVar } from "../utils/env";

const XinapX: string = getEnvVar("VITE_API_BASE_URL");

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: (): string => `${XinapX}/api/auth/login`,
    REGISTER: (): string => `${XinapX}/api/auth/register`,
    LOGOUT: (): string => `${XinapX}/auth/logout`,
    REFRESH: (): string => `${XinapX}/auth/refresh`,
    VERIFY: (): string => `${XinapX}/api/auth/verify`,
    ME: (): string => `${XinapX}/auth/me`,
  },
};
