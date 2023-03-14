import { Auth } from '../helpers/auth.js';
import { Request, Response } from 'express';
import { WorkersController } from './workers.controller.js';

jest.mock('../helpers/auth.js');

describe('Given the class WorkersController', () => {
  describe('When we use the login method', () => {
    const mockRepoUsers = {
      search: jest.fn(),
      create: jest.fn(),
    };

    const controller = new WorkersController(mockRepoUsers);

    const resp = {
      status: jest.fn(),
      json: jest.fn(),
    } as unknown as Response;

    const next = jest.fn();

    test('Then when the login is successful ', async () => {
      const req = {
        body: {
          email: 'email',
          password: 'password',
        },
      } as unknown as Request;

      mockRepoUsers.search.mockResolvedValue([1]);
      Auth.compare = jest.fn().mockResolvedValue(true);
      await controller.login(req, resp, next);
      expect(mockRepoUsers.search).toHaveBeenCalled();
    });

    test('Then when the login is not successful because there is no data', async () => {
      const req = {
        body: {
          email: 'email',
          password: 'password',
        },
      } as unknown as Request;
      mockRepoUsers.search.mockResolvedValue([]);
      await controller.login(req, resp, next);
      expect(mockRepoUsers.search).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    test('Then when the email is missing, next function will be called', async () => {
      const req = {
        body: {
          password: 'password',
        },
      } as unknown as Request;
      mockRepoUsers.search.mockRejectedValue('error');
      await controller.login(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
    test('Then when the password is missing, next function will be called', async () => {
      const req = {
        body: {
          email: 'email',
        },
      } as unknown as Request;
      mockRepoUsers.search.mockRejectedValue('error');
      await controller.login(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
    test('Then if there is no data it should throw an HTTPError ', async () => {
      const req = {
        body: {
          email: 'email',
          password: 'password',
        },
      } as unknown as Request;
      mockRepoUsers.search.mockResolvedValue([]);
      await controller.login(req, resp, next);
      expect(mockRepoUsers.search).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
    test('Then it should throw an HTTPError if the password is ok', async () => {
      const req = {
        body: {
          email: 'email',
          password: 'password',
        },
      } as unknown as Request;
      Auth.compare = jest.fn().mockResolvedValue(false);
      mockRepoUsers.search.mockResolvedValue([{ password: 'password' }]);
      await controller.login(req, resp, next);
      expect(mockRepoUsers.search).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });
});
