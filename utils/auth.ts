import { hash } from 'bcryptjs';

export const hashPassword = async (password: string) => {
  return await hash(password, 12); // second param,  salt length, higher value stronger salt
};
