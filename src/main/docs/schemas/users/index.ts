import { LoginParamsSchema } from './login-params-schema';
import { signUpParamsSchema } from './signup-params-schema';

export default {
  signInParams: LoginParamsSchema,
  signUpParams: signUpParamsSchema,
};
