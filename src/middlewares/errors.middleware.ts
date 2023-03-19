import { Request, Response } from 'express';
import { Error } from 'mongoose';
import { CustomError, HTTPError } from '../errors/httpError.js';
import createDebug from 'debug';
const debug = createDebug('pet-hospital:errors middleware');

export const errorsMiddleware = (
  error: CustomError | Error,
  _req: Request,
  resp: Response
) => {
  debug('errors middleware');

  let status = 500;
  let statusMessage = 'Internal server error';

  if (error instanceof HTTPError) {
    status = error.statusCode;
    statusMessage = error.statusMessage;
  }

  if (error instanceof Error.CastError) {
    status = 400;
    statusMessage = 'Bad formatted data in the request';
  }

  if (error instanceof Error.ValidationError) {
    status = 406;
    statusMessage = 'Validation error in the request';
  }

  resp.status(status);
  resp.json({
    error: [
      {
        status,
        statusMessage,
      },
    ],
  });
  debug(status, statusMessage, error.message);
};
