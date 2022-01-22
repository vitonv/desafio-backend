import jwt from 'jsonwebtoken';

import { JwtAdapter } from '@/infra/cryptography';

jest.mock('jsonwebtoken', () => ({
  async sign(): Promise<string> {
    return 'any_token';
  },
  async verify(): Promise<string> {
    return 'any_value';
  },
}));
const makeSut = () => {
  const sut = new JwtAdapter(process.env.MD5_hash);
  return sut;
};
describe('JwtAdapter', () => {
  describe('sign()', () => {
    it('Should return a token on sign success', async () => {
      const sut = makeSut();
      const token = await sut.encrypt('any_id');
      expect(token).toBe('any_token');
    });
  });
  describe('verify()', () => {
    it('Should return a value on verify success', async () => {
      const sut = makeSut();
      const value = await sut.decrypt('any_token');
      expect(value).toBe('any_value');
    });
  });
});
