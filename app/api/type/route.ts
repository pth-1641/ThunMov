import { baseUrl, movieTypes, pathKeys } from '@/constants';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    let { movieType, page, q = '' } = await request.json();
    const type = movieTypes.find(({ path }) => movieType === path);
    if (!type) {
      return NextResponse.json({
        status: 'Fail',
        statusCode: 404,
        message: 'Route not found',
      });
    }
    const params: Record<string, any> = {
      sort_field: 'modified.time',
      page: 1,
    };
    if (page && !Number.isNaN(+page)) {
      params['page'] = page;
    }
    if (movieType === 'search') {
      params['keyword'] = q || '';
    }
    const urlParams = new URLSearchParams(params);
    const response = await fetch(
      `${baseUrl}/${
        movieType === 'search'
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
