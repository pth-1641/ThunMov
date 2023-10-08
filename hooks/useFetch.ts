import { domain } from '@/constants';

export default async function useFetch(path: string, body?: any) {
  try {
    const res = await fetch(`${domain}/api${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
    });
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
