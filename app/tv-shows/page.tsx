import { Pagination } from '@/components/Pagination';
import { TvShow } from '@/components/TvShow';
import { useFetch, useMetadata } from '@/hooks';
import { notFound } from 'next/navigation';

type TvShowContext = {
  searchParams: {
    page: string;
  };
};

export default async function TvShows(context: TvShowContext) {
  let {
    searchParams: { page = 1 },
  } = context;

  page = Number.isNaN(page) ? 1 : page;
  const { data } = await useFetch(`/danh-sach/tv-shows?page=${page}`);
  if (!data) return notFound();

  return (
    <main className="mx-auto max-w-7xl px-5">
      <h2 className="mt-24 text-center text-3xl font-bold mb-6 lg:text-4xl">
        TV Shows
      </h2>
      <TvShow shows={data.items} />
      <Pagination {...data.params.pagination} />
    </main>
  );
}

export async function generateMetadata(context: TvShowContext) {
  const {
    searchParams: { page },
  } = context;

  const { data } = await useFetch(`/danh-sach/tv-shows?page=${page}`);
  if (!data) {
    return useMetadata({
      title: 'Not Found',
      description: 'The page is not found.',
      urlPath: `/tv-shows`,
    });
  }

  return useMetadata({
    title: `TV Shows`,
    description: data.seoOnPage.descriptionHead.replace(
      '2022',
      new Date().getFullYear()
    ),
    urlPath: `/tv-shows`,
  });
}
