import { apiClient } from './apiService';

export function getGlobalPageDataBySlug(slug: string) {
  return apiClient.get(`/global-pages?filters[slug][$eq]=${slug}&populate=*`).then((res) => {
    return res.data.data[0];
  });
}
