export const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;

export const movieTypes = [
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
];
