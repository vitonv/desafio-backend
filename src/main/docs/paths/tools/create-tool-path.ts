export const createToolPath = {
  post: {
    tags: ['Tools'],
    summary: 'API para cadastrar uma nova ferramenta',
    security: [
      {
        apiKeyAuth: [],
      },
    ],
    requestBody: {
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/createToolParams',
          },
        },
      },
    },
    responses: {
      201: {
        $ref: '#/components/created',
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
