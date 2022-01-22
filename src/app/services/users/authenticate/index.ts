import { HashComparer } from '@/app/protocols/cryptography';
import { FindUserRepository } from '@/app/protocols/db/users/FindUsersRepository';
import { Authentication } from '@/domain/useCases/users/Authentication';
import { FindUserRepositorySpy } from '@/tests/app/mocks';

export class AuthenticateUserService implements Authentication {
  constructor(
    private readonly findUserRepository: FindUserRepository,
    private readonly hashComparer: HashComparer,
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    const user = await this.findUserRepository.findByEmail(params.email);
    const passwordMatch = await this.hashComparer.compare(
      params.password,
      user.password,
    );

    return null;
  }
}
