import { DeleteToolRepository } from '@/app/protocols/db/tools/DeleteToolRepository';
import { DeleteTool } from '@/domain/useCases/tools';

export class DeleteToolService implements DeleteTool {
  constructor(private readonly deleteToolRepository: DeleteToolRepository) {}
  async delete(id: string): Promise<boolean> {
    const deleted = await this.deleteToolRepository.delete(id);
    return deleted;
  }
}
