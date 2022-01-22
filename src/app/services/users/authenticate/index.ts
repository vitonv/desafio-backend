import { HashComparer } from '@/app/protocols/cryptography';
import { Encrypter } from '@/app/protocols/cryptography/Encrypter';
import { FindUserRepository } from '@/app/protocols/db/users/FindUsersRepository';
import { Authentication } from '@/domain/useCases/users/Authentication';
import { FindUserRepositorySpy } from '@/tests/app/mocks';

export class AuthenticateUserService implements Authentication {
  constructor(
    private readonly findUserRepository: FindUserRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    const user = await this.findUserRepository.findByEmail(params.email);
    if (user) {
      const passwordMatch = await this.hashComparer.compare(
        params.password,
        user.password,
      );
      const token = await this.encrypter.encrypt(user.id);
    }

    return null;
  }
}
