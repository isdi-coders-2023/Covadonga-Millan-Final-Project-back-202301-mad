import cors from 'cors';
import createDebug from 'debug';
import express from 'express';
import morgan from 'morgan';
import { workersRouter } from './routers/workers.router.js';

const debug = createDebug('pet-hospital:app');
export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use('/workers', workersRouter);
app.get('/', (_req, resp) => {
  resp.json({
    info: 'Pet-Hospital',
    endpoints: {
      workers: '/workers',
      pets: '/pets',
    },
  });
});
// A app.use(errorsMiddleware);
