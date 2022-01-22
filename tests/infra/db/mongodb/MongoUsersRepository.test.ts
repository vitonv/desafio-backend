import faker from 'faker';

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
  describe('findByEmail()', () => {
    it('Should return an existing user', async () => {
      const { sut } = makeSut();
      const newUser = mockCreateAccountParams();
      await sut.create(newUser);
      const findUser = await sut.findByEmail(newUser.email);
      expect(findUser).toBeTruthy();
      expect(findUser.id).toBeTruthy();
      expect(findUser.name).toBe(newUser.name);
      expect(findUser.email).toBe(newUser.email);
    });
  });
  describe('updateAccessToken', () => {
    it('Should update user accessToken on success', async () => {
      const { sut } = makeSut();
      const newUser = mockCreateAccountParams();
      await sut.create(newUser);
      const findUser = await sut.findByEmail(newUser.email);
      expect(findUser.token).toBeFalsy();
      const token = faker.datatype.uuid();
      await sut.updateAccessToken(findUser.id, token);
      const checkUserToken = await sut.findByEmail(findUser.email);
      expect(checkUserToken.token).toBe(token);
    });
  });
  describe('findByToken()', () => {
    const name = faker.name.findName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const token = faker.datatype.uuid();
    it('Should return the id an existing user ', async () => {
      const { sut } = makeSut();
      await MongoHelper.getCollection('users').insertOne({
        name,
        email,
        password,
        token,
      });
      const user = await sut.findByToken(token);
      expect(user.id).toBeTruthy();
    });
  });
});
