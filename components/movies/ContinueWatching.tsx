"use client";
import { Movie } from "@/types";
import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieCard } from "./MovieCard";

export const ContinueWatching = () => {
  const swiperRef = useRef<SwiperCore>();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const savedHistories = JSON.parse(
      localStorage.getItem("histories") || "[]",
    );
    setMovies(savedHistories);
  }, []);

  const handleRemoveMovie = (_id: string) => {
    const savedHistories = JSON.parse(
      localStorage.getItem("histories") || "[]",
    );

    const filteredMovies = savedHistories.filter(
      (movie: Movie) => movie._id !== _id,
    );
    localStorage.setItem("histories", JSON.stringify(filteredMovies));
    setMovies(filteredMovies);
  };

  if (!movies.length) return null;
  return (
    <div className="max-w-screen-2xl mx-auto px-5 mb-20">
      <div className="flex items-center justify-between mb-6 mt-12">
        <h3 className="text-2xl md:text-3xl font-extrabold">Xem Tiếp</h3>
        <div className="flex items-center rounded-full border-2 border-white/10 text-white">
          <button
            className="px-3 py-1.5"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <Icon icon="icon-park-outline:left" height={24} />
          </button>
          <span className="w-0.5 h-6 rounded bg-white/10" />
          <button
            className="px-3 py-1.5"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <Icon icon="icon-park-outline:right" height={24} />
          </button>
        </div>
      </div>
      <Swiper
        loop={true}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          0: {
            spaceBetween: 15,
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          640: {
            spaceBetween: 20,
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          992: {
            spaceBetween: 20,
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          1280: {
            spaceBetween: 20,
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
        }}
      >
        {movies.map((item) => (
          <SwiperSlide key={item._id} className="relative">
            <button
              className="absolute top-2 right-2 size-5 flex items-center justify-center bg-red-500 z-20 text-white rounded"
              onClick={() => handleRemoveMovie(item._id)}
            >
              <Icon icon="mdi:remove" />
            </button>
            <MovieCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
