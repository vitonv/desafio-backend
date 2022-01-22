import { DeleteToolController } from '@/presentation/controllers/tools';

import { makeDeleteTool } from '../../services/tools';

export const makeDeleteToolController = () => {
  return new DeleteToolController(makeDeleteTool());
};
