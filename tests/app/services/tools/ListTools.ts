import { ListToolsService } from '@/app/services/tools';

import { ListToolsRepositorySpy } from '../../mocks';

const makeSut = () => {
  const listToolsRepositorySpy = new ListToolsRepositorySpy();
  const sut = new ListToolsService(listToolsRepositorySpy);
  return {
    sut,
    listToolsRepositorySpy,
  };
};
const params = {
  tag: 'any_tag',
};
describe('ListTools Service', () => {
  it('Should call listToolsRepository with correct values', async () => {
    const { sut, listToolsRepositorySpy } = makeSut();
    await sut.list(params);
    expect(listToolsRepositorySpy.params).toBe(params);
  });
  it('Should throw if listToolsRepository throws', async () => {
    const { sut, listToolsRepositorySpy } = makeSut();
    jest
      .spyOn(listToolsRepositorySpy, 'list')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const error = sut.list(params);
    expect(error).rejects.toThrow();
  });
  it('Should return a list of tools on success', async () => {
    const { sut, listToolsRepositorySpy } = makeSut();
    const result = await sut.list(params);
    expect(result).toBe(listToolsRepositorySpy.list);
  });
});
