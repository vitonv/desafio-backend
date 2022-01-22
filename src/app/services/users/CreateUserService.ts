import { Hasher } from '@/app/protocols/cryptography/Hasher';
import { CreateUserRepository } from '@/app/protocols/db/users/CreateUserRepository';
import { FindUserRepository } from '@/app/protocols/db/users/FindUsersRepository';
import { CreateUser } from '@/domain/useCases/users/CreateUser';

export class CreateUserService implements CreateUser {
  constructor(
    private readonly findUserRepository: FindUserRepository,
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepository,
  ) {}
  async create(params: CreateUser.Params): Promise<boolean> {
    const user = await this.findUserRepository.findByEmail(params.email);
    if (!user) {
      const hashedPassword = await this.hasher.hash(params.password);
      const created = await this.createUserRepository.create({
        ...params,
        password: hashedPassword,
      });
      return created;
    }
    return false;
  }
}
