import { Tool } from '@/domain/entities/Tool';

export interface CreateTool {
  create(params: CreateTool.Params): Promise<CreateTool.Result>;
}

export namespace CreateTool {
  export type Params = Omit<Tool, 'id'>;
  export type Result = Tool;
}
