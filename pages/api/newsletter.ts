import { NextApiRequest, NextApiResponse } from 'next/types';

import { EnumRequestMethod } from '@/types';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { body, method } = req;
  if (method === EnumRequestMethod.POST) {
    const { email } = body;

    // server side validation
    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });

      return;
    }

    // eslint-disable-next-line no-console
    console.log({ email });
    res.status(201).json({ message: 'Signed up!s' });
  }
};

export default handler;
