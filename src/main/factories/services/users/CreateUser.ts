import { CreateUserService } from '@/app/services/users';
import { BcryptAdapter } from '@/infra/cryptography';
import { MongoUsersRepository } from '@/infra/db/mongodb/repositories';

export const makeCreateUser = () => {
  const usersRepository = new MongoUsersRepository();
  const bcryptAdapter = new BcryptAdapter(Number(process.env.salt));
  return new CreateUserService(usersRepository, bcryptAdapter, usersRepository);
};
