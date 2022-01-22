import { Router } from 'express';

import { toolsRoutes } from './tools.routes';
import { usersRoutes } from './users.routes';

const routes = Router();
routes.use('/users', usersRoutes);
routes.use('/tools', toolsRoutes);
export { routes };
