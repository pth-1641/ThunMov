import { Pagination } from "@/components/Pagination";
import { TvShow } from "@/components/TvShow";
import { useFetch, useMetadata } from "@/hooks";
import { notFound } from "next/navigation";

type TvShowContext = {
  searchParams: {
    page: string;
  };
};

export default async function TvShows(context: TvShowContext) {
  const {
    searchParams: { page = 1 },
  } = context;

  const { data } = await useFetch("/danh-sach/tv-shows");
  if (!data) return notFound();

  return (
    <main className="mx-auto max-w-7xl px-5">
      <h2 className="mt-24 text-center text-3xl font-bold mb-6 lg:text-4xl">
        TV Shows
      </h2>
      <TvShow shows={data.items} />
      <Pagination {...data.params.pagination} />
    </main>
  );
}

export const metadata = useMetadata({
  title: "TV Shows",
  description: `Tv Shows mới nhất tuyển chọn chất lượng cao, Tv Shows mới nhất ${new Date().getFullYear()} vietsub cập nhật nhanh nhất. Tv Shows vietsub nhanh nhất.`,
  urlPath: "/tv-shows",
});
