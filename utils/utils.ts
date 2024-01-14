import { ITrimWords } from '@/types';

export const humanReadableDate = (date: Date) =>
  new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const formatLineEndings = (text: string) => {
  if (typeof text !== 'string') {
    return '';
  }

  return text.replace(', ', '\n');
};

export const isEmpty = (obj: Record<string, unknown>) => {
  return !Object.keys(obj).length;
};

export const trimWords: ITrimWords = (text, length = 80, flat = false) => {
  const regex = new RegExp(`([\\s\\S]{${length}}[^\\s]*)[\\s\\S]*`, 'g');

  const trimmedString = flat
    ? text.replace(/\n/g, '').replace(regex, '$1')
    : text.replace(regex, '$1');

  // console.log({ trimmedString }, { length }, { flat });

  return trimmedString;
};
