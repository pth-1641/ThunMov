'use client';
import { movieTypes } from '@/constants';
import { useFetch } from '@/hooks';
import { Category } from '@/types';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [genres, setGenres] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Category[]>([]);

  useEffect(() => {
    (async () => {
      const res: any = await Promise.all([
        useFetch('/genres'),
        useFetch('/countries'),
      ]);
      setGenres(res[0].data.items);
      setCountries(res[1].data.items);
    })();
  }, []);

  return (
    // bg-gray-800
    <header className="bg-transparent py-3 fixed top-0 inset-x-0 z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className=" flex items-center text-2xl font-extrabold gap-2 select-none">
            <Icon
              icon="ant-design:thunderbolt-filled"
              className="text-primary"
              height={40}
            />
            ThunMov
          </h1>
        </Link>
        <div className="uppercase font-bold text-sm flex items-center gap-12">
          <span className="relative group hover:text-primary cursor-pointer">
            Loại phim
            <ul className="dropdown-menu grid-cols-2">
              {movieTypes.map((t) => (
                <Link
                  key={t.path}
                  href={`/${t.path}`}
                  className="hover:text-primary duration-100"
                >
                  {t.title}
                </Link>
              ))}
            </ul>
          </span>
          <span className="relative group hover:text-primary cursor-pointer">
            Thể loại
            <ul className="dropdown-menu">
              {genres.map((g: Category) => (
                <Link
                  key={g.slug}
                  href={`/genres/${g.slug}`}
                  className="hover:text-primary duration-100"
                >
                  {g.name}
                </Link>
              ))}
            </ul>
          </span>
          <span className="relative group hover:text-primary cursor-pointer">
            Quốc gia
            <ul className="dropdown-menu">
              {countries.map((c: Category) => (
                <Link
                  key={c.slug}
                  href={`/countries/${c.slug}`}
                  className="hover:text-primary duration-100"
                >
                  {c.name}
                </Link>
              ))}
            </ul>
          </span>
          <Link href="/tv-shows" className="hover:text-primary">
            TV Shows
          </Link>
          <Link href="/upcoming" className="hover:text-primary">
            Sắp chiếu
          </Link>
        </div>
        <div className="flex items-center text-primary gap-5">
          <Icon icon="iconamoon:search-bold" height={24} />
          <Icon icon="ic:sharp-language" height={24} />
        </div>
      </nav>
    </header>
  );
};