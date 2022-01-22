import { ListTools } from '@/domain/useCases/tools/ListTools';

export interface ListToolsRepository {
  list(params: ListToolsRepository.Params): Promise<ListToolsRepository.Result>;
}
export namespace ListToolsRepository {
  export type Params = ListTools.Params;
  export type Result = ListTools.Result;
}
