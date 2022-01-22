import { CreateUser } from '@/domain/useCases/users/CreateUser';

export interface CreateUserRepository {
  create(params: CreateUser.Params): Promise<boolean>;
}

export namespace CreateUserRepository {
  export type Params = CreateUser.Params;
}
