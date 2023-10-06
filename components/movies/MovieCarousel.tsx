'use client';
import { imageCdnUrl } from '@/constants';
import { Movie } from '@/types';
import { Icon } from '@iconify/react/dist/iconify.js';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { EffectFade, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type MovieCarouselProps = {
  movies: Movie[];
};

export const MovieCarousel: FC<MovieCarouselProps> = (props) => {
  const { movies } = props;
  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={'fade'}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
    >
      {movies.map((item: Movie) => (
        <SwiperSlide key={item._id}>
          <div
            className="bg-cover w-full aspect-video max-h-[800px] relative bg-center"
            style={{ backgroundImage: `url(${imageCdnUrl + item.poster_url})` }}
          >
            <div className="absolute inset-0 bg-black/90 flex items-center">
              <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-8">
                <div>
                  <h2 className="text-5xl font-extrabold leading-snug">
                    {item.name}
                  </h2>
                  <h3 className="text-primary font-bold text-lg">
                    {item.origin_name}
                  </h3>
                  <div className="font-medium flex items-center gap-5 my-10">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span className="bg-white px-2.5 py-1 text-black">
                        {item.episode_current}
                      </span>
                      <span className="border-2 border-white px-2.5 py-0.5">
                        {item.quality}
                      </span>
                    </div>
                    <ul className="flex items-center gap-2">
                      {item.category.map((g, idx) => (
                        <Link
                          href={`/genres/${g.slug}`}
                          key={g.id}
                          className="hover:text-primary"
                        >
                          {g.name}
                          {idx + 1 !== item.category.length ? ',' : ''}
                        </Link>
                      ))}
                    </ul>
                    <span className="flex items-center gap-2">
                      <Icon
                        icon="bx:calendar"
                        className="text-primary"
                        height={16}
                      />
                      {item.year}
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon
                        icon="akar-icons:clock"
                        className="text-primary"
                        height={16}
                      />
                      {item.time}
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon
                        icon="tdesign:subtitle"
                        className="text-primary"
                        height={16}
                      />
                      {item.lang}
                    </span>
                  </div>
                  <Link
                    href={`/movies/${item.slug}`}
                    className="border-2 gap-2 border-primary flex items-center px-8 py-4 rounded-full w-max hover:bg-primary duration-150 hover:text-black"
                  >
                    <Icon icon="ion:play" height={18} />
                    <span className="text-xs font-extrabold">XEM NGAY</span>
                  </Link>
                </div>
                <Image
                  src={imageCdnUrl + item.thumb_url}
                  alt={item.origin_name}
                  className="aspect-[2/3] object-cover rounded-lg border-[14px] border-primary"
                  width={320}
                  height={480}
                />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
