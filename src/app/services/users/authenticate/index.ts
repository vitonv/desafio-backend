import { FindUserRepository } from '@/app/protocols/db/users/FindUsersRepository';
import { Authentication } from '@/domain/useCases/users/Authentication';
import { FindUserRepositorySpy } from '@/tests/app/mocks';

export class AuthenticateUserService implements Authentication {
  constructor(private readonly findUserRepository: FindUserRepository) {}

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    await this.findUserRepository.findByEmail(params.email);
    return null;
  }
}
