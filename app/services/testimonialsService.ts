import { apiClient } from './apiService';

export const getTestimonials = () => {
  return apiClient.get('/testimonial?populate[card][populate]=video&populate[card][populate]=thumbnail&sort=createdAt:desc').then((res) => res.data);
};
