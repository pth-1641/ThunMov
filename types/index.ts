export type Item = {
  id: string;
  name: string;
  slug: string;
};

export type Movie = {
  category: Item[];
  chieurap: boolean;
  country: Item[];
  episode_current: string;
  lang: string;
  modified: {
    time: Date;
  };
  name: string;
  origin_name: string;
  poster_url: string;
  quality: string;
  slug: string;
  sub_docquyen: boolean;
  thumb_url: string;
  time: string;
  type: string;
  year: number;
  _id: string;
};

export type Category = {
  name: string;
  slug: string;
};
