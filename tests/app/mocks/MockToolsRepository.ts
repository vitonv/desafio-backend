// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import { CreateToolRepository } from '@/app/protocols/db/tools';
import { CreateTool } from '@/domain/useCases/tools';

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
