import { BASE_URL } from "@/constants";

export const useFetch = async (path: string) => {
  try {
    const res = await fetch(BASE_URL + path);
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
