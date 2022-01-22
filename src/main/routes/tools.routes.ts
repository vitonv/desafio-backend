import { Router } from 'express';

import { adaptRoute } from '../adapters';
import { adaptMiddleware } from '../adapters/express-middleware-adapter';
import { makeCreateToolController } from '../factories/controllers/tools';
import { makeDeleteToolController } from '../factories/controllers/tools/DeleteTool';
import { makeListToolsController } from '../factories/controllers/tools/ListTools';
import { makeAuthMiddleware } from '../factories/middlewares';

const toolsRoutes = Router();

toolsRoutes.use(adaptMiddleware(makeAuthMiddleware()));
toolsRoutes.get('/', adaptRoute(makeListToolsController()));
toolsRoutes.post('/', adaptRoute(makeCreateToolController()));
toolsRoutes.delete('/:id', adaptRoute(makeDeleteToolController()));

export { toolsRoutes };
