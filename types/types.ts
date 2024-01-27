import { EnumNotificationStatus } from './enums';

export type TSampleA = {
  a: string;
  b: number;
};

export type TSampleB = [a: string, b: number];

export type TTrimWordsParams = [text: string, length?: number, flat?: boolean];

export type TDateParams = [year?: string, month?: string];

export type TDateFilter = { month: number; year: number };

export type TEvent = {
  id: string;
  date: Date | string;
  description: string;
  image: string;
  isFeatured: boolean;
  location: string;
  title: string;
};

export type TFeaturedEvents = {
  featuredEvents: TEvent[];
};

export type TEventLogistics = Partial<
  Omit<TEvent, 'description' | 'id' | 'isFeatured' | 'title'>
> & {
  imageAlt?: string;
};

export type TButton = {
  children?: React.ReactNode;
  link?: string;
  onClick?: () => void;
};

export type TOnSearch = {
  onSearch: (...params: TDateParams) => void;
};

export type TComment = {
  _id: string;
  email: string;
  name: string;
  text: string;
};

export type TNotification = {
  message: string;
  status: EnumNotificationStatus;
  title: string;
};
