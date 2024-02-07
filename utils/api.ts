import { EnumRequestMethod, ICreateUser } from '@/types';

export const createUser: ICreateUser = async ({ email, password }) => {
  const response = await fetch('/api/auth/signup', {
    method: EnumRequestMethod.POST,
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (response.ok) {
    // eslint-disable-next-line no-console
    console.log('response OK', { response });

    return data;
  } else {
    throw new Error(data.message || 'Something went wrong!');
  }
};
