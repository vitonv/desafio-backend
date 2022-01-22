import { CreateToolController } from '@/presentation/controllers/tools/CreateToolController';

import { makeCreateTool } from '../../services/tools';

export const makeCreateToolController = () => {
  return new CreateToolController(makeCreateTool());
};
