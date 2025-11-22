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

export const Pagination: FC<PaginationProps> = ({
  currentPage = 1,
  totalItems,
  totalItemsPerPage,
}) => {
  const [jumpPage, setJumpPage] = useState<number>(1);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const totalPages = useMemo(() => {
    if (!totalItems || !totalItemsPerPage) return 0;
    return Math.ceil(totalItems / totalItemsPerPage);
  }, [totalItems, totalItemsPerPage]);

  const currentRoute = useMemo(() => {
    const q = searchParams.get("q");
    return q ? `${pathname}?q=${q}&` : `${pathname}?`;
  }, [pathname, searchParams]);

  useEffect(() => {
    setJumpPage(currentPage);
  }, [currentPage]);

  if (currentPage > totalPages) notFound();
  return (
    <ul className="flex mt-20 font-medium justify-center space-x-2">
      <Link
        href={`${currentRoute}page=${currentPage - 1}`}
        className={`size-11 flex items-center justify-center rounded-full bg-white/10 text-white duration-300 hover:text-black hover:bg-primary ${
          currentPage > 1 ? "" : "opacity-50 pointer-events-none"
        }`}
      >
        <Icon icon="icon-park-outline:left" height={24} />
      </Link>

      <form
        className="flex items-center gap-2 rounded-full bg-white/15 h-11 px-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (jumpPage >= 1 && jumpPage <= totalPages) {
            push(`${currentRoute}page=${jumpPage}`);
          }
        }}
      >
        <input
          className="w-full max-w-12 text-center outline-none bg-transparent border border-primary/50 py-0.5 rounded px-1"
          value={jumpPage}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (!isNaN(value)) setJumpPage(value);
          }}
        />
        <p> / {totalPages}</p>
      </form>

      <Link
        href={`${currentRoute}page=${currentPage + 1}`}
        className={`size-11 flex items-center justify-center rounded-full bg-white/10 text-white duration-300 hover:text-black hover:bg-primary ${
          currentPage < totalPages ? "" : "opacity-50 pointer-events-none"
        }`}
      >
        <Icon icon="icon-park-outline:right" height={24} />
      </Link>
    </ul>
  );
};
