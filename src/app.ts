import cors from 'cors';
import createDebug from 'debug';
import express from 'express';
import morgan from 'morgan';

const debug = createDebug('pet-hospital:app');
export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
// A app.use('/users', usersRouter);
// A app.use(errorsMiddleware);
