import { createToolParamsSchema } from './create-tool-params-schema';
import { listToolsSchema } from './list-tools-schema';
import { toolSchema } from './tool-schema';

export default {
  createToolParams: createToolParamsSchema,
  listTools: listToolsSchema,
  tool: toolSchema,
};
