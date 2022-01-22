import { CreateToolService } from '@/app/services/tools';
import { mockCreateToolParams } from '@/tests/domain/mocks';

import { CreateToolRepositorySpy } from '../../mocks';

const makeSut = () => {
  const createToolRepositorySpy = new CreateToolRepositorySpy();
  const sut = new CreateToolService(createToolRepositorySpy);
  return {
    sut,
    createToolRepositorySpy,
  };
};
describe('CreateTool Service', () => {
  it('Should throw if createToolRepository throws', async () => {
    const { sut, createToolRepositorySpy } = makeSut();
    jest
      .spyOn(createToolRepositorySpy, 'create')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.create(mockCreateToolParams());
    await expect(error).rejects.toThrow();
  });
  it('Should return a new tool on success', async () => {
    const { sut, createToolRepositorySpy } = makeSut();
    const result = await sut.create(mockCreateToolParams());
    expect(result).toBeTruthy();
    expect(result.id).toBe(createToolRepositorySpy.result.id);
    expect(result.title).toBe(createToolRepositorySpy.params.title);
    expect(result.description).toBe(createToolRepositorySpy.params.description);
    expect(result.tags).toBe(createToolRepositorySpy.params.tags);
  });
});
