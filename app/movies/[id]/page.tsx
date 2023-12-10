import { MovieCategory } from '@/components/movies/MovieCategory';
import { MovieDetails } from '@/components/movies/MovieDetail';
import { useFetch, useMetadata } from '@/hooks';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';

export const revalidate = 3600;

type MovieContext = {
  params: { id: string };
};

export default async function Movie(context: MovieContext) {
  const {
    params: { id },
  } = context;

  const [movie, recentUpdateMovies] = await Promise.all([
    useFetch('/movies', { id }),
    fetch('https://ophim1.com/danh-sach/phim-moi-cap-nhat')
      .then((res) => res.json())
      .then((data) => data.items.filter((item: any) => item.slug !== id)),
  ]);
  if (!movie.data) return notFound();

  return (
    <>
      <MovieDetails movie={movie.data} />
      <div id="disqus_thread" className="max-w-5xl mx-auto my-16 px-5"></div>
      <Script>
        {`(function() {
          var d = document, s = d.createElement('script');
          s.src = 'https://thunmov-vercel-app.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
        })();`}
      </Script>
      <MovieCategory
        movies={recentUpdateMovies}
        title="Mới cập nhật"
        slidesPerView={5}
      />
    </>
  );
}

export async function generateMetadata({
  params,
}: MovieContext): Promise<Metadata> {
  const { id } = params;
  const { data } = await useFetch('/movies', { id });
  if (!data) {
    return useMetadata({
      title: 'Not Found',
      description: 'The page is not found.',
      urlPath: `/movies/${id}`,
    });
  }

  const { name, origin_name, year, quality, lang, content, thumb_url } = data;

  return useMetadata({
    title: `${name} - ${origin_name} (${year}) [${quality} - ${lang}]`,
    description: content,
    urlPath: `/movies/${id}`,
    image: thumb_url,
  });
}
