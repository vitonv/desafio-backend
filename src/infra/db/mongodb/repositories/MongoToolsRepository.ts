import { Collection, ObjectId } from 'mongodb';

import {
  CreateToolRepository,
  DeleteToolRepository,
  ListToolsRepository,
} from '@/app/protocols/db/tools';
import { CreateTool } from '@/domain/useCases/tools';
import { ListTools } from '@/domain/useCases/tools/ListTools';

import { MongoHelper, QueryBuilder } from '../helpers';

export class MongoToolsRepository
  implements CreateToolRepository, DeleteToolRepository, ListToolsRepository
{
  private repository: Collection;
  constructor() {
    this.repository = MongoHelper.getCollection('tools');
  }
  async list(params?: ListTools.Params): Promise<ListTools.Result> {
    const query = new QueryBuilder();
    if (params) {
      if (params.tag) {
        query.match({
          tags: {
            $in: [params.tag],
          },
        });
      }
    }
    const tools = await this.repository.aggregate(query.build()).toArray();
    return MongoHelper.mapCollection(tools);
  }

  async create(
    params: CreateTool.Params,
  ): Promise<CreateToolRepository.Result> {
    const { insertedId } = await this.repository.insertOne(params);
    return {
      id: insertedId.toHexString(),
    };
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await this.repository.deleteOne({ _id: new ObjectId(id) });
    return !!deleted.deletedCount;
  }
}
