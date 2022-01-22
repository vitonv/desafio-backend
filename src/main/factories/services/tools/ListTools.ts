import { ListToolsService } from '@/app/services/tools';
import { MongoToolsRepository } from '@/infra/db/mongodb/repositories/MongoToolsRepository';

export const makeListTools = () => {
  const toolsRepository = new MongoToolsRepository();
  return new ListToolsService(toolsRepository);
};
