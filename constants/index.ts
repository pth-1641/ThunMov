import { Category, MovieType } from "@/types";

export const domain = process.env.NEXT_PUBLIC_DOMAIN as string;
export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const imageCdnUrl = process.env.NEXT_PUBLIC_CDN_IMAGE_URL as string;

export const movieTypes: MovieType[] = [
  { title: "Phim mới", path: "phim-moi" },
  { title: "Phim bộ", path: "phim-bo" },
  { title: "Phim lẻ", path: "phim-le" },
  { title: "Phim Vietsub", path: "phim-vietsub" },
  { title: "Phim thuyết minh", path: "phim-thuyet-minh" },
  { title: "Phim lồng tiếng", path: "phim-long-tieng" },
  { title: "Phim hoàn thành", path: "phim-bo-hoan-thanh" },
  { title: "Phim đang chiếu", path: "phim-bo-dang-chieu" },
  { title: "Phim độc quyền", path: "subteam" },
  { title: "Phim hoạt hình", path: "hoat-hinh" },
  { title: "Tìm kiếm", path: "tim-kiem" },
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
