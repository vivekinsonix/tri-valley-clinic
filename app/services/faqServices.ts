import { apiClient } from './apiService';
export function getFaqs() {

    return apiClient.get('/faqs?populate=*')
}