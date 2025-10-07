import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { AppContextProvider } from "@/context/app.context";
import { ModalContextProvider } from "@/context/modal.context";
import { useMetadata } from "@/hooks";
import "@/styles/globals.css";
import { Nunito } from "next/font/google";
import "swiper/swiper-bundle.css";

const inter = Nunito({ subsets: ["vietnamese", "latin"], preload: true });

export const metadata = useMetadata({
  title: "ThunMov - Xem phim online miễn phí không quảng cáo",
  description:
    "Website cung cấp phim miễn phí nhanh chất lượng cao. Phim online VietSub, Thuyết minh, lồng tiếng chất lượng Full HD. Nguồn phim vietsub chất lượng cao cập nhật nhanh nhất.",
  urlPath: "/",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`bg-secondary ${inter.className}`}>
        <AppContextProvider>
          <ModalContextProvider>
            <Navbar />
            {children}
            <Footer />
          </ModalContextProvider>
        </AppContextProvider>
        {/* Powered by pth-1641 ❤ - https://github.com/pth-1641 */}
      </body>
    </html>
  );
}
