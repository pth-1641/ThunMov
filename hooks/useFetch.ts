import { apiUrl } from '@/constants';

export default async function useFetch(path: string) {
  try {
    const res = await fetch(apiUrl + path);
    const data = await res.json();
    if (data.status === 'fail') {
      return {
        error: data,
        data: null,
      };
    } else {
      return {
        error: null,
        data,
      };
    }
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
}
