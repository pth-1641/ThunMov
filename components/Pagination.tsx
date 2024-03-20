"use client";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { notFound, usePathname, useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  totalItemsPerPage: number;
};

export const Pagination: FC<PaginationProps> = (props) => {
  const { currentPage = 1, totalItems, totalItemsPerPage } = props;
  const totalPages = Math.ceil(totalItems / totalItemsPerPage);
  const [currentRoute, setCurrentRoute] = useState<string>("");
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const q = searchParams.get("q");
    const url = q ? `${pathname}?q=${q}&` : `${pathname}?`;
    setCurrentRoute(url);
  }, [pathname]);

  if (currentPage > totalPages) notFound();

  return (
    <ul className="flex mt-20 font-medium justify-center">
      {currentPage > 1 && (
        <Link
          href={`${currentRoute}page=${currentPage - 1}`}
          className="px-2 py-1.5 flex items-center justify-center text-white border border-collapse duration-300 border-r-0 hover:bg-primary hover:text-black hover:border-primary"
        >
          <Icon icon="icon-park-outline:left" height={24} />
        </Link>
      )}
      {new Array(5).fill("").map((_, idx) => {
        const page = currentPage + idx - 2;
        return (
          <div className="flex" key={idx}>
            {page > 0 && page <= totalPages && (
              <Link
                href={`${currentRoute}page=${page}`}
                className={`px-4 py-1.5 border border-r-0 border-collapse duration-300 hover:bg-primary hover:text-black hover:border-primary ${
                  currentPage === page
                    ? "bg-primary text-black border-primary"
                    : ""
                }`}
              >
                {page}
              </Link>
            )}
          </div>
        );
      })}
      {currentPage < totalPages && (
        <Link
          href={`${currentRoute}page=${currentPage + 1}`}
          className="px-2 py-1.5 items-center justify-center text-white border border-collapse duration-300 hover:bg-primary hover:text-black hover:border-primary"
        >
          <Icon icon="icon-park-outline:right" height={24} />
        </Link>
      )}
    </ul>
  );
};
