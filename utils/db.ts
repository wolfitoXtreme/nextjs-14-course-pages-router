import { MongoClient } from 'mongodb';

import {
  IChangeDocument,
  IFindDocument,
  IGetCollection,
  IInsertDocument,
} from '@/types';

const DB_NAME = 'users_auth';

export const connectDataBase = async () => {
  const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS_C}@${process.env.DB_CLUSTER_C}/?retryWrites=true&w=majority`;
  const client = await new MongoClient(dbUrl).connect();

  // eslint-disable-next-line no-console
  console.log('connected!!');

  return client;
};

export const insertDocument: IInsertDocument = async ({
  client,
  table,
  document,
}) => {
  // eslint-disable-next-line no-console
  console.log('insertDocument!!', { document });
  const db = client.db(DB_NAME);
  const result = await db.collection(table).insertOne(document);

  return { result };
};

export const findDocument: IFindDocument = async ({
  client,
  table,
  document,
}) => {
  const db = client.db(DB_NAME);

  // eslint-disable-next-line no-console
  console.log('Finding document...', { document });

  return await db.collection(table).findOne(document);
};

export const getCollection: IGetCollection = ({ client, table }) => {
  const db = client.db(DB_NAME);

  return db.collection(table);
};

export const changeDocument: IChangeDocument = async ({
  client,
  table,
  document,
  recordUpdate,
}) => {
  const db = client.db(DB_NAME);

  // eslint-disable-next-line no-console
  console.log('Changing document...', { document });

  return await db.collection(table).updateOne(document, {
    $set: recordUpdate,
  });
};
