'use client';
import { Movie } from '@/types';
import { Icon } from '@iconify/react';
import { FC, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MovieCard } from './MovieCard';
import SwiperCore from 'swiper';
import Link from 'next/link';

type MovieCategoryProps = {
  title: string;
  movies: Movie[];
  path: string;
};

export const MovieCategory: FC<MovieCategoryProps> = (props) => {
  const { title, movies, path } = props;

  const swiperRef = useRef<SwiperCore>();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6 mt-12">
        <h3 className="text-3xl font-extrabold">{title}</h3>
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
        spaceBetween={30}
        slidesPerView={4}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {movies.map((item) => (
          <SwiperSlide key={item._id}>
            <MovieCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Link
        href={path}
        className="flex items-center px-5 py-2 border-2 border-primary w-max mx-auto mt-8 hover:bg-primary duration-150 hover:text-black font-bold"
      >
        Xem Tất Cả
        <Icon icon="icon-park-outline:right" height={20} />
      </Link>
    </div>
  );
};
