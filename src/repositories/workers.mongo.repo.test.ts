import { WorkerModel } from './workers.mongo.model';
import { WorkersMongoRepo } from './workers.mongo.repo';

jest.mock('./workers.mongo.model');

describe('Given WorkersMongoRepo', () => {
  const repo = WorkersMongoRepo.getInstance();
  const exec = jest.fn();
  beforeEach(() => {
    exec.mockResolvedValue([]);
    WorkerModel.find = jest.fn().mockReturnValue({
      populate: jest.fn().mockReturnValue({
        exec,
      }),
    });
  });

  describe('When it is instantiated', () => {
    test('Then it should be able to be instanced.', () => {
      expect(repo).toBeInstanceOf(WorkersMongoRepo);
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
