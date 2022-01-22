import { FindByToken } from '@/domain/useCases/users/FindByToken';

export interface FindUserByTokenRepository {
  findByToken(token: string): Promise<FindUserByTokenRepository.Result>;
}

export namespace FindUserByTokenRepository {
  export type Result = FindByToken.Result;
}
