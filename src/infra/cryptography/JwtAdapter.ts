import jwt from 'jsonwebtoken';

import { Decrypter, Encrypter } from '@/app/protocols/cryptography';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}
  decrypt(ciphertext: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async encrypt(text: string): Promise<string> {
    return jwt.verify(text, this.secret) as any;
  }
}
