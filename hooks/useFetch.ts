import { baseUrl } from '@/constants';

export const useFetch = async (path: string) => {
  try {
    const res = await fetch(baseUrl + path);
    const { data } = await res.json();
    return {
      data,
      error: null,
    };
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};
