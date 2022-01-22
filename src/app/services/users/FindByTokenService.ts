import { FindUserByTokenRepository } from '@/app/protocols/db/users';
import { FindByToken } from '@/domain/useCases/users/FindByToken';

export class FindUserByTokenService implements FindByToken {
  constructor(
    private readonly findUserByTokenRepository: FindUserByTokenRepository,
  ) {}
  async findByToken(token: string): Promise<FindByToken.Result> {
    const user = await this.findUserByTokenRepository.findByToken(token);
    if (user) {
      return {
        id: user.id,
      };
    }
    return null;
  }
}
