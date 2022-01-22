export const listToolsPath = {
  get: {
    tags: ['Tools'],
    summary: 'API para listar as ferramentas cadastradas',
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    parameters: [
      {
        in: 'query',
        name: 'tag',
        schema: {
          type: 'string',
        },
        required: false,
        description: 'Filtrar pela tag',
      },
    ],
    responses: {
      200: {
        description: 'Success',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/listTools',
            },
          },
        },
      },
      400: {
        $ref: '#/components/badRequest',
      },
      403: {
        $ref: '#/components/forbidden',
      },
      404: {
        $ref: '#/components/notFound',
      },
      500: {
        $ref: '#/components/serverError',
      },
    },
  },
};
