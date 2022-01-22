import faker from 'faker';

export const mockCreateAccountParams = () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

export const mockFindUser = (email: string) => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email,
  password: faker.internet.password(),
});
