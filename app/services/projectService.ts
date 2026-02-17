import { apiClient } from './apiService';

export const getProjects = (params?: { categorySlug?: string }) => {
  const filters: string[] = [];

  if (params?.categorySlug) {
    filters.push(`filters[project_category][slug][$eq]=${params.categorySlug}`);
  }
  const filterQuery = filters.length ? `&${filters.join('&')}` : '';

  return apiClient.get(`/projects?populate=*&sort=createdAt:desc${filterQuery}`).then((res) => res.data);
};

export const getProjectsCategories = () => {
  return apiClient.get('/project-categories').then((res) => res.data);
};
