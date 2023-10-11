import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col px-4">
      <h2 className="text-5xl font-extrabold md:text-9xl">
        4<span className="text-primary">0</span>4
      </h2>
      <h3 className="text-3xl font-bold my-1 text-center">
        Oops! Trang không tồn tại
      </h3>
      <Link
        href="/"
        type="button"
        className="mt-4 rounded-full px-6 py-2.5 bg-primary text-black font-bold"
      >
        Trang chủ
      </Link>
    </div>
  );
}
