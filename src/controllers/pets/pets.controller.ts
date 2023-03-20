import createDebug from 'debug';
import { NextFunction, Request, Response } from 'express';
import { Pet } from '../../entities/pet';
import { HTTPError } from '../../errors/httpError';
import { RequestPlus } from '../../interceptors/logged';
import { RepoPet } from '../../repositories/pets/repoPet.interface.js';
const debug = createDebug('pet-hospital:controller:pets');

export class PetsController {
  constructor(public repo: RepoPet<Pet>) {
    debug('Instantiate pets controller');
  }

  async query(_req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Get all pets');
      const data = await this.repo.query();
      if (!data) throw new HTTPError(404, 'Not found', 'Pets not found');

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
      const data = await this.repo.findOwner(req.params.ownerElement);
      if (!data) throw new HTTPError(404, 'Not found', 'Pets not found');
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async find(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Find pet');
      if (!req.params.id)
        throw new HTTPError(400, 'Bad request', 'Pet NHC not found');

      const data = await this.repo.find(req.params.id);
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: RequestPlus, resp: Response, next: NextFunction) {
    try {
      debug('Create pet');
      if (
        !req.params.name ||
        !req.params.kg ||
        !req.params.age ||
        !req.params.species ||
        !req.params.breed ||
        !req.params.owner ||
        !req.params.phone ||
        !req.params.email ||
        !req.params.gender
      )
        throw new HTTPError(400, 'Bad request', 'Unable to create the pet');
      const data = await this.repo.create(req.body);
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Update pet');
      req.body.id = req.params.id ? req.params.id : req.body.id;
      const data = await this.repo.update(req.body);
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Delete pet');
      await this.repo.delete(req.params.id);
      resp.status(201);
      resp.json({
        results: [],
      });
    } catch (error) {
      next(error);
    }
  }
}
