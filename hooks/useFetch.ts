import { domain } from '@/constants';

export default async function useFetch(path: string) {
  try {
    const res = await fetch(`${domain}/api${path}`, { method: 'POST' });
    const data = await res.json();
    if (data.status === 'Fail') {
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
