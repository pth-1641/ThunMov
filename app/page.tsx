import { MovieCarousel } from "@/components/movies/MovieCarousel";
import { MovieCategory } from "@/components/movies/MovieCategory";
import { LIMIT_PER_PAGE } from "@/constants";
import { useFetch } from "@/hooks";

export default async function Home() {
  const [
    hotMovies,
    actionMovies,
    animeMovies,
    horrorMovies,
    thaiMovies,
    documentaryMovies,
  ] = await Promise.all([
    useFetch("/home"),
    useFetch(`/the-loai/hanh-dong?limit=${LIMIT_PER_PAGE}`),
    useFetch(`/danh-sach/hoat-hinh?limit=${LIMIT_PER_PAGE}`),
    useFetch(`/the-loai/kinh-di?limit=${LIMIT_PER_PAGE}`),
    useFetch(`/quoc-gia/thai-lan?limit=${LIMIT_PER_PAGE}`),
    useFetch(`/the-loai/tai-lieu?limit=${LIMIT_PER_PAGE}`),
  ]);

  return (
    <>
      <MovieCarousel movies={hotMovies.data.items} />
      <MovieCategory
        movies={actionMovies.data.items}
        title="Phim Hành Động"
        explorePath="/the-loai/hanh-dong"
      />
      <MovieCategory
        movies={animeMovies.data.items}
        title="Anime"
        explorePath="/hoat-hinh"
      />
      <MovieCategory
        movies={horrorMovies.data.items}
        title="Phim Kinh Dị"
        explorePath="/the-loai/kinh-di"
      />
      <MovieCategory
        movies={thaiMovies.data.items}
        title="Phim Thái Lan"
        explorePath="/quoc-gia/thai-lan"
      />
      <MovieCategory
        movies={documentaryMovies.data.items}
        title="Phim Tài Liệu"
        explorePath="/the-loai/tai-lieu"
      />
    </>
  );
}
