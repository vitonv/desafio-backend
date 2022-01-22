import { FindByToken } from '@/domain/useCases/users/FindByToken';

import { AccessDeniedError } from '../errors';
import { forbidden, ok, serverError } from '../helpers';
import { HttpRequest, HttpResponse } from '../protocols';
import { Middleware } from '../protocols/Middleware';

export class AuthMiddleware implements Middleware {
  constructor(private readonly findUserByToken: FindByToken) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.token;
      if (accessToken) {
        const user = await this.findUserByToken.findByToken(accessToken);
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
