import { ListTools } from '@/domain/useCases/tools/ListTools';
import { ok, serverError } from '@/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';

export class ListToolsController implements Controller {
  constructor(private readonly listTools: ListTools) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const params = httpRequest.query;
      const tools = await this.listTools.list(params);
      return ok(tools);
    } catch (error) {
      return serverError(error);
    }
  }
}
