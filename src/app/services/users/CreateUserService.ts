import { CreateUserRepository } from '@/app/protocols/db/users/CreateUserRepository';
import { FindUsersRepository } from '@/app/protocols/db/users/FindUsersRepository';
import { CreateUser } from '@/domain/useCases/users/CreateUser';

export class CreateUserService implements CreateUser {
  constructor(
    private readonly findUserRepository: FindUsersRepository,
    private readonly createUserRepository: CreateUserRepository,
  ) {}
  async create(params: CreateUser.Params): Promise<boolean> {
    const user = await this.findUserRepository.findByEmail(params.email);
    const created = await this.createUserRepository.create(params);
    return false;
  }
}
