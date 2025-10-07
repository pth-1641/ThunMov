"use client";
import { CDN_IMAGE_URL } from "@/constants";
import { Movie } from "@/types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Image } from "../Image";
import Link from "next/link";
import { FC } from "react";
import { EffectFade, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type MovieCarouselProps = {
  movies: Movie[];
};

export const MovieCarousel: FC<MovieCarouselProps> = (props) => {
  const { movies } = props;

  return (
    <Swiper
      modules={[EffectFade, Autoplay]}
      effect={"fade"}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
    >
      {movies.map((movie: Movie) => (
        <SwiperSlide key={movie._id}>
          <div
            className="bg-cover min-h-screen w-full relative bg-center max-h-[800px] lg:min-h-0 lg:aspect-video bg-black"
            style={{
              backgroundImage: `url(${
                CDN_IMAGE_URL + movie.thumb_url.replace("thumb", "poster")
              }&output=webp), url(${
                CDN_IMAGE_URL + movie.thumb_url
              }&output=webp)`,
            }}
          >
            <div className="absolute inset-0 bg-secondary/50 flex items-center">
              <div className="relative z-10 w-full max-w-screen-2xl px-4 mx-auto flex items-center justify-between gap-8">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-extrabold leading-snug">
                    {movie.name}
                  </h2>
                  <h3 className="text-primary font-bold md:text-lg">
                    {movie.origin_name}
                  </h3>
                  <div className="font-medium flex flex-col gap-2.5 mt-5 lg:mt-10 lg:gap-5 lg:items-center lg:flex-row">
                    <div className="flex items-center gap-2 text-xs font-bold">
                      <span className="bg-white px-2.5 py-1 text-black">
                        {movie.episode_current}
                      </span>
                      <span className="border-2 border-white px-2.5 py-0.5">
                        {movie.quality}
                      </span>
                    </div>
                    <ul className="flex items-center gap-2">
                      {movie.category.slice(0, 2).map((g, idx, arr) => (
                        <Link
                          href={`/the-loai/${g.slug}`}
                          key={g.id}
                          className="hover:text-primary"
                        >
                          {g.name}
                          {idx + 1 !== arr.length ? "," : ""}
                        </Link>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-5 mt-3">
                    <span className="flex items-center gap-2">
                      <Icon
                        icon="bx:calendar"
                        className="text-primary"
                        height={16}
                      />
                      {movie.year}
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon
                        icon="akar-icons:clock"
                        className="text-primary"
                        height={16}
                      />
                      {movie.time.replace("undefined", "???")}
                    </span>
                    <span className="flex items-center gap-2">
                      <Icon
                        icon="tdesign:subtitle"
                        className="text-primary"
                        height={16}
                      />
                      {movie.lang}
                    </span>
                  </div>
                  <Link
                    href={`/movies/${movie.slug}`}
                    className="border-2 gap-2 border-primary flex items-center px-8 py-4 rounded-full w-max hover:bg-primary duration-150 hover:text-black mt-5 lg:mt-10"
                  >
                    <Icon icon="ion:play" height={18} />
                    <span className="text-xs font-extrabold">XEM NGAY</span>
                  </Link>
                </div>
                <Image
                  src={movie.thumb_url}
                  alt={movie.origin_name}
                  className="hidden aspect-[2/3] w-full max-w-[320px] rounded-lg border-[14px] border-primary md:block"
                  width={320}
                  height={480}
                />
              </div>
              <span className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-secondary" />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
