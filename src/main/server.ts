import { MongoHelper } from '@/infra/db/mongodb/helpers';

MongoHelper.connect('mongodb://localhost:2717')
  .then(async () => {
    const { app } = await import('./config/app');
    app.listen(3000, () =>
      console.log(`Server running at http://localhost:3000/api/docs`),
    );
  })
  .catch(console.error);
