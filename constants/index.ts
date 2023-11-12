import { Category, MovieType } from '@/types';

export const domain = process.env.NEXT_PUBLIC_DOMAIN as string;
export const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const imageCdnUrl = process.env.NEXT_PUBLIC_CDN_IMAGE_URL as string;

export const movieTypes: MovieType[] = [
  { title: 'Phim mới', path: 'new' },
  { title: 'Phim bộ', path: 'series' },
  { title: 'Phim lẻ', path: 'feature' },
  { title: 'Phim Vietsub', path: 'vietsub' },
  { title: 'Phim thuyết minh', path: 'voice-over' },
  { title: 'Phim lồng tiếng', path: 'dubbing' },
  { title: 'Phim hoàn thành', path: 'full' },
  { title: 'Phim đang chiếu', path: 'now-showing' },
  { title: 'Phim độc quyền', path: 'exclusive' },
  { title: 'Phim hoạt hình', path: 'anime' },
  { title: 'TV Shows', path: 'tv-shows' },
  { title: 'Phim sắp chiếu', path: 'upcoming' },
  { title: 'Tìm kiếm', path: 'search' },
];

export const countries: Category[] = [
  {
    name: 'Trung Quốc',
    slug: 'trung-quoc',
  },
  {
    name: 'Hàn Quốc',
    slug: 'han-quoc',
  },
  {
    name: 'Nhật Bản',
    slug: 'nhat-ban',
  },
  {
    name: 'Thái Lan',
    slug: 'thai-lan',
  },
  {
    name: 'Âu Mỹ',
    slug: 'au-my',
  },
  {
    name: 'Đài Loan',
    slug: 'dai-loan',
  },
  {
    name: 'Hồng Kông',
    slug: 'hong-kong',
  },
  {
    name: 'Việt Nam',
    slug: 'viet-nam',
  },
  {
    name: 'Ấn Độ',
    slug: 'an-do',
  },
  {
    name: 'Anh',
    slug: 'anh',
  },
  {
    name: 'Pháp',
    slug: 'phap',
  },
  {
    name: 'Canada',
    slug: 'canada',
  },
  {
    name: 'Quốc Gia Khác',
    slug: 'quoc-gia-khac',
  },
  {
    name: 'Đức',
    slug: 'duc',
  },
  {
    name: 'Tây Ban Nha',
    slug: 'tay-ban-nha',
  },
  {
    name: 'Thổ Nhĩ Kỳ',
    slug: 'tho-nhi-ky',
  },
  {
    name: 'Hà Lan',
    slug: 'ha-lan',
  },
  {
    name: 'Indonesia',
    slug: 'indonesia',
  },
  {
    name: 'Nga',
    slug: 'nga',
  },
  {
    name: 'Mexico',
    slug: 'mexico',
  },
  {
    name: 'Ba lan',
    slug: 'ba-lan',
  },
  {
    name: 'Úc',
    slug: 'uc',
  },
  {
    name: 'Thụy Điển',
    slug: 'thuy-dien',
  },
  {
    name: 'Malaysia',
    slug: 'malaysia',
  },
  {
    name: 'Brazil',
    slug: 'brazil',
  },
  {
    name: 'Philippines',
    slug: 'philippines',
  },
  {
    name: 'Bồ Đào Nha',
    slug: 'bo-dao-nha',
  },
  {
    name: 'Ý',
    slug: 'y',
  },
  {
    name: 'Đan Mạch',
    slug: 'dan-mach',
  },
  {
    name: 'UAE',
    slug: 'uae',
  },
  {
    name: 'Na Uy',
    slug: 'na-uy',
  },
  {
    name: 'Thụy Sĩ',
    slug: 'thuy-si',
  },
  {
    name: 'Châu Phi',
    slug: 'chau-phi',
  },
  {
    name: 'Nam Phi',
    slug: 'nam-phi',
  },
  {
    name: 'Ukraina',
    slug: 'ukraina',
  },
  {
    name: 'Ả Rập Xê Út',
    slug: 'a-rap-xe-ut',
  },
];

