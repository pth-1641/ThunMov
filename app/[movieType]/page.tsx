import { Pagination } from "@/components/Pagination";
import { MovieCard } from "@/components/movies/MovieCard";
import { movieTypes } from "@/constants";
import { useFetch, useMetadata } from "@/hooks";
import { Movie } from "@/types";
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

  const type = movieTypes.find((t) => t.path === movieType);
  if (!type) return notFound();

  const { data } = await useFetch(
    type.path === "tim-kiem"
      ? `/tim-kiem?keyword=${q} &page=${page}`
      : `/danh-sach/${type.path}&page=${page}`
  );
  if (!data) return notFound();

  return (
    <main className="mx-auto max-w-7xl px-5">
      <h2 className="mt-24 capitalize text-3xl font-bold mb-6 md:text-4xl">
        {type.title}
      </h2>
      {data.items.length ? (
        <>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
            {data.items.map((movie: Movie) => (
              <MovieCard item={movie} key={movie._id} />
            ))}
          </div>
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

export function generateMetadata(context: MovieTypeContext) {
  const {
    params: { movieType },
  } = context;

  const movie = movieTypes.find((m) => m.path === movieType);
  if (!movie) {
    return useMetadata({
      title: "Not Found",
      description: "The page is not found.",
      urlPath: `/${movieType}`,
    });
  }

  return useMetadata({
    title: movie.title,
    description: `Tuyển tập ${movie.title} mới nhất, Phim ngắn ít tập hay, Chọn lọc những bô phim bom tấn chiếu rập đình đám trong và ngoài nước.`,
    urlPath: `/${movie.path}`,
  });
}
