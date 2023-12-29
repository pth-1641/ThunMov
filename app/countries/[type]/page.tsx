import { MoviePagination } from '@/components/movies/MoviePagination';
import { Pagination } from '@/components/Pagination';
import { useFetch } from '@/hooks';
import { useMetadata } from '@/hooks/';
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

  const { data } = await useFetch(`/quoc-gia/${type}?page=${page}`);
  if (!data) return notFound();

  return (
    <main className="mx-auto max-w-7xl px-5">
      <MoviePagination movies={data.items} title={data.titlePage} />
      <Pagination {...data.params.pagination} />
    </main>
  );
}

export async function generateMetadata(context: MoviesCountryContext) {
  const {
    params: { type },
    searchParams: { page },
  } = context;

  const { data } = await useFetch(`/quoc-gia/${type}?page=${page}`);
  if (!data) {
    return useMetadata({
      title: 'Not Found',
      description: 'The page is not found.',
      urlPath: `/countries/${type}`,
    });
  }

  return useMetadata({
    title: `Phim ${data.titlePage}`,
    description: `Phim ${data.titlePage} - Tuyển tập danh sách phim ${data.titlePage} hay nhất mọi thời đại vietsub và thuyết minh nhanh nhất.`,
    urlPath: `/countries/${type}`,
  });
}
