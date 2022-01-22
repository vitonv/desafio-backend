import { CreateUserService } from '@/app/services/users/CreateUserService';
import { mockCreateAccountParams } from '@/tests/domain/mocks';

import { CreateUserRepositorySpy, FindUserRepositorySpy } from '../mocks';

const makeSut = () => {
  const createUserRepositorySpy = new CreateUserRepositorySpy();
  const findUserRepositorySpy = new FindUserRepositorySpy();
  const sut = new CreateUserService(
    findUserRepositorySpy,
    createUserRepositorySpy,
  );
  return {
    sut,
    createUserRepositorySpy,
    findUserRepositorySpy,
  };
};
describe('CreateUser Service', () => {
  it('Should return false if findUserRepositorySpy returns a user', async () => {
    const { sut, findUserRepositorySpy } = makeSut();

    const result = await sut.create(mockCreateAccountParams());
    expect(result).toBe(false);
  });
  it('Should throw if findUserRepository throws', async () => {
    const { sut, findUserRepositorySpy } = makeSut();
    jest
      .spyOn(findUserRepositorySpy, 'findByEmail')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.create(mockCreateAccountParams());
    await expect(error).rejects.toThrow();
  });
  it('Should call createUserRepository with correct values', async () => {
    const { sut, createUserRepositorySpy, findUserRepositorySpy } = makeSut();
    const createSpy = jest.spyOn(createUserRepositorySpy, 'create');
    jest
      .spyOn(findUserRepositorySpy, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(null));
    const { name, email, password } = mockCreateAccountParams();
    await sut.create({ name, email, password });
    expect(createSpy).toHaveBeenCalledWith({ name, email, password });
  });
  it('Should return true on success', async () => {
    const { sut, findUserRepositorySpy } = makeSut();
    jest
      .spyOn(findUserRepositorySpy, 'findByEmail')
      .mockReturnValueOnce(Promise.resolve(null));
    const { name, email, password } = mockCreateAccountParams();
    const result = await sut.create({ name, email, password });
    expect(result).toBe(true);
  });
});
