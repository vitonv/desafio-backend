// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import {
  FindUserRepository,
  CreateUserRepository,
} from '@/app/protocols/db/users';
import { User } from '@/domain/entities/User';
import { CreateUser } from '@/domain/useCases/users/CreateUser';
import { mockFindUser } from '@/tests/domain/mocks';

export class CreateUserRepositorySpy implements CreateUserRepository {
  params: CreateUser.Params;
  result = true;
  async create(params: CreateUser.Params): Promise<boolean> {
    this.params = params;
    return this.result;
  }
}

export class FindUserRepositorySpy implements FindUserRepository {
  result: User;
  async findByEmail(email: string): Promise<User> {
    this.result = mockFindUser(email);
    return this.result;
  }
}
