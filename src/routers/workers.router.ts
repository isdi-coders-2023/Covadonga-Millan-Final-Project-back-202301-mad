import createDebug from 'debug';
import { Router } from 'express';
import { WorkersController } from '../controllers/workers.controller.js';
import { WorkersMongoRepo } from '../repositories/workers/workers.mongo.repo.js';
const debug = createDebug('pet-hospital:router:workers');

// eslint-disable-next-line new-cap
export const workersRouter = Router();
debug('Loaded workers');

const repo = WorkersMongoRepo.getInstance();

const controller = new WorkersController(repo);

workersRouter.post('/login', controller.login.bind(controller));
workersRouter.post('/register', controller.register.bind(controller));
