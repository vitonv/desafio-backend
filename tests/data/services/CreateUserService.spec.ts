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
    const { sut, createUserRepositorySpy } = makeSut();
    const createSpy = jest.spyOn(createUserRepositorySpy, 'create');
    await sut.create(mockCreateAccountParams());
    expect(createSpy).toHaveBeenCalledWith(createUserRepositorySpy.params);
  });
});
