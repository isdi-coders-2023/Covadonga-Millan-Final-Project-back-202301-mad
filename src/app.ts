import cors from 'cors';
import createDebug from 'debug';
import express from 'express';
import morgan from 'morgan';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from './errors/httpError.js';
import { petsRouter } from './routers/pets.router.js';
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
app.use('/pets', petsRouter);
app.get('/', (_req, resp) => {
  resp.json({
    info: 'Pet-Hospital',
    endpoints: {
      workers: '/workers',
      pets: '/pets',
    },
  });
});

app.use(
  (error: CustomError, _req: Request, resp: Response, _next: NextFunction) => {
    debug('Errors middleware');
    const status = error.statusCode || 500;
    const statusMessage = error.statusMessage || 'Internal server error';
    resp.status(status);
    resp.json({ error: [{ status, statusMessage }] });
    debug(status, statusMessage, error.message);
  }
);
