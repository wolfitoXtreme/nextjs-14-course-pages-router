import type { NextApiRequest, NextApiResponse } from 'next';

import { FeedbackT, MethodE } from '@/types';

import { getPath, extractData } from './feedback';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    query: { feedbackId },
  } = req;

  if (method === MethodE.POST) {
    // logic here if that is the case
  }

  // no requests are sent because the api is running in the same env.
  const filePath = getPath();
  const data = extractData(filePath) as FeedbackT[];
  const feedbackItemData = data.find(({ id }) => id === feedbackId);
  res.status(200).json({ message: 'this works', feedbackItemData });
};

export default handler;
