"use client";
import { movieTypes } from "@/constants";
import { ModalContext } from "@/context/modal.context";
import { useFetch } from "@/hooks";
import { Category, NavbarItem } from "@/types";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useContext, useEffect, useMemo, useState } from "react";

type MobileSubMenu = "movie" | "genre" | "country" | null;

const MobileMenu = ({
  genres,
  countries,
}: {
  genres: Category[];
  countries: Category[];
}) => {
  const [menuType, setMenuType] = useState<MobileSubMenu>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = openMenu ? "hidden" : "auto";
    if (!openMenu) setMenuType(null);
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
            ? "pointer-events-auto bg-black/90 overflow-y-auto overflow-x-hidden"
            : "pointer-events-none"
        }`}
        onClick={(e) => {
          if (e.target !== e.currentTarget) return;
          setOpenMenu(false);
        }}
      >
        <div
          className={`absolute min-h-screen right-0 w-full max-w-xs bg-zinc-950 font-bold text-lg duration-300 overflow-auto ${
            openMenu ? "translate-x-0" : "translate-x-full"
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
              menuType === "movie" ? "text-primary" : ""
            }`}
            onClick={() => handleOpenSubMenu("movie")}
          >
            <Icon icon="icon-park-outline:movie" height={18} className="mr-2" />
            Loại Phim
            <Icon
              icon="icon-park-outline:right"
              height={24}
              className={`duration-300 ${
                menuType === "movie" ? "rotate-90" : ""
              }`}
            />
          </button>
          <ul
            className={
              "grid grid-cols-2 gap-x-2.5 gap-y-1 font-normal text-base overflow-hidden px-2 duration-300"
            }
            style={{ maxHeight: menuType === "movie" ? "50rem" : 0 }}
          >
            {movieTypes.slice(0, -1).map((type) => (
              <Link
                href={`/${type.slug}`}
                key={type.slug}
                onClick={() => setOpenMenu(false)}
              >
                {type.name}
              </Link>
            ))}
            <span />
            <span className="pb-2.5" />
          </ul>
          <button
            className={`flex items-center border-t w-full border-white/10 gap-0.5 p-2.5 ${
              menuType === "genre" ? "text-primary" : ""
            }`}
            onClick={() => handleOpenSubMenu("genre")}
          >
            <Icon
              icon="ic:baseline-local-movies"
              height={18}
              className="mr-2"
            />
            Thể Loại
            <Icon
              icon="icon-park-outline:right"
              height={24}
              className={`duration-300 ${
                menuType === "genre" ? "rotate-90" : ""
              }`}
            />
          </button>
          <ul
            className={
              "grid grid-cols-2 gap-x-2.5 gap-y-1 font-normal text-base overflow-hidden px-2.5 duration-300"
            }
            style={{ maxHeight: menuType === "genre" ? "50rem" : 0 }}
          >
            {genres.map((genre) => (
              <Link
                href={`/the-loai/${genre.slug}`}
                key={genre.slug}
                onClick={() => setOpenMenu(false)}
              >
                {genre.name}
              </Link>
            ))}
            <span />
            <span className="pb-2.5" />
          </ul>
          <button
            className={`flex items-center border-t w-full border-white/10 gap-0.5 p-2.5 ${
              menuType === "country" ? "text-primary" : ""
            }`}
            onClick={() => handleOpenSubMenu("country")}
          >
            <Icon icon="jam:world" height={18} className="mr-2" />
            Quốc Gia
            <Icon
              icon="icon-park-outline:right"
              height={24}
              className={`duration-300 ${
                menuType === "country" ? "rotate-90" : ""
              }`}
            />
          </button>
          <ul
            className={
              "grid grid-cols-2 gap-x-2.5 gap-y-1 font-normal text-base overflow-hidden px-2.5 duration-300"
            }
            style={{ maxHeight: menuType === "country" ? "50rem" : 0 }}
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
            <span />
            <span className="mb-2.5" />
          </ul>
          <Link
            href="/tv-shows"
            className="flex items-center gap-2 p-2.5 border-t border-white/10"
            onClick={() => setOpenMenu(false)}
          >
            <Icon icon="eva:tv-fill" height={20} />
            TV Shows
          </Link>
          <Link
            href="/upcoming"
            className="flex items-center gap-2 p-2.5 border-t border-white/10"
            onClick={() => setOpenMenu(false)}
          >
            <Icon
              icon="material-symbols-light:event-upcoming-sharp"
              height={20}
            />
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
  const [genres, setGenres] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Category[]>([]);

  useEffect(() => {
    function checkPositionHandler() {
      if (window.scrollY == 0) setDisplayBgColor(false);
      else setDisplayBgColor(true);
    }
    checkPositionHandler();
    window.addEventListener("scroll", checkPositionHandler);
    return () => window.removeEventListener("scroll", checkPositionHandler);
  }, []);

  useEffect(() => {
    (async () => {
      const [{ data: genresData }, { data: countriesData }] = await Promise.all(
        [useFetch("/the-loai"), useFetch("/quoc-gia")]
      );
      setGenres(genresData.items);
      setCountries(countriesData.items);
    })();
  }, []);

  const navbarItems: NavbarItem[] = useMemo(() => {
    return [
      {
        label: "Loại phim",
        dropdown: { items: movieTypes.slice(0, -2), pathPrefix: "/" },
      },
      {
        label: "Thể loại",
        dropdown: { items: genres, pathPrefix: "/the-loai/" },
      },
      {
        label: "Quốc gia",
        dropdown: { items: countries, pathPrefix: "/quoc-gia/" },
      },
      {
        label: "Phim chiếu rạp",
        path: "/phim-chieu-rap",
        isNew: true,
      },
      {
        label: "TV Shows",
        path: "/tv-shows",
      },
      {
        label: "Sắp chiếu",
        path: "/sap-chieu",
      },
    ];
  }, [genres, countries]);

  return (
    <header
      className={`${
        displayBgColor ? "bg-black" : "bg-transparent"
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
        <div className="uppercase font-bold text-sm items-center gap-8 xl:gap-12 hidden lg:flex">
          {navbarItems.map((item) => {
            if (item.dropdown) {
              return (
                <div
                  key={item.label}
                  className="relative group hover:text-primary cursor-pointer flex items-center gap-1"
                >
                  {item.label}{" "}
                  <Icon icon="mynaui:chevron-down-solid" height={18} />
                  <ul
                    className={`dropdown-menu ${
                      item.dropdown.pathPrefix === "/"
                        ? "grid-cols-2"
                        : "grid-cols-4"
                    }`}
                  >
                    {item.dropdown.items.map((i) => (
                      <Link
                        key={i.slug}
                        href={item.dropdown?.pathPrefix + i.slug}
                        className="hover:text-primary duration-100"
                      >
                        {i.name}
                      </Link>
                    ))}
                  </ul>
                </div>
              );
            }
            return (
              <Link
                key={item.label}
                href={item.path || "#"}
                className="relative group"
              >
                <span className="group-hover:text-primary">{item.label}</span>
                {item.isNew ? (
                  <span className="text-[10px] bg-gradient-to-l from-[#ff416c] to-[#ff4b2b] px-1 py-0.5 absolute -top-3 -right-6 leading-none rounded">
                    New
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-5">
          <abbr title="Tìm kiếm">
            <Icon
              icon="iconamoon:search-bold"
              className="text-primary cursor-pointer"
              height={24}
              onClick={() =>
                dispatch({
                  type: "SEARCH",
                  payload: {
                    modalType: "search",
                  },
                })
              }
            />
          </abbr>
          <Link href="/favourite">
            <abbr title="Yêu thích">
              <Icon icon="mdi:heart-box" height={26} />
            </abbr>
          </Link>
          {/* Mobile */}
          <MobileMenu {...{ countries, genres }} />
        </div>
      </nav>
    </header>
  );
};
