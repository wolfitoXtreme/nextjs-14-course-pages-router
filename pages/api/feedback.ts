// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// type Data = {
//   name: string;
// };

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>,
// ) {
//   res.status(200).json({ name: 'John Doe' });
// }
import type { NextApiRequest, NextApiResponse } from 'next';

import fs from 'fs';
import path from 'path';

import { v4 as uuid } from 'uuid';

import { MethodE } from '@/types';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  if (method === MethodE.POST) {
    const { email, text } = body;

    const newFeedback = {
      id: uuid(),
      email,
      text,
    };

    const filepath = path.join(process.cwd(), 'data', 'feedback.json');

    const currentData = JSON.parse(fs.readFileSync(filepath).toString());
    // eslint-disable-next-line no-console
    console.log({ currentData });
    fs.writeFileSync(filepath, JSON.stringify([...currentData, newFeedback]));
    res.status(201).json({ message: 'Success!', feedback: newFeedback });
  } else {
    res.status(200).json({ message: 'this works' });
  }
};

export default handler;
