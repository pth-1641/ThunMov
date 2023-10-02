import { MoviePagination } from '@/components/movies/MoviePagination';
import { Pagination } from '@/components/Pagination';
import { useFetch } from '@/hooks';

type MoviesGenreContext = {
  params: { type: string };
  searchParams: {
    page: string;
  };
};

export default async function MoviesGenre(context: MoviesGenreContext) {
  const {
    params: { type },
    searchParams: { page },
  } = context;

  const { data } = await useFetch(`/genres/${type}?page=${page || 1}`);
  if (!data) return 'hehe';

  return (
    <main className="mx-auto max-w-7xl">
      <MoviePagination movies={data.items} />
      <Pagination
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        currentRoute={`genres/${type}`}
      />
    </main>
  );
}
