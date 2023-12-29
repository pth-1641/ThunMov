'use client';
import { Movie } from '@/types';
import { FC } from 'react';
import { MovieCard } from './MovieCard';

type MoviePaginationProps = {
  movies: Movie[];
  title: string;
};

export const MoviePagination: FC<MoviePaginationProps> = (props) => {
  const { movies, title } = props;

  return (
    <>
      <h2 className="mt-24 capitalize text-3xl font-bold mb-6 md:text-4xl">
        {title !== 'Tìm Kiếm' ? `Phim ${title.replace('Phim', '')}` : title}
      </h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
        {movies.map((movie: Movie) => (
          <MovieCard item={movie} key={movie._id} />
        ))}
      </div>
    </>
  );
};
