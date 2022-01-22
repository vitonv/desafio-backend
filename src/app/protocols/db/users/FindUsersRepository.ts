import { User } from '@/domain/entities/User';

export interface FindUserRepository {
  findByEmail(email: string): Promise<FindUserRepository.Result>;
}

export namespace FindUserRepository {
  export type Result = User;
}
