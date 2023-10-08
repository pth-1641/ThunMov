import { Pagination } from '@/components/Pagination';
import { TvShow } from '@/components/TvShow';
import { useFetch } from '@/hooks';

type TvShowContext = {
  searchParams: {
    page: string;
  };
};

export default async function TvShows(context: TvShowContext) {
  const {
    searchParams: { page = 1 },
  } = context;

  const { data } = await useFetch('/type', { movieType: 'tv-shows', page });
  if (!data) return 'hehe';

  return (
    <main className="mx-auto max-w-7xl">
      <h2 className="mt-24 text-center text-4xl font-bold mb-6">TV Shows</h2>
      <TvShow shows={data.items} />
      <Pagination currentPage={data.currentPage} totalPages={data.totalPages} />
    </main>
  );
}
