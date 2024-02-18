import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import { EnumRequestMethod, TUser } from '@/types';
import { hashPassword, verifyPassword } from '@/utils/auth';
import { changeDocument, connectDataBase, findDocument } from '@/utils/db';

import { authOptions } from './[...nextauth]';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  if (method !== EnumRequestMethod.PATCH) {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });

    return;
  }

  const sentEmail = session.user?.email;
  const sentOldPassword = req.body.sentOldPassword;
  const sentNewPassword = req.body.sentNewPassword;

  let client;

  try {
    client = await connectDataBase();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
    res.status(500).json({ message: 'Connection failed.' });

    return; // stops code execution
  }

  // check for existing user
  const existingUser = await findDocument({
    client,
    table: 'users',
    document: { email: sentEmail },
  });

  if (!existingUser) {
    res.status(404).json({ message: 'User does not exist!' });
    // eslint-disable-next-line no-console
    console.log('closing connection...');
    client.close();

    return;
  }

  const { password: currentPassword } = existingUser as TUser;

  const isValidPassword = await verifyPassword(
    sentOldPassword,
    currentPassword,
  );

  if (!isValidPassword) {
    res.status(403).json({ message: 'Password does not match with that user' });
    client.close(); // close connection
  }

  const hashedPassword = await hashPassword(sentNewPassword);

  const updatedResult = await changeDocument({
    client,
    table: 'users',
    document: { email: sentEmail },
    recordUpdate: { password: hashedPassword },
  });

  // eslint-disable-next-line no-console
  console.log({ updatedResult });

  // always close connection regardless of success
  // can also  use MongoDB's "connection pooling" to avoid closing.
  // eslint-disable-next-line no-console
  console.log('closing connection...');
  res.status(200).json({ message: 'Password updated' });
  client.close();
};

export default handler;
