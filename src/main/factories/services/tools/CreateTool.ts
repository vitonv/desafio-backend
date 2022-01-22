import { CreateToolService } from '@/app/services/tools/CreateTool';
import { MongoToolsRepository } from '@/infra/db/mongodb/repositories/MongoToolsRepository';

export const makeCreateTool = () => {
  const toolsRepository = new MongoToolsRepository();
  return new CreateToolService(toolsRepository);
};
