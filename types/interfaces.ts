import {
  TComment,
  TEvent,
  TSampleA,
  TSampleB,
  TTrimWordsParams,
} from '@/types/types';

export interface ISampleA<P = TSampleA> {
  (args: P): string;
}

export interface ISampleB {
  (...args: TSampleB): string;
}

export interface ISampleC {
  (...args: [a: string, b: number]): string;
}

export interface IEvents {
  events: TEvent[];
}

export interface INewComment {
  onAddComment: (args: Omit<TComment, 'id'>) => void;
}

export interface ITrimWords {
  (...args: TTrimWordsParams): string;
}
