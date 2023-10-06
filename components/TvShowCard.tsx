'use client';
import { imageCdnUrl } from '@/constants';
import { Movie } from '@/types';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState, useEffect } from 'react';

type TvShowCardProps = {
  show: Movie;
};

export const TvShowCard: FC<TvShowCardProps> = ({ show }) => {
  const [src, setSrc] = useState<string>(show.poster_url);

  useEffect(() => {
    setSrc('');
  }, [show]);

  return (
    <Link
      key={show._id}
      href={`/movies/${show.slug}`}
      className="flex gap-3 group bg-white/5 rounded rounded-l-lg"
    >
      <div className="aspect-video h-36 rounded-lg overflow-hidden relative">
        <Image
          src={imageCdnUrl + src}
          alt={show.name}
          className="bg-stone-900 w-full h-full object-cover"
          width={256}
          height={144}
          onError={() => setSrc(show.thumb_url)}
          onLoad={() => setSrc(show.poster_url)}
        />
        <span className="absolute inset-0 opacity-0 bg-black/70 flex items-center justify-center duration-300 group-hover:opacity-100">
          <Icon
            icon="ph:play-fill"
            height={36}
            className="group-hover:scale-100 scale-150 duration-300"
          />
        </span>
      </div>
      <div className="max-w-xs">
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
