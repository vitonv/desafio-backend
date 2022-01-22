import { Encrypter, HashComparer } from '@/app/protocols/cryptography';

export class HashComparerSpy implements HashComparer {
  async compare(plaintext: string, digest: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export class EncrypterSpy implements Encrypter {
  async encrypt(text: string): Promise<string> {
    return Promise.resolve('any_token');
  }
}
