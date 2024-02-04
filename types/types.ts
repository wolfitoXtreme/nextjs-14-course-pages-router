import { EnumNotificationStatus } from '.';

export type SampleAT = {
  a: string;
  b: number;
};

export type SampleBT = [a: string, b: number];

export type TPost = {
  date: Date | string;
  excerpt: string;
  image: string;
  isFeatured?: boolean;
  slug: string;
  text: string;
  title: string;
};

export type TPostHeader = Omit<TPost, 'date' | 'excerpt' | 'slug' | 'text'>;

export type TContactFormFields = {
  email: string;
  message: string;
  name: string;
};

export type TNotification = {
  message: string;
  status: EnumNotificationStatus;
  title: string;
};
