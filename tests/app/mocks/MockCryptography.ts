import { Encrypter, HashComparer } from '@/app/protocols/cryptography';

export class HashComparerSpy implements HashComparer {
  async compare(plaintext: string, digest: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export class EncrypterSpy implements Encrypter {
  result: string;
  async encrypt(text: string): Promise<string> {
    this.result = 'any_token';
    return Promise.resolve(this.result);
  }
}
