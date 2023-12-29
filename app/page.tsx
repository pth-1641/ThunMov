import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { MovieCategory } from '@/components/movies/MovieCategory';
import { useFetch } from '@/hooks';

export default async function Home() {
  const movies = await Promise.all([
    useFetch('/danh-sach/phim-moi'),
    useFetch('/the-loai/hanh-dong'),
    useFetch('/danh-sach/hoat-hinh'),
    useFetch('/the-loai/kinh-di'),
    useFetch('/quoc-gia/thai-lan'),
  ]);

  return (
    <>
      <MovieCarousel movies={movies[0].data.items} />
      <MovieCategory
        movies={movies[1].data.items}
        title="Phim Hành Động"
        pathAll="/genres/hanh-dong"
      />
      <MovieCategory
        movies={movies[2].data.items}
        title="Anime"
        pathAll="/phim-hoat-hinh"
      />
      <MovieCategory
        movies={movies[3].data.items}
        title="Phim Kinh Dị"
        pathAll="/genres/kinh-di"
      />
      <MovieCategory
        movies={movies[4].data.items}
        title="Phim Thái Lan"
        pathAll="/countries/thai-lan"
      />
    </>
  );
}
