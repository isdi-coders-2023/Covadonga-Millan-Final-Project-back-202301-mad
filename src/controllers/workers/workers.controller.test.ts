import { Auth } from '../../helpers/auth.js';
import { Request, Response } from 'express';
import { WorkersController } from './workers.controller.js';

jest.mock('../../helpers/auth.js');

const secretWord = 'secret';
describe('Given the class WorkersController', () => {
  const mockRepoWorkers = {
    search: jest.fn(),
    create: jest.fn(),
  };

  const controller = new WorkersController(mockRepoWorkers);

  const resp = {
    status: jest.fn(),
    json: jest.fn(),
  } as unknown as Response;

  const next = jest.fn();
  describe('When we use the login method', () => {
    test('Then when the login is successful ', async () => {
      const req = {
        body: {
          email: 'email',
          password: secretWord,
        },
      } as unknown as Request;

      mockRepoWorkers.search.mockResolvedValue([1]);
      Auth.compare = jest.fn().mockResolvedValue(true);
      await controller.login(req, resp, next);
      expect(mockRepoWorkers.search).toHaveBeenCalled();
    });

    test('Then when the login is not successful because there is no data', async () => {
      const req = {
        body: {
          email: 'email',
          password: secretWord,
        },
      } as unknown as Request;
      mockRepoWorkers.search.mockResolvedValue([]);
      await controller.login(req, resp, next);
      expect(mockRepoWorkers.search).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    test('Then when the email is missing, next function will be called', async () => {
      const req = {
        body: {
          password: secretWord,
        },
      } as unknown as Request;
      mockRepoWorkers.search.mockRejectedValue('error');
      await controller.login(req, resp, next);
      expect(next).toHaveBeenCalled();
    });

    test('Then when the password is missing, next function will be called', async () => {
      const req = {
        body: {
          email: 'email',
        },
      } as unknown as Request;
      mockRepoWorkers.search.mockRejectedValue('error');
      await controller.login(req, resp, next);
      expect(next).toHaveBeenCalled();
    });

    test('Then if there is no data it should throw an HTTPError ', async () => {
      const req = {
        body: {
          email: 'email',
          password: secretWord,
        },
      } as unknown as Request;
      mockRepoWorkers.search.mockResolvedValue([]);
      await controller.login(req, resp, next);
      expect(mockRepoWorkers.search).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });

    test('Then it should throw an HTTPError if the password is ok', async () => {
      const req = {
        body: {
          email: 'email',
          password: secretWord,
        },
      } as unknown as Request;
      Auth.compare = jest.fn().mockResolvedValue(false);
      mockRepoWorkers.search.mockResolvedValue([{ password: secretWord }]);
      await controller.login(req, resp, next);
      expect(mockRepoWorkers.search).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When we use the register method', () => {
    test('Then when we have all the correct data, resp.json should have been called', async () => {
      const req = {
        body: {
          email: 'email',
          password: secretWord,
        },
      } as Request;
      await controller.register(req, resp, next);
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if there is not a password, next function should have been called', async () => {
      const req = {
        body: {
          email: 'email',
        },
      } as Request;
      await controller.register(req, resp, next);
      expect(next).toHaveBeenCalled();
    });

    test('Then if there is no email, next function should have been called', async () => {
      const req = {
        body: {
          password: secretWord,
        },
      } as Request;
      await controller.register(req, resp, next);
      expect(next).toHaveBeenCalled();
    });

    test('Then when there is no data, next function should have been called', async () => {
      const req = {
        body: {},
      } as Request;
      await controller.register(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });
});
