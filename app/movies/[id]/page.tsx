import { MovieDetails } from '@/components/movies/MovieDetail';
import { domain } from '@/constants';
import { useFetch } from '@/hooks';
import { useMetadata } from '@/hooks/useMetadata';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';

type MovieContext = {
  params: { id: string };
};

export default async function Movie(context: MovieContext) {
  const {
    params: { id },
  } = context;

  const { data } = await useFetch('/movies', { id });
  if (!data) return notFound();

  return (
    <>
      <MovieDetails movie={data} />
      <div id="disqus_thread" className="max-w-5xl mx-auto mt-16 px-5"></div>
      <Script>
        {`(function() {
          var d = document, s = d.createElement('script');
          s.src = 'https://thunmov-vercel-app.disqus.com/embed.js';
          s.setAttribute('data-timestamp', +new Date());
          (d.head || d.body).appendChild(s);
        })();`}
      </Script>
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

  const { name, origin_name, year, quality, lang, content } = data;

  return useMetadata({
    title: `${name} - ${origin_name} (${year}) [${quality} - ${lang}]`,
    description: content,
    urlPath: `/movies/${id}`,
  });
}
