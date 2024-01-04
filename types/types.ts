export type SampleAT = {
  a: string;
  b: number;
};

export type SampleBT = [a: string, b: number];

export type TDummyProduct = {
  id: string;
  title: string;
  description: string;
  priority: boolean;
};

export type TDummyProducts = {
  products: TDummyProduct[];
};
