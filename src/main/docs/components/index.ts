import { apiKeyAuthSchema } from '../schemas/api-auth-schema';
import { badRequest } from './badRequest';
import { created } from './created';
import { forbidden } from './forbidden';
import { notFound } from './notFound';
import { serverError } from './serverError';

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema,
  },
  badRequest,
  created,
  forbidden,
  notFound,
  serverError,
};
