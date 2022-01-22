import { FindUserRepositorySpy } from '@/tests/app/mocks';
import { mockAuthentication } from '@/tests/domain/mocks';

import { AuthenticateUserService } from '.';

const makeSut = () => {
  const findUserRepositorySpy = new FindUserRepositorySpy();
  const sut = new AuthenticateUserService(findUserRepositorySpy);
  return {
    sut,
    findUserRepositorySpy,
  };
};
describe('AuthenticateUser Service', () => {
  it('Should call findUserRepository with params email', async () => {
    const { sut, findUserRepositorySpy } = makeSut();
    const findByEmailSpy = jest.spyOn(findUserRepositorySpy, 'findByEmail');
    const { email, password } = mockAuthentication();
    await sut.auth({ email, password });
    expect(findByEmailSpy).toHaveBeenCalledWith(email);
  });
  it('Should throw if findUserRepository throws', async () => {
    const { sut, findUserRepositorySpy } = makeSut();
    jest
      .spyOn(findUserRepositorySpy, 'findByEmail')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const { email, password } = mockAuthentication();
    const error = sut.auth({ email, password });
    await expect(error).rejects.toThrow();
  });
});
