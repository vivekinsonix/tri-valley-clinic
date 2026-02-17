import { apiClient } from './apiService';

export const get_fees_structure = () => {
    return apiClient.get('/fees?populate[main][populate]=*&populate[views][populate][pricing_cards][populate][button]%3D*=*&sort=createdAt:desc').then((res) => res.data);
};
