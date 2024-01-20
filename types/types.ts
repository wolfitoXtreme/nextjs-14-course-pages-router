export type SampleAT = {
  a: string;
  b: number;
};

export type SampleBT = [a: string, b: number];

export type TTrimWordsParams = [text: string, length?: number, flat?: boolean];

export type TDateParams = [year?: string, month?: string];

export type TDateFilter = { year: number; month: number };

export type TEvent = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string | Date;
  image: string;
  isFeatured: boolean;
};

export type TFeaturedEvents = {
  featuredEvents: TEvent[];
};

export type TEventLogistics = Partial<
  Omit<TEvent, 'id' | 'title' | 'description' | 'isFeatured'>
> & {
  imageAlt?: string;
};

export type TButton = {
  link?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

export type TOnSearch = {
  onSearch: (...params: TDateParams) => void;
};

export type TComment = {
  email: string;
  name: string;
  text: string;
};
