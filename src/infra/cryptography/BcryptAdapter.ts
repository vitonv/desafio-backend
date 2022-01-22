import bcrypt from 'bcrypt';

import { HashComparer } from '@/app/protocols/cryptography';
import { Hasher } from '@/app/protocols/cryptography/Hasher';

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}
  async compare(plaintext: string, digest: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  async hash(plaintext: string): Promise<string> {
    return bcrypt.hash(plaintext, this.salt);
  }
}
