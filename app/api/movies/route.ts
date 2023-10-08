import { baseUrl, imageCdnUrl } from '@/constants';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    let { id } = await request.json();
    const response = await fetch(`${baseUrl}/phim/${id}.json`);
    const data = await response.json();
    if (!id || !Object.keys(data.pageProps).length) {
      throw new Error('Invalid movie id');
    }
    const { item } = data.pageProps.data;
    return NextResponse.json({
      ...item,
      thumb_url: imageCdnUrl + item.thumb_url,
      poster_url: imageCdnUrl + item.poster_url,
    });
  } catch (err) {
    return NextResponse.json({
      status: 'Fail',
      statusCode: 500,
      message: err,
    });
  }
}
