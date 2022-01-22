import { Router } from 'express';

import { adaptRoute } from '../adapters';
import { makeAuthenticateUserController } from '../factories/controllers/users/AuthenticateUser';
import { makeCreateUserController } from '../factories/controllers/users/CreateUser';

const usersRoutes = Router();

usersRoutes.post('/signup', adaptRoute(makeCreateUserController()));
usersRoutes.post('/login', adaptRoute(makeAuthenticateUserController()));

export { usersRoutes };
