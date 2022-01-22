import { CreateToolService } from '@/app/services/tools/CreateTool';
import { MongoToolssRepository } from '@/infra/db/mongodb/repositories/MongoToolsRepository';

export const makeCreateTool = () => {
  const toolsRepository = new MongoToolssRepository();
  return new CreateToolService(toolsRepository);
};
