export const getEnvVar = (key: string, defaultValue: string = ''): string => {
    const value = import.meta.env[key] || defaultValue;
    if (!value) {
      console.warn(`⚠️ Falta la variable de entorno: ${key}`);
    }
    return value;
  };
  