import { Category, MovieType } from "@/types";

export const domain = process.env.NEXT_PUBLIC_DOMAIN as string;
export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const imageCdnUrl = process.env.NEXT_PUBLIC_CDN_IMAGE_URL as string;

export const movieTypes: MovieType[] = [
  { name: "Phim mới", slug: "phim-moi" },
  { name: "Phim bộ", slug: "phim-bo" },
  { name: "Phim lẻ", slug: "phim-le" },
  { name: "Phim Vietsub", slug: "phim-vietsub" },
  { name: "Phim thuyết minh", slug: "phim-thuyet-minh" },
  { name: "Phim lồng tiếng", slug: "phim-long-tieng" },
  { name: "Phim hoàn thành", slug: "phim-bo-hoan-thanh" },
  { name: "Phim đang chiếu", slug: "phim-bo-dang-chieu" },
  { name: "Phim độc quyền", slug: "subteam" },
  { name: "Phim hoạt hình", slug: "hoat-hinh" },
  { name: "Phim chiếu rạp", slug: "phim-chieu-rap" },
  { name: "Tìm kiếm", slug: "tim-kiem" },
];

export const socialsShare = [
  {
    platform: "KakaoTalk",
    icon: "ri:kakao-talk-fill",
    color: "#ffe812",
    baseHref: "https://story.kakao.com/share?url=",
  },
  {
    platform: "Reddit",
    icon: "ic:baseline-reddit",
    color: "#ff4500",
    baseHref: "https://www.reddit.com/submit?url=",
  },
  {
    platform: "WhatsApp",
    icon: "ic:baseline-whatsapp",
    color: "#25d366",
    baseHref: "https://api.whatsapp.com/send/?text=",
  },
  {
    platform: "Facebook",
    icon: "ri:facebook-fill",
    color: "#1877f2",
    baseHref: "https://www.facebook.com/dialog/share?app_id=87741124305&href=",
  },
  {
    platform: "X",
    icon: "simple-icons:x",
    color: "#000",
    baseHref: "https://twitter.com/intent/tweet?url=",
  },
  {
    platform: "Tumblr",
    icon: "ri:tumblr-fill",
    color: "#35465c",
    baseHref: "https://www.tumblr.com/widgets/share/tool/preview?url=",
  },
  {
    platform: "LinkedIn",
    icon: "mdi:linkedin",
    color: "#0077b5",
    baseHref: "https://www.linkedin.com/sharing/share-offsite/?url=",
  },
];
