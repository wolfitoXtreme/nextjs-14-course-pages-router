import { NextApiRequest, NextApiResponse } from 'next/types';

import { v4 as uuid } from 'uuid';

import { EnumRequestMethod, TComment } from '@/types';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body,
    method,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: { eventId },
  } = req;

  if (method === EnumRequestMethod.POST) {
    const { email, name, text } = body;
    // server side validation
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' });

      return;
    }

    const newComment = {
      id: uuid(),
      email,
      name,
      text,
    };

    res.status(201).json({ comment: newComment, message: 'Added comment' });
  }

  if (method === EnumRequestMethod.GET) {
    const dummyList: TComment[] = [
      {
        id: 'c1',
        email: 'John@doe.com',
        name: 'John Doe',
        text: 'first comment...',
      },
      {
        id: 'c2',
        email: 'Jane@doe.com',
        name: 'John Doe',
        text: 'second comment...',
      },
      {
        id: 'c3',
        email: 'Allison@doe.com',
        name: 'John Doe',
        text: 'third comment...',
      },
    ];

    res.status(200).json({ comments: dummyList });
  }
};

export default handler;
