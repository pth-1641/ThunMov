import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h2 className="text-9xl font-extrabold">404</h2>
      <h3 className="text-3xl font-bold my-1">Oops! Trang không tồn tại</h3>
      <Link
        href="/"
        type="button"
        className="mt-4 rounded-full px-6 py-2.5 bg-primary text-black font-medium"
      >
        Trang chủ
      </Link>
    </div>
  );
}
