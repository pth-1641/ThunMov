'use client';
import { countries, genres, movieTypes } from '@/constants';
import { ModalContext } from '@/context/modal.context';
import { Category } from '@/types';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';

type MobileSubMenu = 'movie' | 'genre' | 'country' | null;

const MobileMenu = () => {
  const [menuType, setMenuType] = useState<MobileSubMenu>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = openMenu ? 'hidden' : 'auto';
    if (openMenu) setMenuType(null);
  }, [openMenu]);

  const handleOpenSubMenu = (type: MobileSubMenu) => {
    if (type === menuType) setMenuType(null);
    else setMenuType(type);
  };

  return (
    <>
      <button className="lg:hidden">
        <Icon
          icon="tabler:menu-deep"
          height={28}
          onClick={() => setOpenMenu(true)}
        />
      </button>
      <div
        className={`fixed inset-0 z-40 duration-300 ${
          openMenu
            ? 'pointer-events-auto bg-black/90 overflow-y-auto overflow-x-hidden'
            : 'pointer-events-none'
        }`}
        onClick={(e) => {
          if (e.target !== e.currentTarget) return;
          setOpenMenu(false);
        }}
      >
        <div
          className={`absolute min-h-screen right-0 w-full max-w-xs bg-zinc-950 font-bold text-xl duration-300 overflow-auto ${
            openMenu ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <Icon
            icon="ic:round-close"
            height={28}
            className="ml-auto cursor-pointer m-3"
            onClick={() => setOpenMenu(false)}
          />
          <button
            className={`flex items-center w-full gap-0.5 p-2.5 ${
              menuType === 'movie' ? 'text-primary' : ''
            }`}
            onClick={() => handleOpenSubMenu('movie')}
          >
            Loại Phim
            <Icon
              icon="icon-park-outline:right"
              height={24}
              className={`duration-300 ${
                menuType === 'movie' ? 'rotate-90' : ''
              }`}
            />
          </button>
          <ul
            className={`grid grid-cols-2 gap-x-2.5 gap-y-1 font-normal text-base overflow-hidden px-2 ${
              menuType === 'movie' ? 'h-max pb-2.5' : 'h-0'
            }`}
          >
            {movieTypes.slice(0, -3).map((type) => (
              <Link
                href={`/${type.path}`}
                key={type.path}
                onClick={() => setOpenMenu(false)}
              >
                {type.title}
              </Link>
            ))}
          </ul>
          <button
            className={`flex items-center border-t w-full border-white/10 gap-0.5 p-2.5 ${
              menuType === 'genre' ? 'text-primary' : ''
            }`}
            onClick={() => handleOpenSubMenu('genre')}
          >
            Thể Loại
            <Icon
              icon="icon-park-outline:right"
              height={24}
              className={`duration-300 ${
                menuType === 'genre' ? 'rotate-90' : ''
              }`}
            />
          </button>
          <ul
            className={`grid grid-cols-2 gap-x-2.5 gap-y-1 font-normal text-base overflow-hidden px-2.5 ease ${
              menuType === 'genre' ? 'h-max pb-2.5' : 'h-0'
            }`}
          >
            {genres.map((genre) => (
              <Link
                href={`/genres/${genre.slug}`}
                key={genre.slug}
                onClick={() => setOpenMenu(false)}
              >
                {genre.name}
              </Link>
            ))}
          </ul>
          <button
            className={`flex items-center border-t w-full border-white/10 gap-0.5 p-2.5 ${
              menuType === 'country' ? 'text-primary' : ''
            }`}
            onClick={() => handleOpenSubMenu('country')}
          >
            Quốc Gia
            <Icon
              icon="icon-park-outline:right"
              height={24}
              className={`duration-300 ${
                menuType === 'country' ? 'rotate-90' : ''
              }`}
            />
          </button>
          <ul
            className={`grid grid-cols-2 gap-x-2.5 gap-y-1 font-normal text-base overflow-hidden px-2.5 ${
              menuType === 'country' ? 'h-max pb-2.5' : 'h-0'
            }`}
          >
            {countries.map((country) => (
              <Link
                href={`/countries/${country.slug}`}
                key={country.slug}
                onClick={() => setOpenMenu(false)}
              >
                {country.name}
              </Link>
            ))}
          </ul>
          <Link
            href="/tv-shows"
            className="block p-2.5 border-t border-white/10"
            onClick={() => setOpenMenu(false)}
          >
            TV Shows
          </Link>
          <Link
            href="/upcoming"
            className="block p-2.5 border-t border-white/10"
            onClick={() => setOpenMenu(false)}
          >
            Sắp Chiếu
          </Link>
        </div>
      </div>
    </>
  );
};

export const Navbar = () => {
  const [displayBgColor, setDisplayBgColor] = useState<boolean>(false);
  const { dispatch } = useContext(ModalContext);

  useEffect(() => {
    function checkPositionHandler() {
      if (window.scrollY == 0) setDisplayBgColor(false);
      else setDisplayBgColor(true);
    }
    checkPositionHandler();
    window.addEventListener('scroll', checkPositionHandler);
    return () => window.removeEventListener('scroll', checkPositionHandler);
  }, []);

  return (
    <header
      className={`${
        displayBgColor ? 'bg-black' : 'bg-transparent'
      }  py-3 fixed top-0 inset-x-0 z-40 duration-300`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4">
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
        <div className="uppercase font-bold text-sm items-center gap-12 hidden lg:flex">
          <span className="relative group hover:text-primary cursor-pointer">
            Loại phim
            <ul className="dropdown-menu grid-cols-2">
              {movieTypes.slice(0, -3).map((t) => (
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
        <div className="flex items-center gap-5">
          <Icon
            icon="iconamoon:search-bold"
            className="text-primary cursor-pointer"
            height={24}
            onClick={() =>
              dispatch({
                type: 'SEARCH',
                payload: {
                  modalType: 'search',
                },
              })
            }
          />
          <Link href="/favourite">
            <Icon icon="mdi:heart-box" height={26} />
          </Link>
          {/* Mobile */}
          <MobileMenu />
        </div>
      </nav>
    </header>
  );
};
