import { hash, compare } from 'bcryptjs';

export const hashPassword = async (password: string) => {
  return await hash(password, 12); // second param,  salt length, higher value stronger salt
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string,
) => {
  const isValid = await compare(password, hashedPassword);

  return isValid;
};
