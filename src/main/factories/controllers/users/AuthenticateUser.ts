import { LoginController } from '@/presentation/controllers/users/LoginController';

import { makeAuthenticate } from '../../services/users/AuthenticateUser';

export const makeAuthenticateUserController = () => {
  return new LoginController(makeAuthenticate());
};
