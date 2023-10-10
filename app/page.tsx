import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { MovieCategory } from '@/components/movies/MovieCategory';
import { useFetch } from '@/hooks';

export default async function Home() {
  const movies = await Promise.all([
    useFetch('/new'),
    useFetch('/genres', { type: 'co-trang' }),
    useFetch('/anime'),
    useFetch('/genres', { type: 'kinh-di' }),
    useFetch('/countries', { type: 'thai-lan' }),
  ]);

  return (
    <>
      <MovieCarousel movies={movies[0].data.items} />
      <MovieCategory
        movies={movies[1].data.items}
        title="Phim Cổ Trang"
        pathAll="/genres/co-trang"
      />
      <MovieCategory
        movies={movies[2].data.items}
        title="Anime"
        pathAll="/anime"
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
