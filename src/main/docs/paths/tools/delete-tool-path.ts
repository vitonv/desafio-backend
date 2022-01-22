export const deleteToolPath = {
  delete: {
    tags: ['Tools'],
    summary: 'API para excluir uma ferramenta',
    parameters: [
      {
        in: 'path',
        name: 'id',
        schema: {
          type: 'string',
        },
        required: true,
        description: 'ID da ferramenta a ser removida',
      },
    ],
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    responses: {
      200: {
        description: 'Sucess',
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
