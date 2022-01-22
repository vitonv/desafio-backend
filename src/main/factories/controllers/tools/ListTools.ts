import { ListToolsController } from '@/presentation/controllers/tools';

import { makeListTools } from '../../services/tools';

export const makeListToolsController = () => {
  return new ListToolsController(makeListTools());
};
