import { apiClient } from './apiService';

export const getLocation = async () => {
  return apiClient.get('/our-locations?sort=createdAt:asc').then((res) => res.data);
};

export const subMitForm = async (data: any) => {
  return apiClient.post('/contacts', { data }).then((res) => res.data);
};
