import { apiClient } from './apiService';

export const getClients = () => {
  return apiClient.get('/client?populate[card][populate]=image&sort=createdAt:desc').then((res) => res.data);
};
