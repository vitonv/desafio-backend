import { HashComparer } from '@/app/protocols/cryptography';

export class HashComparerSpy implements HashComparer {
  async compare(plaintext: string, digest: string): Promise<boolean> {
    return Promise.resolve(true);
  }
}
