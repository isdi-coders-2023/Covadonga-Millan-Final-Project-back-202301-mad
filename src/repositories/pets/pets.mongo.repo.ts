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
    debug('Get all pets');
    const data = await PetModel.find();
    return data;
  }

  async findOwner(ownerElement: string): Promise<Pet[]> {
    debug('Find owner pet');
    const data = await PetModel.find({ owner: ownerElement });
    return data;
  }

  async find(id: string): Promise<Pet> {
    debug('Find: ' + id);
    const data = await PetModel.findById(id);

    if (!data)
      throw new HTTPError(404, 'Id not found', 'Id not found while doing find');
    return data;
  }

  async create(info: Partial<Pet>): Promise<Pet> {
    debug('Create pet');
    const data = await PetModel.create(info);
    return data;
  }

  async update(info: Partial<Pet>): Promise<Pet> {
    debug('Update ' + info.name);
    const data = await PetModel.findByIdAndUpdate(info.id, info, {
      new: true,
    });
    if (!data) throw new HTTPError(404, 'Not found!', 'Not found in update!');
    return data;
  }

  async delete(id: string): Promise<void> {
    debug('Delete: ' + id);
    const data = await PetModel.findByIdAndDelete(id);
    if (!data) throw new HTTPError(404, 'Delete not possible', 'Id not found');
  }
}
