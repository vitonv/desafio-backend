import { DeleteTool } from '@/domain/useCases/tools';
import { ToolDoesNotExists } from '@/presentation/errors/ToolDoesNotExists';
import { badRequest, ok, serverError } from '@/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';

export class DeleteToolController implements Controller {
  constructor(private readonly deleteTool: DeleteTool) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params;
      const result = await this.deleteTool.delete(id);
      if (!result) {
        return badRequest(new ToolDoesNotExists());
      }
      return ok({});
    } catch (error) {
      return serverError(error);
    }
  }
}
