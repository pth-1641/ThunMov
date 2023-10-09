import { domain } from '@/constants';
import { Metadata } from 'next';

type Params = {
  title: string;
  description: string;
  urlPath: string;
};

export const useMetadata = (params: Params) => {
  const { title, description, urlPath } = params;
  return {
    title: `${title} | Thunmov`,
    description,
    alternates: {
      canonical: domain + urlPath,
    },
    openGraph: {
      title: `${title} | Thunmov`,
      description,
      url: domain + urlPath,
      type: 'website',
      siteName: 'Thunmov',
      locale: 'vi-VN',
    },
    twitter: {
      title: `${title} | Thunmov`,
      description,
      card: 'summary',
    },
    referrer: 'origin',
    robots: {
      follow: true,
      index: true,
    },
  } as Metadata;
};
