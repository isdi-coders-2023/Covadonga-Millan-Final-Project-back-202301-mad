import { Response } from 'express';
import { HTTPError } from '../errors/httpError';
import { Auth } from '../helpers/auth';
import { RequestPlus, logged } from './logged';

jest.mock('../helpers/auth');

describe('Given Logged Interceptor', () => {
  const req = {
    body: {},
    params: { id: '' },
    get: jest.fn(),
  } as unknown as RequestPlus;
  const resp = {
    json: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  describe('When there is not authorization header', () => {
    test('Then it should send next ', () => {
      (req.get as jest.Mock).mockReturnValue(null);
      logged(req, resp, next);
      expect(next).toHaveBeenLastCalledWith(expect.any(HTTPError));
    });
  });

  describe('When the header is wrong', () => {
    test('Then it should send next', () => {
      (req.get as jest.Mock).mockReturnValue('wrong');
      logged(req, resp, next);
      expect(next).toHaveBeenLastCalledWith(expect.any(HTTPError));
    });
  });

  describe('When the token is not valid', () => {
    test('Then it should send next', () => {
      Auth.verifyJWTGettingPayload = jest.fn().mockReturnValue('not valid');
      logged(req, resp, next);
      expect(next).toHaveBeenLastCalledWith(expect.any(Error));
    });
  });

  describe('When the token is ok', () => {
    test('Then it should send next', () => {
      (req.get as jest.Mock).mockReturnValue('Bearer token');
      Auth.verifyJWTGettingPayload = jest.fn().mockReturnValue({});
      logged(req, resp, next);
      expect(next).toHaveBeenLastCalledWith();
    });
  });
});
