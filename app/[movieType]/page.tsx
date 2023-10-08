import { Pagination } from '@/components/Pagination';
import { MovieCard } from '@/components/movies/MovieCard';
import { movieTypes } from '@/constants';
import { useFetch } from '@/hooks';
import { Movie } from '@/types';

type MovieTypeContext = {
  params: { movieType: string };
  searchParams: {
    page: string;
    q: string;
  };
};

export default async function MovieType(context: MovieTypeContext) {
  const {
    params: { movieType },
    searchParams: { page, q },
  } = context;

  const type = movieTypes.find((t) => t.path === movieType);
  if (!type) return 'not found';

  const { data } = await useFetch('/type', { movieType, page, q });
  if (!data) return 'hehe';

  return (
    <main className="mx-auto max-w-7xl">
      <h2 className="mt-24 capitalize text-4xl font-bold mb-6">{type.title}</h2>
      {data.items.length ? (
        <>
          <div className="grid grid-cols-4 gap-x-7 gap-y-14">
            {data.items.map((movie: Movie) => (
              <MovieCard item={movie} key={movie._id} />
            ))}
          </div>
          <Pagination
            currentPage={data.currentPage}
            totalPages={data.totalPages}
          />
        </>
      ) : (
        <h5 className="font-bold text-2xl text-center min-h-screen">
          Không tìm thấy phim phù hợp
        </h5>
      )}
    </main>
  );
}
