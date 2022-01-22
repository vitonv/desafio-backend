import { CreateUserService } from '@/app/services/users';
import { mockCreateAccountParams } from '@/tests/domain/mocks';

import { CreateUserRepositorySpy, FindUserRepositorySpy } from '../../mocks';
import { HasherSpy } from '../../mocks/MockCryptography';

const makeSut = () => {
  const findUserRepositorySpy = new FindUserRepositorySpy();
  const hasherSpy = new HasherSpy();
  const createUsersRepositorySpy = new CreateUserRepositorySpy();
  const sut = new CreateUserService(
    findUserRepositorySpy,
    hasherSpy,
    createUsersRepositorySpy,
  );
  return {
    sut,
    findUserRepositorySpy,
    hasherSpy,
    createUsersRepositorySpy,
  };
};
describe('CreateUser Service', () => {
  it('Should call findUserRepository with correct value', async () => {
    const { sut, findUserRepositorySpy } = makeSut();
    const findByEmailSpy = jest.spyOn(findUserRepositorySpy, 'findByEmail');
    const { email, name, password } = mockCreateAccountParams();
    await sut.create({ email, name, password });
    expect(findByEmailSpy).toHaveBeenCalledWith(email);
  });
  it('Should throw if findUserRepository throws', async () => {
    const { sut, findUserRepositorySpy } = makeSut();
    jest
      .spyOn(findUserRepositorySpy, 'findByEmail')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const { email, name, password } = mockCreateAccountParams();
    const error = sut.create({ email, name, password });
    await expect(error).rejects.toThrow();
  });
  it('Should throw if findUserRepository throws', async () => {
    const { sut } = makeSut();
    const { email, name, password } = mockCreateAccountParams();
    const result = await sut.create({ email, name, password });
    expect(result).toEqual(false);
  });
  it('Should call hasher with correct value', async () => {
    const { sut, hasherSpy, findUserRepositorySpy } = makeSut();
    jest
      .spyOn(findUserRepositorySpy, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(null));
    const hashSpy = jest.spyOn(hasherSpy, 'hash');
    const { email, name, password } = mockCreateAccountParams();
    await sut.create({ email, name, password });
    expect(hashSpy).toHaveBeenCalledWith(password);
  });
  it('Should call hasher with correct value', async () => {
    const { sut, hasherSpy, findUserRepositorySpy } = makeSut();
    jest
      .spyOn(findUserRepositorySpy, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(null));
    jest
      .spyOn(hasherSpy, 'hash')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const { email, name, password } = mockCreateAccountParams();
    const error = sut.create({ email, name, password });
    await expect(error).rejects.toThrow();
  });
  it('Should return true on success', async () => {
    const { sut, findUserRepositorySpy } = makeSut();
    jest
      .spyOn(findUserRepositorySpy, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(null));
    const { email, name, password } = mockCreateAccountParams();
    const result = await sut.create({ email, name, password });
    expect(result).toBe(true);
  });
});
