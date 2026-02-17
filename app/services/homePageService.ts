import { apiClient } from './apiService';

/* ======================================================
   HOME PAGE
====================================================== */
export function get_home_page_data() {
  return apiClient.get('/home-page?populate[Main]=*&populate[Our_Legacy][populate]=our_team&populate[Our_Core_Differentiators][populate]=counts').then((res) => res.data);
}

/* ======================================================
   WHAT WE BUILDS
====================================================== */
export async function get_what_we_builds() {
  const res = await apiClient.get('/what-we-builds', {
    params: {
      'populate[main][populate]': '*',
      'populate[view1][populate]': '*',
      'populate[view2][populate]': '*',
      'populate[view3][populate][image_card][populate][images][populate]': '*',
      'populate[view4][populate]': '*',
      'populate[view5][populate]': '*',
      'populate[view6][populate]': '*',
      'populate[view7][populate]': '*',
      status: 'published',
    },
  });

  return res.data;
}

export function get_what_we_builds_Ids() {
  return apiClient.get('/what-we-builds?populate[main][populate]=*&populate[view1][populate]=*&populate[view2][populate]=*&populate[view3][populate][image_card][populate][images][populate]=*&populate[view4][populate]=*&populate[view5][populate]=*&populate[view6][populate]=*&populate[view7][populate]=*&status=published').then((res) => res?.data?.data?.map((service: any) => service?.slug));
}

export function get_what_we_builds_by_slug(slug: string) {
  const populateQuery = ['populate[main][populate]=*', 'populate[view1][populate]=*', 'populate[view2][populate]=*', 'populate[view3][populate][image_card][populate][images][populate]=*', 'populate[view4][populate]=*', 'populate[view5][populate]=*', 'populate[view6][populate]=*', 'populate[view7][populate]=*'].join('&');

  return apiClient.get(`/what-we-builds?filters[slug][$eq]=${slug}&${populateQuery}`).then((res) => res.data);
}

export function get_what_we_builds_by_document_id(documentId: string) {
  const populateQuery = ['populate[main][populate]=*', 'populate[view1][populate]=*', 'populate[view2][populate]=*', 'populate[view3][populate][image_card][populate][images][populate]=*', 'populate[view4][populate]=*', 'populate[view5][populate]=*', 'populate[view6][populate]=*', 'populate[view7][populate]=*'].join('&');

  return apiClient.get(`/what-we-builds?filters[documentId][$eq]=${documentId}&${populateQuery}`).then((res) => res.data);
}

/* ======================================================
   CASE STUDIES (FIXED PAGINATION)
====================================================== */

export function get_case_studies_Ids() {
  return apiClient.get('/case-studies?populate[main][populate]=*&populate[view1][populate]=*&populate[view2][populate]=*&populate[view3][populate][image_card][populate][images][populate]=*&populate[view5][populate]=*&populate[view6][populate]=*&populate[view7][populate]=*').then((res) => res?.data?.data?.map((cs: any) => cs?.slug));
}

export function get_case_studies() {
  return apiClient.get('/case-studies?populate[main][populate]=*&populate[view1][populate]=*&populate[view2][populate]=*&populate[view3][populate][image_card][populate][images][populate]=*&populate[view5][populate]=*&populate[view6][populate]=*&populate[view7][populate]=*').then((res) => res.data);
}

/* FIXED FUNCTION — THIS REMOVES YOUR 404 ERROR */
export function get_case_studies_paginated(page = 1, pageSize = 4) {
  return apiClient.get(`/case-studies?pagination[page]=${page}&pagination[pageSize]=${pageSize}&populate[main][populate]=*&populate[view1][populate]=*&populate[view2][populate]=*&populate[view3][populate][image_card][populate][images][populate]=*&populate[view5][populate]=*&populate[view6][populate]=*&populate[view7][populate]=*`).then((res) => res?.data?.data);
}

/* ======================================================
   CASE STUDY BY SLUG
====================================================== */

export function get_case_study_by_slug(slug: string) {
  return apiClient.get(`/case-studies?filters[slug][$eq]=${slug}&populate=*`).then((res) => res.data);
}

export function get_case_study_by_slug_1(slug: string) {
  const populateQuery = ['populate[main][populate]=*', 'populate[view1][populate]=*', 'populate[view2][populate]=*', 'populate[view3][populate][image_card][populate][images][populate]=*', 'populate[view4][populate]=*', 'populate[view5][populate]=*', 'populate[view6][populate]=*', 'populate[view7][populate]=*'].join('&');

  return apiClient.get(`/case-studies?filters[slug][$eq]=${slug}&${populateQuery}`).then((res) => res.data);
}

export function get_case_study_by_document_id(documentId: string) {
  const populateQuery = ['populate[main][populate]=*', 'populate[view1][populate]=*', 'populate[view2][populate]=*', 'populate[view3][populate][image_card][populate][images][populate]=*', 'populate[view5][populate]=*'].join('&');

  return apiClient.get(`/case-studies?filters[documentId][$eq]=${documentId}&${populateQuery}`).then((res) => res.data);
}

/* ======================================================
   NEWSLETTER + ABOUT US
====================================================== */

export const save_newsletter_subscription = (data: { email: string }) => {
  return apiClient.post('/news-letters', { data }).then((res) => res.data);
};

export const about_us_data = () => {
  return apiClient.get('/about-insonix?populate=*').then((res) => res.data);
};
