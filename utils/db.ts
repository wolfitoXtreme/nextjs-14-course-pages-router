import { Document, MongoClient } from 'mongodb';

const DB_NAME = process.env.DB_B;

export const connectDataBase = async () => {
  const dbUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS_B}@${process.env.DB_CLUSTER_B}/?retryWrites=true&w=majority`;
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
