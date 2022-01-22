import { AuthMiddleware } from '@/presentation/middlewares/AuthMiddleware';

import { makeFindByToken } from '../services/users/FindByToken';

export const makeAuthMiddleware = () => {
  return new AuthMiddleware(makeFindByToken());
};
