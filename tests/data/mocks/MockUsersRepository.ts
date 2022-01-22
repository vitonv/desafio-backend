// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

import { CreateUserRepository } from '@/app/protocols/db/users/CreateUserRepository';
import { FindUsersRepository } from '@/app/protocols/db/users/FindUsersRepository';
import { User } from '@/domain/entities/User';
import { CreateUser } from '@/domain/useCases/users/CreateUser';
import { mockFindUser } from '@/tests/domain/mocks';

// import { CreateUser } from '../../../src/domain/useCases/users/CreateUser';

export class CreateUserRepositorySpy implements CreateUserRepository {
  result = true;
  async create(params: CreateUser.Params): Promise<boolean> {
    return this.result;
  }
}

export class FindUserRepositorySpy implements FindUsersRepository {
  result: User;
  async findByEmail(email: string): Promise<User> {
    this.result = mockFindUser(email);
    return this.result;
  }
}
