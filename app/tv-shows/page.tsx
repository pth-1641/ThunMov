import { Pagination } from '@/components/Pagination';
import { TvShowCard } from '@/components/TvShowCard';
import { useFetch } from '@/hooks';
import { Movie } from '@/types';

type TvShowContext = {
  searchParams: {
    page: string;
  };
};

export default async function TvShows(context: TvShowContext) {
  const {
    searchParams: { page = 1 },
  } = context;

  const { data } = await useFetch(`/tv-shows?page=${page}`);
  if (!data) return 'hehe';

  return (
    <main className="mx-auto max-w-7xl">
      <h2 className="mt-24 text-center text-4xl font-bold mb-6">TV Shows</h2>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6">
        {data.items.map((show: Movie) => (
          <TvShowCard show={show} />
        ))}
      </div>
      <Pagination
        currentPage={data.currentPage}
        currentRoute="tv-shows"
        totalPages={data.totalPages}
      />
    </main>
  );
}
