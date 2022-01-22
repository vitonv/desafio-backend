import bcrypt from 'bcrypt';

import { HashComparer } from '@/app/protocols/cryptography';
import { Hasher } from '@/app/protocols/cryptography/Hasher';

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}
  async compare(plaintext: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plaintext, digest);
  }
  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt);
  }
}
