import { useEffect, useState } from 'react';
import { get_case_studies_paginated } from '../../services/homePageService';

export interface CaseStudy {
  documentId: string;
  main?: {
    title?: string;
  };
  slug?: string;
}

const CACHE_KEY = 'case_studies_data';

export const useCaseStudies = () => {
  const [data, setData] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      setData(JSON.parse(cached));
      setLoading(false);
      return;
    }

    get_case_studies_paginated()
      .then((res) => {
        const records = res ?? [];
        setData(records);
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(records));
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading };
};
