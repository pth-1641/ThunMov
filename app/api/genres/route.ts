import { baseUrl, genres } from '@/constants';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    let { type, page } = await request.json();
    page = Number.isNaN(+page) ? 1 : page;
    if (!genres.some(({ slug }) => slug === type)) {
      return NextResponse.json({
        status: 'Fail',
        statusCode: 404,
        message: 'Id not found',
      });
    }
    const response = await fetch(
      `${baseUrl}/the-loai/${type}.json?page=${page}`
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
