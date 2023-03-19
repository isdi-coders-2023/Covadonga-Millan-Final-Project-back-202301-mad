import createDebug from 'debug';
import { Pet } from '../../entities/pet.js';
import { HTTPError } from '../../errors/httpError.js';
import { PetModel } from './pets.mongo.model.js';
import { RepoPet } from './repoPet.interface.js';
const debug = createDebug('pet-hospital:repo-pets');

export class PetsMongoRepo implements RepoPet<Pet> {
  public constructor() {
    debug('Instantiate pet');
  }

  async query(): Promise<Pet[]> {
    const data = await PetModel.find();
    return data;
  }

  async queryId(id: string): Promise<Pet> {
    debug('queryId: ' + id);
    const data = await PetModel.findById(id);

    if (!data)
      throw new HTTPError(
        404,
        'Id not found',
        'Id not found while doing queryId'
      );
    return data;
  }

  async search(query: { key: string; value: unknown }) {
    debug('search pet');
    const data = await PetModel.find({
      [query.key]: query.value,
    });
    return data;
  }

  async create(info: Partial<Pet>): Promise<Pet> {
    debug('create pet');
    const data = await PetModel.create(info);
    return data;
  }

  async update(info: Partial<Pet>): Promise<Pet> {
    debug('update ' + info.name);
    const data = await PetModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data) throw new HTTPError(404, 'Not found!', 'Not found in update!');
    return data;
  }

  async delete(id: string): Promise<void> {
    debug('delete: ' + id);
    const data = await PetModel.findByIdAndDelete(id);
    if (!data) throw new HTTPError(404, 'Delete not possible', 'Id not found');
  }
}
