import { Movie } from "@/types";
import { FC } from "react";
import { MovieCard } from "./MovieCard";

type MovieListProps = {
  movies: Movie[];
  title: string;
};

export const MovieList: FC<MovieListProps> = (props) => {
  const { movies, title } = props;

  return (
    <>
      <div className="flex items-center justify-between mt-24 mb-10">
        <h2 className="text-3xl font-extrabold md:text-4xl">{title}</h2>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 xl:grid-cols-5 lg:gap-x-6 lg:gap-y-14">
        {movies.map((movie: Movie) => (
          <MovieCard item={movie} key={movie._id} />
        ))}
      </div>
    </>
  );
};
