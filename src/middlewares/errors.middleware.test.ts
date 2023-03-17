import { errorsMiddleware } from './errors.middleware';
import { Error as MongooseError } from 'mongoose';
import { Request, Response } from 'express';
import { HTTPError } from '../errors/httpError';

describe('Given errors middleware', () => {
  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  const req = {} as unknown as Request;

  describe('When we have a cast error', () => {
    test('Then the status should be a 400', () => {
      const error = new MongooseError.CastError('a', 'e', 'i');
      errorsMiddleware(error, req, resp);
      expect(resp.status).toHaveBeenLastCalledWith(400);
    });
  });

  describe('When we have a validation error', () => {
    test('Then the status should be 406', () => {
      const error = new MongooseError.ValidationError();
      errorsMiddleware(error, req, resp);
      expect(resp.status).toHaveBeenCalledWith(406);
    });
  });

  describe('When we have an HTTP error', () => {
    test('Then the status should be 418 and have two strings', () => {
      const error = new HTTPError(418, 'error', 'error');
      errorsMiddleware(error, req, resp);
      expect(resp.status).toHaveBeenCalledWith(418);
    });
  });

  describe('When the error is an Error', () => {
    test('Then it should have a new Error and status 500', () => {
      const error = new Error('error');
      errorsMiddleware(error, req, resp);
      expect(resp.status).toHaveBeenCalledWith(500);
    });
  });
});
