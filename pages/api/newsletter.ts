import { NextApiRequest, NextApiResponse } from 'next/types';

import { MongoClient } from 'mongodb';

import { EnumRequestMethod } from '@/types';
import { connectDataBase, insertDocument } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  let client;

  try {
    client = await connectDataBase();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
    res.status(500).json({ message: 'Connection Failed.' });

    return; // stops code execution
  }

  if (method === EnumRequestMethod.POST) {
    const { email } = body;

    // server side validation
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });

      return; // stops code execution
    }

    try {
      const { result } = await insertDocument(
        client as MongoClient,
        'newsletter',
        { email },
      );
      // eslint-disable-next-line no-console
      console.log({ result }, { email });
      res.status(201).json({ email, message: 'Signed up!s' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log({ error });
      res.status(500).json({ message: 'Inserting data Failed.' });
    }

    // always close connection regardless of success
    // can also  use MongoDB's "connection pooling" to avoid closing.
    // eslint-disable-next-line no-console
    console.log('closing connection...');
    client.close();
  }
};

export default handler;
