import { Authentication } from '@/domain/useCases/users/Authentication';
import { InvalidCredentials } from '@/presentation/errors';

import { badRequest, ok, serverError } from '../../helpers';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class LoginController implements Controller {
  constructor(private readonly authentication: Authentication) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;
      const accessToken = await this.authentication.auth({ email, password });
      if (!accessToken) {
        return badRequest(new InvalidCredentials());
      }
      return ok(accessToken);
    } catch (error) {
      return serverError(error);
    }
  }
}
