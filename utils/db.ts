import { Document, MongoClient, SortDirection } from 'mongodb';

const DB_NAME = 'events';

export const connectDataBase = async () => {
  const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/?retryWrites=true&w=majority`;
  const client = await new MongoClient(dbUrl).connect();
  // eslint-disable-next-line no-console
  console.log('connected!!');

  return client;
};

export const insertDocument = async (
  client: MongoClient,
  table: string,
  document: Document,
) => {
  // eslint-disable-next-line no-console
  console.log('insertDocument!!');
  const db = client.db(DB_NAME);
  const result = await db.collection(table).insertOne(
    document, // {email: email}
  );

  return { result };
};

export const getAllDocuments = async (
  client: MongoClient,
  table: string,
  sortBy: Record<string, SortDirection>,
  filter?: Record<string, unknown>, // default empty, no filter
) => {
  // eslint-disable-next-line no-console
  console.log('getAllDocuments!!');
  const db = client.db(DB_NAME);

  const result = await db
    .collection(table)
    .find(filter || {}) // will return all comment without filtering
    .sort(sortBy) // wil sort by _id in descending order (-1)
    .toArray(); // converts to array

  return { result };
};
