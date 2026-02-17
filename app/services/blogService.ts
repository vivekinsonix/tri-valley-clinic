import { apiClient } from './apiService';

// services/blogService.ts
export function getBlogs(params?: { categorySlug?: string; search?: string }) {
  const filters: string[] = [];

  if (params?.categorySlug) {
    filters.push(`filters[blogs_category][slug][$eq]=${params.categorySlug}`);
  }

  if (params?.search) {
    filters.push(`filters[title][$containsi]=${params.search}`);
  }

  const filterQuery = filters.length ? `&${filters.join('&')}` : '';

  return apiClient.get(`/blogs?populate=*&&sort=createdAt:desc${filterQuery}`).then((res) => res.data);
}

export function getBlogsCategories() {
  return apiClient.get('/blogs-categories?fields[0]=name&fields[1]=slug&sort=name:asc').then((res) => res.data);
}

export function getBlogsIds() {
  return apiClient.get('/blogs?&&populate=*&sort=createdAt:desc').then((res) => res.data?.data?.map((blog: any) => blog?.slug));
}

export function getPaginatedBlogs(pageno = 1, records = 5) {
  return apiClient.get(`/blogs?&&populate=*&sort=createdAt:desc&pagination[page]=${pageno}&pagination[pageSize]=${records}`).then((res) => res.data);
}

export function getBlog(id: string | number) {
  return apiClient.get(`/blogs/${id}?populate=*`).then((res) => res.data);
}

export async function getBlogBySlug(slug: string) {
  const baseParams = {
    populate: '*',
    filters: { slug: { $eq: slug } },
  };

  const requests = [apiClient.get('/blogs', { params: { ...baseParams } }), apiClient.get('/blogs', { params: { ...baseParams, status: 'draft' } })];

  const responses = await Promise.allSettled(requests);

  for (const res of responses) {
    if (res.status === 'fulfilled' && res.value.data.data?.[0]) {
      return res.value.data.data[0];
    }
  }

  return null;
}
