"use client";
import { Movie } from "@/types";
import { Icon } from "@iconify/react";
import { FC, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { MovieCard } from "./MovieCard";
import SwiperCore from "swiper";
import Link from "next/link";

type MovieCategoryProps = {
  movies: Movie[];
  title?: string;
  explorePath?: string;
  slidesPerView?: number;
};

export const MovieCategory: FC<MovieCategoryProps> = (props) => {
  const { title, movies, explorePath, slidesPerView = 5 } = props;

  const swiperRef = useRef<SwiperCore>();

  return (
    <div className="max-w-screen-2xl mx-auto px-5">
      <div className="flex items-center justify-between mb-6 mt-12">
        <h3 className="text-2xl md:text-3xl font-extrabold">{title}</h3>
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
            slidesPerGroup: slidesPerView,
          },
          1280: {
            spaceBetween: 20,
            slidesPerView,
            slidesPerGroup: slidesPerView,
          },
        }}
      >
        {movies.map((item) => (
          <SwiperSlide key={item._id}>
            <MovieCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      {explorePath && (
        <Link
          href={explorePath}
          className="flex items-center px-5 py-2 gap-1 border-2 border-primary w-max mx-auto mt-8 hover:bg-primary duration-150 hover:text-black font-bold rounded-full group"
        >
          Xem Thêm
          <Icon
            icon="fluent:chevron-double-right-16-filled"
            height={20}
            className="group-hover:translate-x-1/4 duration-300"
          />
        </Link>
      )}
    </div>
  );
};
