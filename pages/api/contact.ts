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
    const { email, message, name } = body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid information.' });
      client.close(); // close connection if validation fails

      return; // stops code execution
    }

    const newMessage = {
      email,
      message,
      name,
    };

    try {
      // throw new Error('This is a deliberate error.');
      const { result } = await insertDocument(
        client as MongoClient,
        'contact_messages',
        newMessage,
      );

      // eslint-disable-next-line no-console
      console.log({ result }, { newMessage });
      res.status(201).json({
        message: 'Added new message',
        newMessage,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log({ error });
      res.status(500).json({ message: 'Inserting data Failed.' });
    }
  }

  // always close connection regardless of success
  // can also  use MongoDB's "connection pooling" to avoid closing.
  // eslint-disable-next-line no-console
  console.log('closing connection...');
  client.close();
};

export default handler;
