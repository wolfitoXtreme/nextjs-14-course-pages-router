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

const getPath = () => path.join(process.cwd(), 'data', 'feedback.json');

const extractData = (filePath: string) =>
  JSON.parse(fs.readFileSync(filePath).toString());

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body } = req;

  if (method === MethodE.POST) {
    const { email, text } = body;

    const newFeedback = {
      id: uuid(),
      email,
      text,
    };

    const filePath = getPath();
    const currentData = extractData(filePath);
    // eslint-disable-next-line no-console
    console.log({ currentData });
    fs.writeFileSync(filePath, JSON.stringify([...currentData, newFeedback]));
    res.status(201).json({ message: 'Success!', feedback: newFeedback });
  } else {
    const filePath = getPath();
    const currentData = extractData(filePath);

    res.status(200).json({ message: 'this works', feedback: currentData });
  }
};

export default handler;
