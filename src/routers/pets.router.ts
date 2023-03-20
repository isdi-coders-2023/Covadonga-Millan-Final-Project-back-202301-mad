/* eslint-disable new-cap */
import createDebug from 'debug';
import { Router } from 'express';
import { PetsController } from '../controllers/pets/pets.controller';
import { logged } from '../interceptors/logged';
import { PetsMongoRepo } from '../repositories/pets/pets.mongo.repo';
const debug = createDebug('pet-hospital:router:pets');

export const petsRouter = Router();
debug('Loaded pets');

const repo = new PetsMongoRepo();
const controller = new PetsController(repo);
petsRouter.post('/', logged, controller.create.bind(controller));
petsRouter.patch('/discharge/:id', logged, controller.update.bind(controller));
petsRouter.patch('/:id', logged, controller.update.bind(controller));
petsRouter.delete('/:id', logged, controller.delete.bind(controller));
petsRouter.get('/owners/:owner', logged, controller.findOwner.bind(controller));
petsRouter.get('/:id', logged, controller.find.bind(controller));
petsRouter.get('/', logged, controller.query.bind(controller));
