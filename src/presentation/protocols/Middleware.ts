import { HttpRequest, HttpResponse } from './Http';

interface Middleware {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}

export { Middleware };
