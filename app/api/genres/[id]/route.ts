import { baseUrl, genres } from '@/constants';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url);
    let page = searchParams.get('page') || 1;
    page = Number.isNaN(+page) ? 1 : page;
    const { id } = params;
    if (!genres.some(({ slug }) => slug === id)) {
      return NextResponse.json({
        status: 'Fail',
        statusCode: 404,
        message: 'Id not found',
      });
    }
    const response = await fetch(`${baseUrl}/the-loai/${id}.json?page=${page}`);
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
