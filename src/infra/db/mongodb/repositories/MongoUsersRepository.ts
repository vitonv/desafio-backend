import { Collection } from 'mongodb';

import {
  CreateUserRepository,
  FindUserRepository,
  UpdateAccessTokenRepository,
} from '@/app/protocols/db/users';
import { User } from '@/domain/entities/User';
import { CreateUser } from '@/domain/useCases/users/CreateUser';

import { MongoHelper } from '../helpers';

export class MongoUsersRepository
  implements
    FindUserRepository,
    CreateUserRepository,
    UpdateAccessTokenRepository
{
  private repository: Collection;
  constructor() {
    this.repository = MongoHelper.getCollection('users');
  }
  async create(params: CreateUser.Params): Promise<boolean> {
    const created = await this.repository.insertOne(params);
    const insertedId = created;
    return !!insertedId;
  }
  async updateAccessToken(id: string, token: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}

// async create(user: CreateAccount.Params): Promise<boolean> {
//   const created = await this.repository.insertOne(user);
//   return !!created.insertedId;
// }
// async findByEmail(email: string): Promise<User> {
//   const findUser = await this.repository.findOne({ email });
//   if (findUser) {
//     return MongoHelper.map(findUser);
//   }
//   return null;
// }
// async updateToken(id: string, token: string): Promise<void> {
//   await this.repository.updateOne(
//     {
//       _id: id,
//     },
//     {
//       $set: {
//         accessToken: token,
//       },
//     },
//   );
// }
