/* eslint-disable new-cap */
import createDebug from 'debug';
import { Router } from 'express';
import { PetsMongoRepo } from '../repositories/pets/pets.mongo.repo';
const debug = createDebug('pet-hospital:router:pets');

export const petsRouter = Router();
debug('Loaded pets');

const repo = new PetsMongoRepo();
//  A const controller = new PetsController(repo)
// petsRouter.post('/', logged, controller.post.bind(controller));
// petsRouter.get('/', logged, controller.getAll.bind(controller));
// petsRouter.patch('/discharge/:id', logged, controller.discharge.bind(controller));
// petsRouter.get('/:id', logged, controller.get.bind(controller));
// petsRouter.patch('/:id', logged, controller.patch.bind(controller));
// petsRouter.delete('/:id', logged, controller.delete.bind(controller));
