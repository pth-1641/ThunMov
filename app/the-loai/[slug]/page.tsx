import { MovieList } from "@/components/movies/MovieList";
import { Pagination } from "@/components/Pagination";
import { LIMIT_PER_PAGE } from "@/constants";
import { useFetch, useMetadata } from "@/hooks";
import { notFound } from "next/navigation";

type MoviesGenreContext = {
  params: { slug: string };
  searchParams: {
    page: string;
  };
};

export default async function MoviesGenre(context: MoviesGenreContext) {
  const {
    params: { slug },
    searchParams: { page = 1 },
  } = context;

  const { data } = await useFetch(
    `/the-loai/${slug}?page=${page}&limit=${LIMIT_PER_PAGE}`
  );
  if (!data) return notFound();

  return (
    <main className="mx-auto max-w-screen-2xl px-5">
      <MovieList movies={data.items} title={`Phim ${data.titlePage}`} />
      <Pagination {...data.params.pagination} />
    </main>
  );
}

export async function generateMetadata(context: MoviesGenreContext) {
  const {
    params: { slug },
    searchParams: { page },
  } = context;

  const { data } = await useFetch(`/the-loai/${slug}?page=${page}`);
  if (!data) {
    return useMetadata({
      title: "Not Found",
      description: "The page is not found.",
      urlPath: `/the-loai/${slug}`,
    });
  }

  const genre = data.titlePage.replace("Phim", "");
  return useMetadata({
    title: `Phim ${genre}`,
    description: `Kho phim ${genre} chọn lọc chất lượng cao hay nhất. Được cập nhật liên tục để phục vụ các mọt phim.`,
    urlPath: `/the-loai/${slug}`,
  });
}
