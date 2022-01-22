import { ListToolsService } from '@/app/services/tools';
import { MongoToolssRepository } from '@/infra/db/mongodb/repositories/MongoToolsRepository';

export const makeListTools = () => {
  const toolsRepository = new MongoToolssRepository();
  return new ListToolsService(toolsRepository);
};
