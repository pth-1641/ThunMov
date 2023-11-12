import { baseUrl, imageCdnUrl } from '@/constants';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    let { id } = await request.json();
    const response = await fetch(`https://ophim1.com/phim/${id}`);
    const data = await response.json();
    if (!id || !data.status) {
      throw new Error('Invalid movie id');
    }
    const { movie, episodes } = data;
    return NextResponse.json({
      ...movie,
      episodes,
    });
  } catch (err) {
    return NextResponse.json({
      status: 'Fail',
      statusCode: 500,
      message: err,
    });
  }
}
