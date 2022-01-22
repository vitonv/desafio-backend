import { createToolPath } from './create-tool-path';
import { deleteToolPath } from './delete-tool-path';
import { listToolsPath } from './list-tools-path';

export default {
  '/tools': {
    ...listToolsPath,
    ...createToolPath,
  },
  '/tools/{id}': deleteToolPath,
};
