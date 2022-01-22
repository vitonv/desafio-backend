import { FindUserRepositorySpy } from '@/tests/app/mocks';
import { HashComparerSpy } from '@/tests/app/mocks/MockCryptography';
import { mockAuthentication } from '@/tests/domain/mocks';

import { AuthenticateUserService } from '.';

const makeSut = () => {
  const findUserRepositorySpy = new FindUserRepositorySpy();
  const hashComparerSpy = new HashComparerSpy();
  const sut = new AuthenticateUserService(
    findUserRepositorySpy,
    hashComparerSpy,
  );
  return {
    sut,
    findUserRepositorySpy,
    hashComparerSpy,
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
  it('Should return null if findUserRepository returns falsy', async () => {
    const { sut, findUserRepositorySpy } = makeSut();
    jest
      .spyOn(findUserRepositorySpy, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(null));
    const { email, password } = mockAuthentication();
    const result = await sut.auth({ email, password });
    expect(result).toBeNull();
  });
  it('Should return null if password does not match', async () => {
    const { sut, hashComparerSpy } = makeSut();
    jest
      .spyOn(hashComparerSpy, 'compare')
      .mockReturnValueOnce(Promise.resolve(false));
    const { email, password } = mockAuthentication();
    const result = await sut.auth({ email, password });
    expect(result).toBeNull();
  });
});
