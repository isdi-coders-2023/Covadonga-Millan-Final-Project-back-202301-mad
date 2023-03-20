import { Pet } from '../../entities/pet.js';
import { PetModel } from './pets.mongo.model.js';
import { PetsMongoRepo } from './pets.mongo.repo.js';

jest.mock('./pets.mongo.model.ts');

describe('Given the pets repository', () => {
  const repo = new PetsMongoRepo();

  describe('When we instantiate the repo', () => {
    test('Then it should not be any problems', () => {
      expect(repo).toBeInstanceOf(PetsMongoRepo);
    });
  });

  describe('When we use the query method', () => {
    test('Then it should return all de pets', async () => {
      (PetModel.find as jest.Mock).mockResolvedValue([]);
      await repo.query();
      expect(PetModel.find).toHaveBeenCalled();
    });
  });

  describe(`When we use the find owner method`, () => {
    test('Then it should return all pets with given key/value', async () => {
      (PetModel.find as jest.Mock).mockResolvedValue([]);
      await repo.findOwner('owner');
      expect(PetModel.find).toHaveBeenCalled();
    });
  });

  describe(`When we use the find method`, () => {
    test('Then it should return a pet with a specific id', async () => {
      (PetModel.findById as jest.Mock).mockResolvedValue([]);
      await repo.find('id');
      expect(PetModel.findById).toHaveBeenCalled();
    });

    test('Then it should throw an error if it does not find the id', async () => {
      (PetModel.findById as jest.Mock).mockImplementation();
      expect(async () => repo.find('1')).rejects.toThrow();
    });
  });

  describe(`When we use the create method`, () => {
    test('Then it should return a new pet', async () => {
      (PetModel.create as jest.Mock).mockResolvedValue({
        name: 'perro',
      });
      const newPet = {
        name: 'perro',
      };
      const result = await repo.create(newPet);
      expect(result).toEqual(newPet);
    });
  });

  describe(`When we use the update method`, () => {
    test('Then it should return an updated pet', async () => {
      (PetModel.findByIdAndUpdate as jest.Mock).mockResolvedValue([]);
      await repo.update({} as Pet);
      expect(PetModel.findByIdAndUpdate).toHaveBeenCalled();
    });

    test('Then it should throw an error if the id given does not exist', async () => {
      (PetModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(undefined);
      const result = repo.update({});
      await expect(result).rejects.toThrow();
    });
  });

  describe(`When we use the delete method`, () => {
    test('Then it should delete a pet', async () => {
      (PetModel.findByIdAndDelete as jest.Mock).mockResolvedValue([]);
      await repo.delete('id');
      expect(PetModel.findByIdAndDelete).toHaveBeenCalled();
    });

    test('Then it should throw an error if the id does not exist', async () => {
      (PetModel.findByIdAndDelete as jest.Mock).mockResolvedValue(undefined);
      const result = repo.delete('1');
      await expect(result).rejects.toThrow();
    });
  });
});
