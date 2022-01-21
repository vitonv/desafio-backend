import { loginPath } from './login-path';
import { signUpPath } from './signup-path';

export default {
  '/users/signup': signUpPath,
  '/users/login': loginPath,
};
