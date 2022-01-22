import {
  FindUserRepositorySpy,
  UpdateAccessTokenRepositorySpy,
} from '@/tests/app/mocks';
import {
  EncrypterSpy,
  HashComparerSpy,
} from '@/tests/app/mocks/MockCryptography';
import { mockAuthentication } from '@/tests/domain/mocks';

import { AuthenticateUserService } from '.';

const makeSut = () => {
  const findUserRepositorySpy = new FindUserRepositorySpy();
  const hashComparerSpy = new HashComparerSpy();
  const encrypterSpy = new EncrypterSpy();
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy();
  const sut = new AuthenticateUserService(
    findUserRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy,
  );
  return {
    sut,
    findUserRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy,
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
  it('Should call Encrypter with correct value', async () => {
    const { sut, encrypterSpy, findUserRepositorySpy } = makeSut();
    const encryptSpy = jest.spyOn(encrypterSpy, 'encrypt');
    const { email, password } = mockAuthentication();
    await sut.auth({ email, password });
    expect(encryptSpy).toHaveBeenCalledWith(findUserRepositorySpy.result.id);
  });
  it('Should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut();
    jest
      .spyOn(encrypterSpy, 'encrypt')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const { email, password } = mockAuthentication();
    const error = sut.auth({ email, password });
    expect(error).rejects.toThrow();
  });
  it('Should call updateAccessTokenRepositorySpy with correct values', async () => {
    const {
      sut,
      encrypterSpy,
      findUserRepositorySpy,
      updateAccessTokenRepositorySpy,
    } = makeSut();
    const updateAccessTokenSpy = jest.spyOn(
      updateAccessTokenRepositorySpy,
      'updateAccessToken',
    );
    const { email, password } = mockAuthentication();
    await sut.auth({ email, password });
    expect(updateAccessTokenSpy).toHaveBeenCalledWith(
      findUserRepositorySpy.result.id,
      encrypterSpy.result,
    );
  });
  it('Should throw if updateAccessTokenRepositorySpy throws', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut();
    jest
      .spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const { email, password } = mockAuthentication();
    const error = sut.auth({ email, password });
    expect(error).rejects.toThrow();
  });
  it('Should return user with accessToken on success', async () => {
    const { sut, encrypterSpy, findUserRepositorySpy } = makeSut();
    const { email, password } = mockAuthentication();
    const { token, user } = await sut.auth({ email, password });
    expect(token).toBe(encrypterSpy.result);
    expect(user.id).toBe(findUserRepositorySpy.result.id);
    expect(user.name).toBe(findUserRepositorySpy.result.name);
  });
});
