import { CreateUser } from '@/domain/useCases/users/CreateUser';

import { EmailAlreadyExists } from '../../errors/EmailAlreadyExists';
import { forbidden, ok, serverError } from '../../helpers';
import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class SignUpController implements Controller {
  constructor(private readonly createUser: CreateUser) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = httpRequest.body;
      const result = await this.createUser.create({
        name,
        email,
        password,
      });
      if (!result) {
        return forbidden(new EmailAlreadyExists());
      }
      return ok(result);
    } catch (error) {
      return serverError(error);
    }
  }
}
