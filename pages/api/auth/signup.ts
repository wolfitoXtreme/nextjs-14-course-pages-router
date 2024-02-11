import { NextApiRequest, NextApiResponse } from 'next/types';

import { EnumRequestMethod } from '@/types';
import { hashPassword } from '@/utils/auth';
import { connectDataBase, findDocument, insertDocument } from '@/utils/db';

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

    // check for existing user
    const existingUser = await findDocument({
      client,
      table: 'users',
      document: { email },
    });

    if (existingUser) {
      res.status(422).json({ message: 'User already exist!' });
      // eslint-disable-next-line no-console
      console.log('closing connection...');
      client.close();

      return;
    }

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
      const { result } = await insertDocument({
        client,
        table: 'users',
        document: newUser,
      });

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
