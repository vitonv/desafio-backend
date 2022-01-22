// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import {
  CreateToolRepository,
  DeleteToolRepository,
  ListToolsRepository,
} from '@/app/protocols/db/tools';
import { CreateTool } from '@/domain/useCases/tools';
import { ListTools } from '@/domain/useCases/tools/ListTools';
import { mockListTools } from '@/tests/domain/mocks';

export class CreateToolRepositorySpy implements CreateToolRepository {
  params: CreateTool.Params;
  result = {
    id: faker.datatype.uuid(),
  };
  async create(
    params: CreateTool.Params,
  ): Promise<CreateToolRepository.Result> {
    this.params = params;
    return this.result;
  }
}

export class DeleteToolRepositorySpy implements DeleteToolRepository {
  params: string;
  result = true;
  async delete(id: string): Promise<boolean> {
    this.params = id;
    return true;
  }
}

export class ListToolsRepositorySpy implements ListToolsRepository {
  params: ListTools.Params;
  toolsList: ListTools.Result;
  async list(params: ListTools.Params): Promise<ListTools.Result> {
    this.params = params;
    this.toolsList = mockListTools(params.tag);
    return this.toolsList;
  }
}
