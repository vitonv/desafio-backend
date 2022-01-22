import { CreateToolRepository } from '@/app/protocols/db/tools';
import { Tool } from '@/domain/entities/Tool';
import { CreateTool } from '@/domain/useCases/tools';

export class CreateToolService implements CreateTool {
  constructor(private readonly createToolRepository: CreateToolRepository) {}
  async create(params: CreateTool.Params): Promise<Tool> {
    const { id } = await this.createToolRepository.create(params);
    return {
      id,
      ...params,
    };
  }
}
