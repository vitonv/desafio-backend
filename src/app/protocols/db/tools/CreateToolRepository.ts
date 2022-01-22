import { CreateTool } from '@/domain/useCases/tools/CreateTools';

export interface CreateToolRepository {
  create(
    params: CreateToolRepository.Params,
  ): Promise<CreateToolRepository.Result>;
}

export namespace CreateToolRepository {
  export type Params = CreateTool.Params;
  export type Result = {
    id: string;
  };
}
