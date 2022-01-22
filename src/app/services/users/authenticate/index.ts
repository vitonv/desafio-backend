import { HashComparer } from '@/app/protocols/cryptography';
import { Encrypter } from '@/app/protocols/cryptography/Encrypter';
import { FindUserRepository } from '@/app/protocols/db/users/FindUsersRepository';
import { UpdateAccessTokenRepository } from '@/app/protocols/db/users/UpdateAccessTokenRepository';
import { Authentication } from '@/domain/useCases/users/Authentication';
import { FindUserRepositorySpy } from '@/tests/app/mocks';

export class AuthenticateUserService implements Authentication {
  constructor(
    private readonly findUserRepository: FindUserRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    const user = await this.findUserRepository.findByEmail(params.email);
    if (user) {
      const passwordMatch = await this.hashComparer.compare(
        params.password,
        user.password,
      );
      if (passwordMatch) {
        const token = await this.encrypter.encrypt(user.id);
        await this.updateAccessTokenRepository.updateAccessToken(
          user.id,
          token,
        );
        return {
          token,
          user: {
            id: user.id,
            name: user.name,
          },
        };
      }
    }

    return null;
  }
}
