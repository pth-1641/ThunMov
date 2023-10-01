import { Movie } from '@/types';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { FC } from 'react';

type MovieCardProps = {
  item: Movie;
};

export const MovieCard: FC<MovieCardProps> = ({ item }) => {
  return (
    <div className="select-none group">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={item.thumb_url}
          alt={item.origin_name}
          className="object-cover w-full h-full aspect-[2/3] bg-stone-900"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-4 text-sm font-bold opacity-0 group-hover:opacity-100 duration-300 text-center">
          <Link
            href={`/movies/${item.slug}`}
            className="rounded-full bg-primary text-black w-36 px-6 py-2.5 -translate-y-3 group-hover:translate-y-0 duration-300"
          >
            Trailer
          </Link>
          <button className="rounded-full border-2 bg- border-primary w-36 px-6 py-2.5 bg-black/70 translate-y-3 group-hover:translate-y-0 duration-300 hover:bg-primary hover:text-black">
            Chi Tiết
          </button>
        </div>
      </div>
      <h3 className="flex items-center justify-between my-3 gap-5">
        <Link
          href={`/movies/${item.slug}`}
          className="hover:text-primary duration-150 text-lg font-bold truncate"
        >
          <abbr title={item.name} className="no-underline">
            {item.name}
          </abbr>
        </Link>
        <span className="text-primary text-sm font-medium">{item.year}</span>
      </h3>
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="border-2 border-white px-2 py-0.5">
            <strong className="text-primary">{item.quality}</strong>
          </span>
          <span className="bg-white px-2 py-1">
            <strong className="text-black">{item.lang}</strong>
          </span>
        </div>
        <span className="flex items-center gap-1.5">
          <Icon icon="akar-icons:clock" className="text-primary" height={16} />
          {item.time}
        </span>
      </div>
    </div>
  );
};
