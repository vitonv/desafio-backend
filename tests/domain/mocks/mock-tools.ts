import faker from 'faker';

export const mockCreateToolParams = () => ({
  title: faker.name.findName(),
  link: faker.internet.url(),
  description: faker.name.jobDescriptor(),
  tags: [faker.name.jobType()],
});

export const mockListTools = (tag?: string) => ({
  id: faker.datatype.uuid(),
  title: faker.name.findName(),
  link: faker.internet.url(),
  description: faker.name.jobDescriptor(),
  tags: [`${tag || faker.name.jobType()}`],
});
