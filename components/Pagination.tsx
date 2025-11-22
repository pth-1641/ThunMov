"use client";
import { Icon } from "@iconify/react";
import { useRouter } from "next-nprogress-bar";
import Link from "next/link";
import { notFound, usePathname, useSearchParams } from "next/navigation";
import { FC, useEffect, useMemo, useState } from "react";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  totalItemsPerPage: number;
};

export const Pagination: FC<PaginationProps> = (props) => {
  const { currentPage = 1, totalItems, totalItemsPerPage } = props;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const [currentRoute, setCurrentRoute] = useState<string>("");
  const [jumpPage, setJumpPage] = useState<number>(currentPage);

  const totalPages = useMemo(() => {
    if (!totalItems || !totalItemsPerPage) return 0;
    return Math.ceil(totalItems / totalItemsPerPage);
  }, [totalItems, totalItemsPerPage]);

  useEffect(() => {
    const q = searchParams.get("q");
    const url = q ? `${pathname}?q=${q}&` : `${pathname}?`;
    setCurrentRoute(url);
  }, [pathname]);

  if (currentPage > totalPages) notFound();
  return (
    <ul className="flex mt-20 font-medium justify-center space-x-2">
      <Link
        href={`${currentRoute}page=${currentPage - 1}`}
        className={`size-11 flex items-center rounded-full bg-white/10 justify-center text-white duration-300 hover:text-black hover:bg-primary${
          currentPage > 1 ? "opacity-100" : "opacity-75 pointer-events-none"
        }`}
      >
        <Icon icon="icon-park-outline:left" height={24} />
      </Link>

      <form
        className="flex items-center gap-2 rounded-full bg-white/15 h-11 px-5"
        onSubmit={(e) => {
          e.preventDefault();
          push(`${currentRoute}page=${jumpPage}`);
        }}
      >
        <input
          className="w-full max-w-12 text-center outline-none bg-transparent border border-primary/50 py-0.5 rounded px-1"
          value={jumpPage}
          type="text"
          onChange={(e) => {
            const value = +e.target.value;
            if (!isNaN(value) && value <= totalPages) setJumpPage(value);
          }}
        />
        <p> / {totalPages}</p>
      </form>

      <Link
        href={`${currentRoute}page=${currentPage + 1}`}
        className={`size-11 flex items-center rounded-full bg-white/10 justify-center text-white duration-300 hover:text-black hover:bg-primary ${
          currentPage < totalPages
            ? "opacity-100"
            : "opacity-75 pointer-events-none"
        }`}
      >
        <Icon icon="icon-park-outline:right" height={24} />
      </Link>
    </ul>
  );
};
