export const createToolParamsSchema = {
  type: 'object',
  properties: {
    title: {
      type: 'string',
    },
    link: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
    tags: {
      type: 'array',
      items: {
        type: 'string',
      },
    },
  },
};
