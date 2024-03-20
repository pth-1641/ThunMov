"use client";
import { Image } from "@/components/Image";
import { Pagination } from "@/components/Pagination";
import { AppContext } from "@/context/app.context";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useContext, useEffect, useState } from "react";

type Movie = {
  slug: string;
  thumb_url: string;
  name: string;
};

const ITEMS_PER_PAGE = 24;

export default function FavouritePage() {
  return (
    <Suspense>
      <Favourite />
    </Suspense>
  );
}

function Favourite() {
  const { state, dispatch } = useContext(AppContext);
  const [movies, setMovies] = useState<Movie[]>([]);
  const searchParams = useSearchParams();

  let page = searchParams.get("page") || 1;
  page = Number.isNaN(+page) ? 1 : +page;

  useEffect(() => {
    const idx = (+page - 1) * ITEMS_PER_PAGE;
    setMovies(state.favMovies.slice(idx, idx + ITEMS_PER_PAGE));
  }, [page, state]);

  if (!movies.length) {
    return (
      <h5 className="font-bold text-2xl text-center min-h-screen mt-24">
        Chưa có phim yêu thích nào
      </h5>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 min-h-screen">
      <h2 className="mt-24 capitalize text-3xl font-bold mb-6 md:text-4xl">
        Yêu Thích
      </h2>
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14">
        {movies.map((movie) => (
          <div key={movie.slug}>
            <div className="relative rounded-lg overflow-hidden group">
              <Icon
                icon="ph:heart-fill"
                className="absolute top-2.5 right-2.5"
                color="red"
                height={28}
              />
              <Image
                src={movie.thumb_url}
                alt={movie.name}
                className="aspect-[2/3]"
              />
              <Link
                href={`/movies/${movie.slug}`}
                className="absolute inset-0 z-10 md:hidden"
              />
              <div className="absolute inset-0 bg-black/60 none flex-col items-center justify-center gap-4 text-sm font-bold opacity-0 group-hover:opacity-100 duration-300 text-center hidden md:flex">
                <button
                  className="rounded-full w-36 px-6 py-2.5 -translate-y-3 group-hover:translate-y-0 duration-300 bg-[#f00]"
                  onClick={() =>
                    dispatch({
                      type: "REMOVE",
                      payload: {
                        slug: movie.slug,
                      },
                    })
                  }
                >
                  Bỏ Thích
                </button>
                <Link
                  href={`/movies/${movie.slug}`}
                  className="rounded-full border-2 bg- border-primary w-36 px-6 py-2.5 bg-black/70 translate-y-3 group-hover:translate-y-0 duration-300 hover:bg-primary hover:text-black"
                >
                  Chi Tiết
                </Link>
              </div>
            </div>
            <Link
              href={`/movies/${movie.slug}`}
              className="hover:text-primary duration-150 text-lg font-bold mt-1.5 block"
            >
              <abbr title={movie.name} className="no-underline line-clamp-2">
                {movie.name}
              </abbr>
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalItems={state.favMovies.length}
        totalItemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}
