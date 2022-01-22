import { AuthenticateUserService } from '@/app/services/users';
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography';
import { MongoUsersRepository } from '@/infra/db/mongodb/repositories';

export const makeAuthenticate = () => {
  const usersRepository = new MongoUsersRepository();
  const bcryptAdapter = new BcryptAdapter(Number(process.env.salt));
  const jwtAdapter = new JwtAdapter(process.env.MD5_hash);
  return new AuthenticateUserService(
    usersRepository,
    bcryptAdapter,
    jwtAdapter,
    usersRepository,
  );
};
