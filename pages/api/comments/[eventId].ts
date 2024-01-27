import { NextApiRequest, NextApiResponse } from 'next/types';

import { MongoClient } from 'mongodb';
// import { v4 as uuid } from 'uuid';

import { EnumRequestMethod, EnumSortResults } from '@/types';
import { connectDataBase, getAllDocuments, insertDocument } from '@/utils/db';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body,
    method,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    query: { eventId },
  } = req;

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
      client?.close(); // close connection if validation fails

      return; // stops code execution
    }

    const newComment = {
      // id: uuid(), // static id generation
      email,
      eventId,
      name,
      text,
    };

    try {
      const { result } = await insertDocument(
        client as MongoClient,
        'comments',
        newComment,
      );

      // eslint-disable-next-line no-console
      console.log({ result }, { newComment });
      res.status(201).json({
        comment: newComment,
        message: 'Added comment',
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log({ error });
      res.status(500).json({ message: 'Inserting data Failed.' });
    }
  }

  if (method === EnumRequestMethod.GET) {
    try {
      const { result } = await getAllDocuments(
        client as MongoClient,
        'comments',
        {
          _id: EnumSortResults.DESCENDANT,
        },
        { eventId },
      );
      // eslint-disable-next-line no-console
      console.log({ result });
      res.status(200).json({ comments: result, message: 'Received messages' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('events, getAllDocuments', { error });
      res.status(500).json({ message: 'Getting data Failed.' });
    }
  }

  // always close connection regardless of success
  // can also  use MongoDB's "connection pooling" to avoid closing.
  // eslint-disable-next-line no-console
  console.log('closing connection...');
  client.close();
};

export default handler;
