import { DeleteToolService } from '@/app/services/tools';

import { DeleteToolRepositorySpy } from '../../mocks';

const makeSut = () => {
  const deleteToolRepositorySpy = new DeleteToolRepositorySpy();
  const sut = new DeleteToolService(deleteToolRepositorySpy);
  return {
    sut,
    deleteToolRepositorySpy,
  };
};
describe('DeleteTool Service', () => {
  it('Should call deleteToolRepository with correct value', async () => {
    const { sut, deleteToolRepositorySpy } = makeSut();
    await sut.delete('any_id');
    expect(deleteToolRepositorySpy.params).toBe('any_id');
  });
  it('Should throw if deleteToolRepository throws', async () => {
    const { sut, deleteToolRepositorySpy } = makeSut();
    jest
      .spyOn(deleteToolRepositorySpy, 'delete')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.delete('any_id');
    expect(error).rejects.toThrow();
  });
  it('Should throw if deleteToolRepository throws', async () => {
    const { sut, deleteToolRepositorySpy } = makeSut();
    jest
      .spyOn(deleteToolRepositorySpy, 'delete')
      .mockReturnValueOnce(Promise.resolve(false));
    const result = await sut.delete('any_id');
    expect(result).toBe(false);
  });
  it('Should return true on success', async () => {
    const { sut } = makeSut();
    const result = await sut.delete('any_id');
    expect(result).toBe(true);
  });
});
