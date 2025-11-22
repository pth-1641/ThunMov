import { Pagination } from "@/components/Pagination";
import { MoviePagination } from "@/components/movies/MoviePagination";
import { MOVIE_TYPES } from "@/constants";
import { useFetch, useMetadata } from "@/hooks";
import { notFound } from "next/navigation";

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
    searchParams: { page = 1, q = "" },
  } = context;

  const type = MOVIE_TYPES.find((t) => t.slug === movieType);
  if (!type) return notFound();

  const { data } = await useFetch(
    type.slug === "tim-kiem"
      ? `/tim-kiem?keyword=${q}&page=${page}`
      : `/danh-sach/${type.slug}?page=${page}`
  );
  if (!data) return notFound();

  return (
    <main className="mx-auto max-w-screen-2xl px-5">
      {data.items.length ? (
        <>
          <MoviePagination movies={data.items} title={`Tìm Kiếm: ${q}`} />
          <Pagination {...data.params.pagination} />
        </>
      ) : (
        <h5 className="font-bold text-2xl text-center min-h-screen">
          Không tìm thấy phim phù hợp
        </h5>
      )}
    </main>
  );
}

export async function generateMetadata(context: MovieTypeContext) {
  const {
    params: { movieType },
    searchParams: { page },
  } = context;

  const movie = MOVIE_TYPES.find((m) => m.slug === movieType);
  if (!movie) {
    return useMetadata({
      title: "Not Found",
      description: "The page is not found.",
      urlPath: `/${movieType}`,
    });
  }

  const { data } = await useFetch(`/danh-sach/${movie.slug}?page=${page}`);
  return useMetadata({
    title: movie.name,
    description: data.seoOnPage.descriptionHead.replace(
      "2022",
      new Date().getFullYear()
    ),
    urlPath: `/${movie.slug}`,
  });
}
