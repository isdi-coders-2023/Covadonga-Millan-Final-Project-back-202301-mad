/* eslint-disable new-cap */
import createDebug from 'debug';
import { Router } from 'express';
import { PetsMongoRepo } from '../repositories/pets/pets.mongo.repo';
const debug = createDebug('pet-hospital:router:pets');

export const petsRouter = Router();
debug('Loaded pets');

const repo = new PetsMongoRepo();
//  A const controller = new PetsController(repo)
// petsRouter.post('/', controller.post.bind(controller));
// petsRouter.get('/', controller.getAll.bind(controller));
// petsRouter.get('/:id', controller.get.bind(controller));
// petsRouter.patch('/:id', controller.patch.bind(controller));
// petsRouter.patch('/discharge', controller.discharge.bind(controller));
// petsRouter.delete('/:id', controller.delete.bind(controller));
