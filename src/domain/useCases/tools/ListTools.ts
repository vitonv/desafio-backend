import { Tool } from '@/domain/entities/Tool';

export interface ListTools {
  list(params: ListTools.Params): Promise<ListTools.Result>;
}

export namespace ListTools {
  export type Params = {
    tag?: string;
  };
  export type Result = Tool[];
}
