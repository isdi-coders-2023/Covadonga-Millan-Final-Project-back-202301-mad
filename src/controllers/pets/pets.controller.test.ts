import { Request, Response } from 'express';
import { Pet } from '../../entities/pet';
import { RepoPet } from '../../repositories/pets/repoPet.interface';
import { PetsController } from './pets.controller';

describe('Given the pets controller', () => {
  const mockRepoPets = {
    query: jest.fn(),
    findOwner: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as RepoPet<Pet>;

  const controller = new PetsController(mockRepoPets);

  const resp = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;

  const next = jest.fn();

  describe('When we use the query method', () => {
    test('Then it should get all the pets', async () => {
      const req = {} as unknown as Request;
      (mockRepoPets.query as jest.Mock).mockResolvedValue(['e']);
      await controller.query(req, resp, next);
      expect(mockRepoPets.query).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if the method does not work, it should throw an error', async () => {
      const req = {} as unknown as Request;
      (mockRepoPets.query as jest.Mock).mockResolvedValue(undefined);
      await controller.query(req, resp, next);
      expect(mockRepoPets.query).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When we use the find owner method', () => {
    test('Then if the method works, it should bring an specific pet', async () => {
      const req = {
        params: { ownerElement: 'owner' },
      } as unknown as Request;
      await controller.findOwner(req, resp, next);
      expect(mockRepoPets.findOwner).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if it does not work, it should throw an error', async () => {
      const req = {
        params: { ownerElement: undefined },
      } as unknown as Request;
      (mockRepoPets.findOwner as jest.Mock).mockResolvedValue([]);
      await controller.findOwner(req, resp, next);
      expect(mockRepoPets.findOwner).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When we use the find method', () => {
    test('Then if everything is okay, it should call the method', async () => {
      const req = {
        params: { id: '420' },
      } as unknown as Request;
      await controller.find(req, resp, next);
      expect(mockRepoPets.find).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if something is wrong it should throw an error', async () => {
      const req = {
        params: { id: '' },
      } as unknown as Request;
      (mockRepoPets.find as jest.Mock).mockResolvedValue([]);
      await controller.find(req, resp, next);
      expect(mockRepoPets.find).toHaveBeenCalled();
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When we use the create method', () => {
    test('Then it should call the create function', async () => {
      const req = {
        params: {
          name: 'firulais',
          kg: 2,
          age: 3,
          species: 'dog',
          breed: 'chihuahua',
          owner: 'un tipo',
          phone: [6, 7],
          email: 'emilio@emilio',
          gender: 'gender fluid',
        },
      } as unknown as Request;
      await controller.create(req, resp, next);
      expect(mockRepoPets.create).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if the request is not okay, it should throw an error', async () => {
      const req = {
        params: {
          name: 'firulais',
          kg: 2,
        },
      } as unknown as Request;
      (mockRepoPets.create as jest.Mock).mockResolvedValue([]);
      await controller.create(req, resp, next);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When we use the update method', () => {
    test('Then it should call the method when we give an id', async () => {
      const req = {
        body: { id: '1' },
        params: { id: '1' },
      } as unknown as Request;
      await controller.update(req, resp, next);
      expect(mockRepoPets.update).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });

    test('Then if it does not find the id, it should throw an error', async () => {
      const req = {
        params: {
          id: '',
        },
      } as unknown as Request;
      await controller.update(req, resp, next);
      (mockRepoPets.find as jest.Mock).mockResolvedValue([]);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('When we use the delete method', () => {
    test('Then if it finds the id, it should call the method', async () => {
      const req = {
        params: {
          id: '2',
        },
      } as unknown as Request;
      await controller.delete(req, resp, next);
      expect(mockRepoPets.delete).toHaveBeenCalled();
      expect(resp.json).toHaveBeenCalled();
    });
    test('Then if there is no id, it should throw an error', async () => {
      const req = {
        params: { id: '' },
      } as unknown as Request;
      await controller.delete(req, resp, next);
      (mockRepoPets.delete as jest.Mock).mockResolvedValue([]);
      expect(next).toHaveBeenCalled();
    });
  });
});
