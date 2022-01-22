import faker from 'faker';
import { ObjectId } from 'mongodb';

import { MongoHelper } from '@/infra/db/mongodb/helpers';
import { MongoToolsRepository } from '@/infra/db/mongodb/repositories';
import { mockCreateToolParams } from '@/tests/domain/mocks';

const makeSut = () => {
  const sut = new MongoToolsRepository();
  return sut;
};
describe('', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });
  afterAll(async () => {
    await MongoHelper.disconnect();
  });
  describe('create()', () => {
    it('Should create a new tool ', async () => {
      const sut = makeSut();
      const result = await sut.create(mockCreateToolParams());
      expect(result).toBeTruthy();
      expect(result).toHaveProperty('id');
    });
  });
  describe('list()', () => {
    afterEach(async () => {
      await MongoHelper.getCollection('tools').deleteMany({});
    });
    it('Should return a list of tools given by tag', async () => {
      const sut = makeSut();
      const { title, description, link, tags } = mockCreateToolParams();
      await sut.create({ title, description, link, tags });
      const result = await sut.list({ tag: tags[0] });
      expect(result).toBeTruthy();
      expect(result[0].tags).toEqual(tags);
    });
    it('Should return a list of tools given by tag', async () => {
      const sut = makeSut();
      const { title, description, link, tags } = mockCreateToolParams();
      await sut.create({ title, description, link, tags });
      const result = await sut.list();
      expect(result).toBeTruthy();
      expect(result[0].id).toBeTruthy();
    });
  });

  describe('delete()', () => {
    it('Should return false if tool does not exists', async () => {
      const sut = makeSut();
      const fakeId = new ObjectId();
      const result = await sut.delete(fakeId.toHexString());
      expect(result).toBe(false);
    });
    it('Should delete if tool exists', async () => {
      const sut = makeSut();
      const { insertedId } = await MongoHelper.getCollection('tools').insertOne(
        mockCreateToolParams(),
      );
      const result = await sut.delete(insertedId.toHexString());
      expect(result).toBe(true);
    });
  });
});
