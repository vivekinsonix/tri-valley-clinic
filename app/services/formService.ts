import { apiClient } from './apiService';

export const get_form_keys = () => {
    return apiClient.get('/form-keys').then((res) => res.data);
};

export const submit_form = async (data: any) => {
    return apiClient.post('/form-values', data).then((res) => res.data);
};