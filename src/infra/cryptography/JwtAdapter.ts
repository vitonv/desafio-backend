import jwt from 'jsonwebtoken';

import { Encrypter } from '@/app/protocols/cryptography';

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}
  async encrypt(text: string): Promise<string> {
    return jwt.sign({ id: text }, this.secret);
  }
}
