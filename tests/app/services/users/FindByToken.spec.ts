import { FindUserByTokenService } from '@/app/services/users';

import { FindUserByTokenRepositorySpy } from '../../mocks';
import { DecrypterSpy } from '../../mocks/MockCryptography';

const makeSut = () => {
  const decrypterSpy = new DecrypterSpy();
  const findUserByTokenRepositorySpy = new FindUserByTokenRepositorySpy();
  const sut = new FindUserByTokenService(
    decrypterSpy,
    findUserByTokenRepositorySpy,
  );
  return {
    sut,
    findUserByTokenRepositorySpy,
    decrypterSpy,
  };
};
describe('FindByToken Service', () => {
  it('Should return null if decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut();
    jest
      .spyOn(decrypterSpy, 'decrypt')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const result = await sut.findByToken('any_token');
    expect(result).toBeNull();
  });
  it('Should return null if findUserByTokenRepository do not return an user', async () => {
    const { sut, findUserByTokenRepositorySpy } = makeSut();
    jest
      .spyOn(findUserByTokenRepositorySpy, 'findByToken')
      .mockReturnValueOnce(Promise.resolve(null));
    const result = await sut.findByToken('any_token');
    expect(result).toBeNull();
  });
  it('Should return null if findUserByTokenRepository do not return an user', async () => {
    const { sut, findUserByTokenRepositorySpy } = makeSut();
    jest
      .spyOn(findUserByTokenRepositorySpy, 'findByToken')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.findByToken('any_token');
    await expect(error).rejects.toThrow();
  });
  it('Should return user id on success', async () => {
    const { sut, findUserByTokenRepositorySpy } = makeSut();
    const result = await sut.findByToken('any_token');
    expect(result.id).toBe(findUserByTokenRepositorySpy.result.id);
  });
});
