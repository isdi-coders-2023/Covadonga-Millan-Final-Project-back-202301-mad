import { WorkerModel } from './workers.mongo.model.js';
import { WorkersMongoRepo } from './workers.mongo.repo.js';

jest.mock('./workers.mongo.model');

describe('Given WorkersMongoRepo', () => {
  const repo = WorkersMongoRepo.getInstance();

  describe('When it is instantiated', () => {
    test('Then it should be able to be instanced.', () => {
      expect(repo).toBeInstanceOf(WorkersMongoRepo);
    });
  });

  describe('When we call the search() method', () => {
    test('Then if it has an mock query object, it should return find resolved value', async () => {
      const mockValue = [{ id: '1' }];
      (WorkerModel.find as jest.Mock).mockResolvedValue(mockValue);

      const mockTest = {
        key: 'email',
        value: 'cova.millan@jeje.com',
      };
      const result = await repo.search(mockTest);
      expect(result).toEqual([{ id: '1' }]);
    });
  });

  describe('When we call the create() method with an empty object', () => {
    test('Then it should return an empty object.', async () => {
      (WorkerModel.create as jest.Mock).mockResolvedValue({});
      const result = await repo.create({});
      expect(result).toEqual({});
    });
  });
});
