import { Decrypter } from '@/app/protocols/cryptography';
import { FindUserByTokenRepository } from '@/app/protocols/db/users';
import { FindByToken } from '@/domain/useCases/users/FindByToken';

export class FindUserByTokenService implements FindByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly findUserByTokenRepository: FindUserByTokenRepository,
  ) {}
  async findByToken(token: string): Promise<FindByToken.Result> {
    let isValid: string;
    try {
      const isValid = await this.decrypter.decrypt(token);
    } catch (error) {
      return null;
    }
    if (isValid) {
      const user = await this.findUserByTokenRepository.findByToken(token);
      if (user) {
        return {
          id: user.id,
        };
      }
    }
    return null;
  }
}
