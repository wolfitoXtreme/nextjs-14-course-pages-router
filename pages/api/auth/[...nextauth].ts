import NextAuth, { Awaitable, User } from 'next-auth';

import CredentialProvider from 'next-auth/providers/credentials';

import { EnumAuthProvider, TUser } from '@/types';
import { verifyPassword } from '@/utils/auth';
import { connectDataBase, findDocument } from '@/utils/db';

export default NextAuth({
  session: { strategy: 'jwt' },
  providers: [
    CredentialProvider({
      name: EnumAuthProvider.CREDENTIALS,
      credentials: {
        sentEmail: {},
        sentPassword: {},
      },
      authorize: async credentials => {
        const { sentEmail = '', sentPassword = '' } = credentials || {};
        // eslint-disable-next-line no-console
        console.log('received credentials from FE... ', { credentials });

        let client;

        try {
          client = await connectDataBase();
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log({ error });
          // by default next-auth will redirect to the error page
          throw new Error('Connection failed.');
        }

        // check for existing user
        const user = (await findDocument({
          client,
          table: 'users',
          document: { email: sentEmail },
        })) as TUser;

        // eslint-disable-next-line no-console
        console.log({ user });

        if (!user) {
          client.close(); // close connection
          // by default next-auth will redirect to the error page
          throw new Error('No user found!');
        }

        const { email, password } = user;

        // eslint-disable-next-line no-console
        console.log({ email }, { password });

        const isValidPassword = await verifyPassword(sentPassword, password);

        if (!isValidPassword) {
          client.close(); // close connection
          throw new Error(`Password is not valid for ${email}!`);
        }

        client.close(); // close connection

        return { email } as Awaitable<User>;
      },
    }),
  ],
}); // contains the handler function
