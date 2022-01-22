import { FindUserByTokenService } from '@/app/services/users';

import { FindUserByTokenRepositorySpy } from '../../mocks';

const makeSut = () => {
  const findUserByTokenRepositorySpy = new FindUserByTokenRepositorySpy();
  const sut = new FindUserByTokenService(findUserByTokenRepositorySpy);
  return {
    sut,
    findUserByTokenRepositorySpy,
  };
};
describe('FindByToken Service', () => {
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
});
