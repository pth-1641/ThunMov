'use client';
import { ModalContext } from '@/context/modal.context';
import { useFetch } from '@/hooks';
import { MovieDetail } from '@/types';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';

type MovieDetailContext = {
  params: { id: string };
};

export default async function MovieDetail(context: MovieDetailContext) {
  const {
    params: { id },
  } = context;

  const { dispatch } = useContext(ModalContext);

  const { data } = await useFetch(`/movies/${id}`);
  if (!data) return 'hehe';

  const movie: MovieDetail = data;

  return (
    <>
      <div
        style={{ backgroundImage: `url(${movie.poster_url})` }}
        className="bg-cover w-full aspect-video max-h-[800px] relative bg-center"
      >
        <div className="absolute inset-0 bg-black/95 flex items-center">
          <div className="w-full max-w-7xl mx-auto flex items-center gap-8">
            <Image
              src={movie.thumb_url}
              alt={movie.name}
              height={450}
              width={300}
              className="object-cover bg-stone-900 aspect-[2/3] rounded"
            />
            <div>
              <h2 className="text-5xl font-extrabold">{movie.name}</h2>
              <span className="text-primary font-bold">
                {movie.origin_name}
              </span>
              <div className="font-medium flex items-center gap-5 my-4">
                <div className="flex items-center gap-2 text-xs font-bold">
                  <span className="bg-white px-2.5 py-1 text-black">
                    {movie.episode_current}
                  </span>
                  <span className="border-2 border-white px-2.5 py-0.5">
                    {movie.quality}
                  </span>
                </div>
                <ul className="flex items-center gap-2">
                  {movie.category.map((g, idx) => (
                    <Link
                      href={`/genres/${g.slug}`}
                      key={g.id}
                      className="hover:text-primary"
                    >
                      {g.name}
                      {idx + 1 !== movie.category.length ? ',' : ''}
                    </Link>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-5">
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
                  {movie.time}
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
              <div className="flex items-center gap-2 my-2">
                <Icon
                  icon="grommet-icons:language"
                  className="text-primary"
                  height={16}
                />
                <ul className="flex items-center gap-2">
                  {movie.country.map((c, idx) => (
                    <Link
                      href={`/genres/${c.slug}`}
                      key={c.id}
                      className="hover:text-primary"
                    >
                      {c.name}
                      {idx + 1 !== movie.country.length ? ',' : ''}
                    </Link>
                  ))}
                </ul>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: movie.content }}
                className="text-sm"
              />
              <div className="border border-white/5 bg-white/5 px-7 py-4 flex items-center w-max rounded-lg mt-8 gap-5">
                <div className="flex flex-col items-center gap-1 text-sm">
                  <Icon icon="solar:share-bold" height={18} />
                  Share
                </div>
                <span className="block h-12 w-0.5 bg-white/10" />
                <div className="flex items-center gap-3 text-sm font-bold">
                  <button
                    className="rounded-full bg-primary text-black px-8 py-3 disabled:bg-gray-500 disabled:hover:bg-gray-500"
                    disabled={!!movie.trailer_url}
                    onClick={() => {
                      dispatch({
                        type: 'TRAILER',
                        payload: { trailerUrl: movie.trailer_url },
                      });
                    }}
                  >
                    Trailer
                  </button>
                  <button className="rounded-full border-2 border-primary px-8 py-2.5 bg-black/70 duration-300 hover:bg-primary hover:text-black">
                    Xem Phim
                  </button>
                  <Icon
                    icon="solar:heart-linear"
                    height={28}
                    className="ml-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
