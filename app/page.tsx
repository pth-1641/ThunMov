import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { MovieCategory } from '@/components/movies/MovieCategory';
import { useFetch } from '@/hooks';

export default async function Home() {
  const movies = await Promise.all([
    useFetch('/new'),
    useFetch('/genres/co-trang'),
    useFetch('/anime'),
    useFetch('/feature?category=kinh-di'),
    useFetch('/countries/thai-lan'),
  ]);

  if (!movies) return;

  return (
    <>
      <MovieCarousel movies={movies[0].data.items} />
      <MovieCategory
        movies={movies[1].data.items}
        title="Phim Cổ Trang"
        path="/genres/co-trang"
      />
      <MovieCategory
        movies={movies[2].data.items}
        title="Anime"
        path="/anime"
      />
      <MovieCategory
        movies={movies[3].data.items}
        title="Phim Kinh Dị"
        path="/genres/kinh-di"
      />
      <MovieCategory
        movies={movies[4].data.items}
        title="Phim Thái Lan"
        path="/countries/thai-lan"
      />
    </>
  );
}
