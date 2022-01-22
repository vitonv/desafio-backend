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
});
