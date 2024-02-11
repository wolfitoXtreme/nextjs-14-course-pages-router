import { Collection, InsertOneResult, MongoClient } from 'mongodb';

import { SampleAT, SampleBT, TUser } from '@/types/types';

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

export interface ICreateUser {
  (params: Omit<TUser, '_id'>): Promise<unknown>;
}

export interface IInsertDocument {
  (params: {
    client: MongoClient;
    table: string;
    document: Record<string, unknown>;
  }): Promise<{
    result: InsertOneResult<Document>;
  }>;
}

export interface IFindDocument {
  (params: {
    client: MongoClient;
    table: string;
    document: Record<string, unknown>;
  }): Promise<unknown>;
}

export interface IGetCollection {
  (params: { client: MongoClient; table: string }): Collection<Document>;
}