export const genres: Category[] = [
  {
    name: 'Hành Động',
    slug: 'hanh-dong',
  },
  {
    name: 'Tình Cảm',
    slug: 'tinh-cam',
  },
  {
    name: 'Hài Hước',
    slug: 'hai-huoc',
  },
  {
    name: 'Cổ Trang',
    slug: 'co-trang',
  },
  {
    name: 'Tâm Lý',
    slug: 'tam-ly',
  },
  {
    name: 'Hình Sự',
    slug: 'hinh-su',
  },
  {
    name: 'Chiến Tranh',
    slug: 'chien-tranh',
  },
  {
    name: 'Thể Thao',
    slug: 'the-thao',
  },

  {
    name: 'Võ Thuật',
    slug: 'vo-thuat',
  },
  {
    name: 'Viễn Tưởng',
    slug: 'vien-tuong',
  },
  {
    name: 'Phiêu Lưu',
    slug: 'phieu-luu',
  },
  {
    name: 'Khoa Học',
    slug: 'khoa-hoc',
  },
  {
    name: 'Kinh Dị',
    slug: 'kinh-di',
  },
  {
    name: 'Âm Nhạc',
    slug: 'am-nhac',
  },
  {
    name: 'Thần Thoại',
    slug: 'than-thoai',
  },
  {
    name: 'Tài Liệu',
    slug: 'tai-lieu',
  },
  {
    name: 'Gia Đình',
    slug: 'gia-dinh',
  },
  {
    name: 'Chính kịch',
    slug: 'chinh-kich',
  },
  {
    name: 'Bí ẩn',
    slug: 'bi-an',
  },
  {
    name: 'Học Đường',
    slug: 'hoc-duong',
  },
  {
    name: 'Kinh Điển',
    slug: 'kinh-dien',
  },
  {
    name: '18+',
    slug: 'phim-18',
  },
];

export const pathKeys: Record<string, string> = {
  new: 'phim-moi',
  series: 'phim-bo',
  'tv-shows': 'tv-shows',
  feature: 'phim-le',
  anime: 'hoat-hinh',
  vietsub: 'phim-vietsub',
  'voice-over': 'phim-thuyet-minh',
  dubbing: 'phim-long-tieng',
  'now-showing': 'phim-bo-dang-chieu',
  full: 'phim-bo-hoan-thanh',
  upcoming: 'phim-sap-chieu',
  exclusive: 'subteam',
  search: 'tim-kiem',
};

export const socialsShare = [
  {
    platform: 'KakaoTalk',
    icon: 'ri:kakao-talk-fill',
    color: '#ffe812',
    baseHref: 'https://story.kakao.com/share?url=',
  },
  {
    platform: 'Reddit',
    icon: 'ic:baseline-reddit',
    color: '#ff4500',
    baseHref: 'https://www.reddit.com/submit?url=',
  },
  {
    platform: 'WhatsApp',
    icon: 'ic:baseline-whatsapp',
    color: '#25d366',
    baseHref: 'https://api.whatsapp.com/send/?text=',
  },
  {
    platform: 'Facebook',
    icon: 'ri:facebook-fill',
    color: '#1877f2',
    baseHref: 'https://www.facebook.com/dialog/share?app_id=87741124305&href=',
  },
  {
    platform: 'X',
    icon: 'simple-icons:x',
    color: '#000',
    baseHref: 'https://twitter.com/intent/tweet?url=',
  },
  {
    platform: 'Tumblr',
    icon: 'ri:tumblr-fill',
    color: '#35465c',
    baseHref: 'https://www.tumblr.com/widgets/share/tool/preview?url=',
  },
  {
    platform: 'LinkedIn',
    icon: 'mdi:linkedin',
    color: '#0077b5',
    baseHref: 'https://www.linkedin.com/sharing/share-offsite/?url=',
  },
];
