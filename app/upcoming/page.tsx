import { Image } from '@/components/Image';
import { imageCdnUrl } from '@/constants';
import { useFetch } from '@/hooks';
import { useMetadata } from '@/hooks/useMetadata';
import { Movie } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type UpcomingContext = {
  searchParams: {
    page: string;
  };
};

export default async function Upcoming(context: UpcomingContext) {
  let {
    searchParams: { page = 1 },
  } = context;

  page = Number.isNaN(page) ? 1 : +page;

  const { data } = await useFetch('/type', { movieType: 'upcoming', page });
  if (!data) return notFound();

  const getMovieType = (type: string) => {
    const list: Record<string, string> = {
      series: 'Phim Bộ',
      single: 'Phim Lẻ',
      tvshows: 'TV Shows',
      hoathinh: 'Hoạt Hình',
    };
    return list[type];
  };

  return (
    <main className="max-w-7xl mx-auto relative overflow-x-auto px-5">
      <h2 className="mt-24 text-center text-3xl font-bold mb-6 md:text-4xl">
        Phim Sắp Chiếu
      </h2>
      <div className="overflow-auto">
        <table className="w-max text-center lg:w-full">
          <thead className="text-xs uppercase bg-white/20">
            <tr>
              <th scope="col" className="px-6 py-3 text-left w-2/5">
                Tên phim
              </th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Thời lượng</th>
              <th scope="col">Năm SX</th>
              <th scope="col">Loại phim</th>
              <th scope="col">Thể loại</th>
              <th scope="col">Quốc gia</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody className="text-sm overflow-auto">
            {data.items.map((movie: Movie) => (
              <tr
                key={movie._id}
                className="border-b border-white/10 hover:bg-white/5 duration-100"
              >
                <th
                  scope="row"
                  className="p-4 flex items-center gap-2 text-left"
                >
                  <Image
                    src={imageCdnUrl + movie.thumb_url}
                    alt={movie.name}
                    width={80}
                    height={112}
                    className="w-full max-w-[80px] h-28 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold text-base text-primary">
                      {movie.name}
                    </h3>
                    <span>{movie.origin_name}</span>
                  </div>
                </th>
                <td>
                  <span className="text-blue-600 bg-blue-200 font-semibold text-sm rounded-full px-2 py-0.5">
                    {movie.episode_current}
                  </span>
                </td>
                <td>{movie.time}</td>
                <td>{movie.year}</td>
                <td>{getMovieType(movie.type)}</td>
                <td>
                  <div className="flex flex-col justify-center gap-0.5">
                    {movie.category.map((c) => (
                      <Link
                        key={c.id}
                        className="hover:text-primary"
                        href={`/genres/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="flex flex-col justify-center gap-0.5">
                    {movie.country.map((c) => (
                      <Link
                        key={c.id}
                        className="hover:text-primary"
                        href={`/countries/${c.slug}`}
                      >
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </td>
                <td>
                  <Link
                    href={`/movies/${movie.slug}`}
                    className="bg-primary rounded-full text-black px-4 font-semibold py-1.5"
                  >
                    Chi tiết
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between bg-white/5 text-sm py-2.5 px-4">
        <span>
          Trang {page} / {data.totalPages}
        </span>
        <div className="flex gap-5">
          {page > 1 && (
            <Link href={`/upcoming?page=${+page - 1}`}>Trang trước</Link>
          )}
          {page < data.totalPages && (
            <Link href={`/upcoming?page=${+page + 1}`}>Trang sau</Link>
          )}
        </div>
      </div>
    </main>
  );
}

export const metadata = useMetadata({
  title: 'Phim Sắp Chiếu',
  description:
    'Xem trailer và những bộ phim sắp được công chiếu hay nhất. Cùng hóng những bộ phim mới sắp được chiếu rạp.',
  urlPath: '/upcoming',
});
