// apiService.ts
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const isPreview = config?.params?.publicationState === 'preview';
    if (isPreview) {
      const token = process.env.STRAPI_PREVIEW_TOKEN;
      if (token) {
        const headers = axios.AxiosHeaders.from(config.headers || {});
        headers.set('Authorization', `Bearer ${token}`);
        config.headers = headers;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);
