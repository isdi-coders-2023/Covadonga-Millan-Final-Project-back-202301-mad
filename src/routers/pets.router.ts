/* eslint-disable new-cap */
import createDebug from 'debug';
import { Router } from 'express';
import { PetsController } from '../controllers/pets/pets.controller.js';
import { logged } from '../interceptors/logged.js';
import { PetsMongoRepo } from '../repositories/pets/pets.mongo.repo.js';
const debug = createDebug('pet-hospital:router:pets');

export const petsRouter = Router();
debug('Loaded pets');

const repo = new PetsMongoRepo();
const controller = new PetsController(repo);
petsRouter.post('/create', logged, controller.createPet.bind(controller));
petsRouter.patch(
  '/discharge/:id',
  logged,
  controller.updatePet.bind(controller)
);
petsRouter.patch('/:id', logged, controller.updatePet.bind(controller));
petsRouter.delete('/:id', logged, controller.deletePet.bind(controller));
petsRouter.get('/owners/:owner', logged, controller.findOwner.bind(controller));
petsRouter.get('/:id', logged, controller.findPet.bind(controller));
petsRouter.get('/', logged, controller.queryPets.bind(controller));
