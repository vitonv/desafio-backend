import bcrypt from 'bcrypt';

import { BcryptAdapter } from '@/infra/cryptography';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'hashed_value';
  },
  async compare(): Promise<boolean> {
    return true;
  },
}));

const makeSut = () => {
  const salt = 12;
  const sut = new BcryptAdapter(salt);
  return sut;
};

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    it('Should return a valid hash on success', async () => {
      const sut = makeSut();
      const hash = await sut.hash('any_value');
      expect(hash).toBe('hashed_value');
    });
  });
  describe('compare()', () => {
    it('Should return true on sucess', async () => {
      const sut = makeSut();
      const isEqual = await sut.compare('any_value', 'hashed_value');
      expect(isEqual).toBe(true);
    });
    it('Should return false when compare fails', async () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false);
      const isEqual = await sut.compare('any_value', 'hashed_value');
      expect(isEqual).toBe(false);
    });
  });
});
