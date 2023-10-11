import { MoviePagination } from '@/components/movies/MoviePagination';
import { Pagination } from '@/components/Pagination';
import { countries } from '@/constants';
import { useFetch } from '@/hooks';
import { useMetadata } from '@/hooks/useMetadata';
import { notFound } from 'next/navigation';

type MoviesCountryContext = {
  params: { type: string };
  searchParams: {
    page: string;
  };
};

export default async function MoviesCountry(context: MoviesCountryContext) {
  const {
    params: { type },
    searchParams: { page = 1 },
  } = context;

  const { data } = await useFetch('/countries', { type, page });
  if (!data) return notFound();

  return (
    <main className="mx-auto max-w-7xl px-5">
      <MoviePagination movies={data.items} />
      <Pagination currentPage={data.currentPage} totalPages={data.totalPages} />
    </main>
  );
}

export function generateMetadata(context: MoviesCountryContext) {
  const {
    params: { type },
  } = context;

  const country = countries.find((c) => c.slug === type);
  if (!country) {
    return useMetadata({
      title: 'Not Found',
      description: 'The page is not found.',
      urlPath: `/countries/${type}`,
    });
  }

  return useMetadata({
    title: `Phim ${country.name}`,
    description: `Phim ${country.name} - Tuyển tập danh sách phim ${country.name} hay nhất mọi thời đại vietsub và thuyết minh nhanh nhất.`,
    urlPath: `/countries/${type}`,
  });
}
