import cors from 'cors';
import express from 'express';

import setupSwagger from './swagger-config';

const app = express();
app.use(cors());
setupSwagger(app);
app.use(express.json());

export { app };
