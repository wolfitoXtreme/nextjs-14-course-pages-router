export type SampleAT = {
  a: string;
  b: number;
};

export type SampleBT = [a: string, b: number];

export type TDateFilter = {
  year: number;
  month: number;
};

export type TEvent = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
};

export type TEventLogistics = Partial<
  Omit<TEvent, 'id' | 'title' | 'description' | 'isFeatured'>
> & {
  imageAlt?: string;
};
