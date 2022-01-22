import { FindUserByTokenService } from '@/app/services/users';
import { JwtAdapter } from '@/infra/cryptography';
import { MongoUsersRepository } from '@/infra/db/mongodb/repositories';

export const makeFindByToken = () => {
  const jwtAdapter = new JwtAdapter(process.env.MD5_hash);
  const usersRepository = new MongoUsersRepository();
  return new FindUserByTokenService(jwtAdapter, usersRepository);
};
