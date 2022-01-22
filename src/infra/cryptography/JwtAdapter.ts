import jwt from 'jsonwebtoken';

import { Decrypter, Encrypter } from '@/app/protocols/cryptography';

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}
  async encrypt(text: string): Promise<string> {
    return jwt.sign({ id: text }, this.secret);
  }
  decrypt(ciphertext: string): Promise<string> {
    return jwt.verify(ciphertext, this.secret) as any;
  }
}
