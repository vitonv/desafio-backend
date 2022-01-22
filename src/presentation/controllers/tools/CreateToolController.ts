import { CreateTool } from '@/domain/useCases/tools';
import { created, serverError } from '@/presentation/helpers';
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from '@/presentation/protocols';

export class CreateToolController implements Controller {
  constructor(private readonly createTool: CreateTool) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { title, link, description, tags } = httpRequest.body;
      const newTool = await this.createTool.create({
        title,
        link,
        description,
        tags,
      });
      return created(newTool);
    } catch (error) {
      return serverError(error);
    }
  }
}
