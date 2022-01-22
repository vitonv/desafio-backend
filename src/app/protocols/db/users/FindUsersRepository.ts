import { User } from '@/domain/entities/User';

export interface FindUsersRepository {
  findByEmail(email: string): Promise<FindUsersRepository.Result>;
}

export namespace FindUsersRepository {
  export type Result = User;
}
