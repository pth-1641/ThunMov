// 'use client';
import { MovieCarousel } from '@/components/movies/MovieCarousel';
import { MovieCategory } from '@/components/movies/MovieCategory';
import { domain } from '@/constants';
import { useFetch } from '@/hooks';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';

export default async function Home() {
  // const [movies, setMovies] = useState<any>();

  // useEffect(() => {
  //   (async () => {
  //     const data = await Promise.all([
  //       useFetch('/new'),
  //       useFetch('/genres/co-trang'),
  //       useFetch('/anime'),
  //       useFetch('/feature?category=kinh-di'),
  //       useFetch('/countries/thai-lan'),
  //     ]);
  //     if (!data.length) return notFound();
  //     setMovies(data);
  //   })();
  // }, []);

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
