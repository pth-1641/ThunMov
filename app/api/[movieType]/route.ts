import { baseUrl, countries, genres, movieTypes, pathKeys } from '@/constants';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { pathname, search, searchParams } = new URL(request.url);
    const type = movieTypes.find(({ path }) => pathname.includes(path));
    if (!type) {
      return NextResponse.json({
        status: 'Fail',
        statusCode: 404,
        message: 'Route not found',
      });
    }

    const {
      year = '',
      category = '',
      country = '',
      sortBy = 'update',
      page = 1,
    } = Object.fromEntries(new URLSearchParams(search));
    const params: Record<string, any> = {
      year: '',
      category: '',
      country: '',
      sort_field: 'modified.time',
      page: 1,
    };
    if (page && !Number.isNaN(+page)) {
      params['page'] = page;
    }
    if (year && !Number.isNaN(+year)) {
      params['year'] = +year > 2023 || +year < 2010 ? 2023 : year;
    }
    if (category) {
      if (genres.findIndex((g) => g.slug === category) === -1) {
        throw new Error('Invalid genre id');
      }
      params['category'] = category;
    }
    if (country) {
      if (countries.findIndex((c) => c.slug === country) === -1) {
        throw new Error('Invalid country id');
      }
      params['country'] = country;
    }
    if (sortBy) {
      const sortKey: Record<string, string> = {
        release: '_id',
        update: 'modified.time',
        year: 'year',
      };
      if (!sortKey[`${sortBy}`]) throw new Error('Invalid sort key');
      params['sort_field'] = sortKey[`${sortBy}`];
    }
    if (pathname.includes('search')) {
      params['keyword'] = searchParams.get('q') || '';
    }
    const urlParams = new URLSearchParams(params);
    const response = await fetch(
      `${baseUrl}/${
        pathname.includes('search')
          ? pathKeys[type.path]
          : `danh-sach/${pathKeys[type.path]}`
      }.json?${urlParams.toString()}`
    );
    const data = await response.json();
    const {
      items,
      params: {
        pagination: { totalItems, totalItemsPerPage, currentPage },
      },
    } = data.pageProps.data;
    return NextResponse.json({
      items,
      totalItems,
      totalItemsPerPage,
      currentPage,
      totalPages: Math.ceil(totalItems / totalItemsPerPage),
    });
  } catch (err) {
    return NextResponse.json({
      status: 'Fail',
      statusCode: 500,
      message: err,
    });
  }
}
