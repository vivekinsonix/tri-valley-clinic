import { apiClient } from './apiService';

export function sendMail(data: Record<string, string>) {
  return apiClient.post('/send-category-email', { data }).then((res) => res.data);
}
