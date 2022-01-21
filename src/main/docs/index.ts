import components from './components';
import paths from './paths';
import schemas from './schemas';

export default {
  openapi: '3.0.0',
  info: {
    title: 'Documentação da API Teste Desenvolvedor:Backend',
    description: 'Essa é uma API de resolução do desafio',
    version: '1.0.0',
  },
  tags: [
    {
      name: 'Users',
      description: 'API relacionada aos usuários do sistema',
    },
  ],
  paths,
  components,
  schemas,
};
