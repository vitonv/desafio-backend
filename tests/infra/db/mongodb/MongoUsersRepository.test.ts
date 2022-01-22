import { MongoHelper } from '@/infra/db/mongodb/helpers';
import { MongoUsersRepository } from '@/infra/db/mongodb/repositories';
import { mockCreateAccountParams } from '@/tests/domain/mocks';

const makeSut = () => {
  const sut = new MongoUsersRepository();
  return {
    sut,
  };
};
describe('', () => {
  beforeAll(async () => {
    await MongoHelper.connect('mongodb://localhost:2717');
  });
  afterAll(async () => {
    await MongoHelper.disconnect();
  });
  describe('create()', () => {
    it('Should create a new account ', async () => {
      const { sut } = makeSut();
      const newUser = mockCreateAccountParams();
      const created = await sut.create(newUser);
      expect(created).toBe(true);
    });
  });
});
