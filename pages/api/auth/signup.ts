import { NextApiRequest, NextApiResponse } from 'next/types';

import { MongoClient } from 'mongodb';

import { EnumRequestMethod } from '@/types';
import { hashPassword } from '@/utils/auth';
import { connectDataBase, insertDocument } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;

  let client;

  try {
    client = await connectDataBase();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
    res.status(500).json({ message: 'Connection failed.' });

    return; // stops code execution
  }

  if (method === EnumRequestMethod.POST) {
    const { email, password } = body;

    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({ message: 'Invalid information.' });
      client.close(); // close connection if validation fails

      return; // stops code execution
    }

    const newUser = {
      email,
      password: await hashPassword(password),
    };

    // eslint-disable-next-line no-console
    console.log('inserting...', { newUser });

    try {
      // throw new Error('This is a deliberate error.');
      const { result } = await insertDocument(
        client as MongoClient,
        'users',
        newUser,
      );

      // eslint-disable-next-line no-console
      console.log({ result }, { newUser });
      res.status(201).json({
        message: 'Added new user',
        newUser: newUser.email,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log({ error });
      res.status(500).json({ message: 'Inserting data Failed!.' });
    }
  }

  // always close connection regardless of success
  // can also  use MongoDB's "connection pooling" to avoid closing.
  // eslint-disable-next-line no-console
  console.log('closing connection...');
  client.close();
};

export default handler;
