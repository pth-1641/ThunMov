import { MovieList } from "@/components/movies/MovieList";
import { Pagination } from "@/components/Pagination";
import { LIMIT_PER_PAGE } from "@/constants";
import { useFetch } from "@/hooks";
import { useMetadata } from "@/hooks/";
import { notFound } from "next/navigation";

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

  const { data } = await useFetch(
    `/quoc-gia/${type}?page=${page}&limit=${LIMIT_PER_PAGE}`
  );
  if (!data) return notFound();

  return (
    <main className="mx-auto max-w-screen-2xl px-5">
      <MovieList movies={data.items} title={`Phim ${data.titlePage}`} />
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
      title: "Not Found",
      description: "The page is not found.",
      urlPath: `/countries/${type}`,
    });
  }

  return useMetadata({
    title: `Phim ${data.titlePage}`,
    description: `Phim ${data.titlePage} - Tuyển tập danh sách phim ${data.titlePage} hay nhất mọi thời đại vietsub và thuyết minh nhanh nhất.`,
    urlPath: `/countries/${type}`,
  });
}
