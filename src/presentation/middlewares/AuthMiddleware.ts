import { FindByToken } from '@/domain/useCases/users/FindByToken';

import { AccessDeniedError } from '../errors';
import { forbidden, ok, serverError } from '../helpers';
import { HttpRequest, HttpResponse } from '../protocols';
import { Middleware } from '../protocols/Middleware';

export class AuthMiddleware implements Middleware {
  constructor(private readonly findUserByToken: FindByToken) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { token } = httpRequest.headers;
      if (token) {
        const user = await this.findUserByToken.findByToken(token);
        if (user) {
          return ok({
            userId: user.id,
          });
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error);
    }
  }
}
