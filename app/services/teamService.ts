import { apiClient } from './apiService';

export const getTeams = () => {
  return apiClient.get('/our-team?populate[card][populate]=image&sort=createdAt:desc').then((res) => res.data);
};

export const getEmployee = () => {
  return apiClient.get('/team-lists?populate=*&sort=createdAt:desc').then((res) => res.data)
}

export const getEmployeeBySlug = (slug: any) => {
  return apiClient.get(`/team-lists?populate=*&filters[slug][$eq]=${slug}`).then((res) => res.data)
}