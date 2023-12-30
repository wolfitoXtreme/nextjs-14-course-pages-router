import { SampleAT, SampleBT, TMealItem } from '@/types/types';

export interface SampleAI<P = SampleAT> {
  (args: P): string;
}

export interface SampleBI {
  (...args: SampleBT): string;
}

export interface SampleCI {
  (...args: [a: string, b: number]): string;
}

export interface IHeaderNavigationLink {
  href: string;
  children?: React.ReactNode;
}

export interface IMealsGrid {
  meals: TMealItem[];
}

export interface IImagePicker {
  label: string;
  name: string;
}

export interface IShareMealAction {
  (
    prevState: {
      message: string | null;
    },
    formData: FormData,
  ): Promise<{
    message: string | null;
  }>;
}
