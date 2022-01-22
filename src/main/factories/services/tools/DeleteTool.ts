import { DeleteToolService } from '@/app/services/tools/DeleteTool';
import { MongoToolssRepository } from '@/infra/db/mongodb/repositories/MongoToolsRepository';

export const makeDeleteTool = () => {
  const toolsRepository = new MongoToolssRepository();
  return new DeleteToolService(toolsRepository);
};
