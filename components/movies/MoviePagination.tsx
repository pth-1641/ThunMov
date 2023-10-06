'use client';
import { Movie } from '@/types';
import { useParams, usePathname } from 'next/navigation';
import { FC, useContext, useEffect, useState } from 'react';
import { MovieCard } from './MovieCard';
import { countries, genres } from '@/constants';

type MoviePaginationProps = {
  movies: Movie[];
};

export const MoviePagination: FC<MoviePaginationProps> = (props) => {
  const { movies } = props;
  const [title, setTitle] = useState<string>();
  const pathname = usePathname();
  const { type } = useParams();

  useEffect(() => {
    if (pathname.includes('genres')) {
      const genre = genres.find((g) => g.slug === type);
      setTitle(genre?.name);
    } else if (pathname.includes('countries')) {
      const country = countries.find((c) => c.slug === type);
      setTitle(country?.name);
    }
  }, []);

  return (
    <>
      <h2 className="mt-24 capitalize text-4xl font-bold mb-6">Phim {title}</h2>
      <div className="grid grid-cols-4 gap-x-7 gap-y-14">
        {movies.map((movie: Movie) => (
          <MovieCard item={movie} key={movie._id} />
        ))}
      </div>
    </>
  );
};
