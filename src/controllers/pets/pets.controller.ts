import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { Pet } from '../../entities/pet.js';
import { HTTPError } from '../../errors/httpError.js';
import { RequestPlus } from '../../interceptors/logged.js';
import { RepoPet } from '../../repositories/pets/repoPet.interface.js';
const debug = createDebug('pet-hospital:controller:pets');

export class PetsController {
  constructor(public repo: RepoPet<Pet>) {
    debug('Instantiate pets controller');
  }

  async queryPets(_req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Get all pets');
      const data = await this.repo.queryPets();
      if (!data) throw new HTTPError(404, 'Not found', 'Pets not found');

      resp.status(201);
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async findPet(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Find pet');
      if (!req.params.id)
        throw new HTTPError(400, 'Bad request', 'Pet MRN not found');

      const data = await this.repo.findPet(req.params.id);
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async findOwner(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Find owner pets');
      const data = await this.repo.findOwner(req.params.owner);
      if (!data) throw new HTTPError(404, 'Not found', 'Pets not found');
      resp.status(201);
      resp.json({
        results: data,
      });
    } catch (error) {
      next(error);
    }
  }

  async createPet(req: RequestPlus, resp: Response, next: NextFunction) {
    try {
      debug('Create pet');
      if (
        !req.body.name ||
        !req.body.kg ||
        !req.body.age ||
        !req.body.owner ||
        !req.body.phone ||
        !req.body.email
      )
        throw new HTTPError(400, 'Bad request', 'Unable to create the pet');
      const data = await this.repo.createPet(req.body);
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePet(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Update pet');
      if (!req.params.id)
        throw new HTTPError(400, 'Bad request', 'Pet MRN not found');
      req.body.id = req.params.id;

      const data = await this.repo.updatePet(req.body);
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePet(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Delete pet');
      if (!req.params.id)
        throw new HTTPError(400, 'Bad request', 'Pet MRN not found');
      await this.repo.deletePet(req.params.id);
      resp.status(201);
      resp.json({
        results: [],
      });
    } catch (error) {
      next(error);
    }
  }
}
