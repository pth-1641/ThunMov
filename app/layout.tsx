import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { AppContextProvider } from '@/context/app.context';
import { ModalContextProvider } from '@/context/modal.context';
import { useMetadata } from '@/hooks/useMetadata';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import 'swiper/swiper-bundle.css';

const inter = Nunito({ subsets: ['latin'], preload: true });

export const metadata = useMetadata({
  title: 'ThunMov - Xem phim online miễn phí không quảng cáo',
  description:
    'Website cung cấp phim miễn phí nhanh chất lượng cao. Phim online VietSub, Thuyết minh, lồng tiếng chất lượng Full HD. Nguồn phim vietsub chất lượng cao cập nhật nhanh nhất.',
  urlPath: '/',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`bg-black/95 ${inter.className}`}>
        <AppContextProvider>
          <ModalContextProvider>
            <Navbar />
            {children}
            <Footer />
          </ModalContextProvider>
        </AppContextProvider>
      </body>
    </html>
  );
}
