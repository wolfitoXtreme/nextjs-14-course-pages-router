import { SampleAT, SampleBT, TEvent } from '@/types/types';

export interface SampleAI<P = SampleAT> {
  (args: P): string;
}

export interface SampleBI {
  (...args: SampleBT): string;
}

export interface SampleCI {
  (...args: [a: string, b: number]): string;
}

export interface IEvents {
  events: TEvent[];
}
