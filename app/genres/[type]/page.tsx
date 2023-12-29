import { MoviePagination } from "@/components/movies/MoviePagination";
import { Pagination } from "@/components/Pagination";
import { genres } from "@/constants";
import { useFetch, useMetadata } from "@/hooks";
import { notFound } from "next/navigation";

type MoviesGenreContext = {
  params: { type: string };
  searchParams: {
    page: string;
  };
};

export default async function MoviesGenre(context: MoviesGenreContext) {
  const {
    params: { type },
    searchParams: { page = 1 },
  } = context;

  const { data } = await useFetch(`/the-loai/${type}?page=${page}`);
  if (!data) return notFound();

  return (
    <main className="mx-auto max-w-7xl px-5">
      <MoviePagination movies={data.items} title={data.titlePage} />
      <Pagination {...data.params.pagination} />
    </main>
  );
}

export function generateMetadata(context: MoviesGenreContext) {
  const {
    params: { type },
  } = context;

  const genre = genres.find((g) => g.slug === type);
  if (!genre) {
    return useMetadata({
      title: "Not Found",
      description: "The page is not found.",
      urlPath: `/genres/${type}`,
    });
  }

  return useMetadata({
    title: `Phim ${genre.name}`,
    description: `Kho phim ${genre.name} chọn lọc chất lượng cao hay nhất. Được cập nhật liên tục để phục vụ các mọt phim.`,
    urlPath: `/movies/${type}`,
  });
}
