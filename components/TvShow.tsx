'use client';
import { Movie } from '@/types';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { FC, useState } from 'react';
import { Image } from './Image';

type TvShowProps = {
  shows: Movie[];
};

const TvShowCard = ({ show }: { show: Movie }) => {
  return (
    <Link
      key={show._id}
      href={`/movies/${show.slug}`}
      className="flex gap-3 group bg-white/5 rounded rounded-l-lg"
    >
      <div className="w-full h-36 rounded-lg overflow-hidden relative max-w-[96px] md:max-w-[256px]">
        <Image
          src={show.poster_url}
          alt={show.name}
          width={256}
          height={144}
          className="h-full aspect-[2/3] sm:aspect-video"
        />
        <span className="absolute inset-0 opacity-0 bg-black/70 flex items-center justify-center duration-300 group-hover:opacity-100">
          <Icon
            icon="ph:play-fill"
            height={36}
            className="group-hover:scale-100 scale-150 duration-300"
          />
        </span>
      </div>
      <div className="max-w-xs mr-2">
        <h3 className="text-lg font-bold line-clamp-2 my-1 leading-6">
          <abbr className="no-underline" title={show.name}>
            {show.name}
          </abbr>
        </h3>
        <div className="flex items-center gap-1.5 text-xs">
          <span className="border-2 border-white px-1.5">
            <strong>{show.quality}</strong>
          </span>
          <span className="bg-white px-1.5 py-0.5">
            <strong className="text-black">{show.lang}</strong>
          </span>
        </div>
        <p className="flex items-center gap-1.5 text-sm mt-2 mb-1 font-semibold">
          <Icon icon="solar:playlist-bold" height={16} />
          {show.episode_current}
        </p>
        <p className="flex items-center gap-1.5 text-sm font-semibold">
          <Icon icon="icon-park-outline:time" height={16} />
          {show.time}
        </p>
      </div>
    </Link>
  );
};

export const TvShow: FC<TvShowProps> = ({ shows }) => {
  return (
    <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
      {shows.map((show) => (
        <TvShowCard key={show._id} show={show} />
      ))}
    </div>
  );
};
