import { DeleteToolService } from '@/app/services/tools/DeleteTool';
import { MongoToolsRepository } from '@/infra/db/mongodb/repositories/MongoToolsRepository';

export const makeDeleteTool = () => {
  const toolsRepository = new MongoToolsRepository();
  return new DeleteToolService(toolsRepository);
};
