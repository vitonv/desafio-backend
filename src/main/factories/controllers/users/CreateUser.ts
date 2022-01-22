import { SignUpController } from '@/presentation/controllers/users/SignUpController';

import { makeCreateUser } from '../../services/users/CreateUser';

export const makeCreateUserController = () => {
  return new SignUpController(makeCreateUser());
};
