import { ListToolsRepository } from '@/app/protocols/db/tools';
import { ListTools } from '@/domain/useCases/tools/ListTools';

export class ListToolsService implements ListTools {
  constructor(private readonly listToolsRepository: ListToolsRepository) {}
  async list(params: ListTools.Params): Promise<ListTools.Result> {
    const tools = await this.listToolsRepository.list(params);
    return tools;
  }
}
