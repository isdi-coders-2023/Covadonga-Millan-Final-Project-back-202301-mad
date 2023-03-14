import createDebug from 'debug';
import { Worker } from '../entities/worker.js';
import { RepoWorker } from './repo.interface.js';
import { WorkerModel } from './workers.mongo.model.js';
const debug = createDebug('pet-hospital:repo:users');

export class WorkersMongoRepo implements RepoWorker<Worker> {
  private static instance: WorkersMongoRepo;

  public static getInstance(): WorkersMongoRepo {
    if (!WorkersMongoRepo.instance) {
      WorkersMongoRepo.instance = new WorkersMongoRepo();
    }

    return WorkersMongoRepo.instance;
  }

  private constructor() {
    debug('Instantiate');
  }

  async create(info: Partial<Worker>): Promise<Worker> {
    debug('create');
    const data = await WorkerModel.create(info);
    return data;
  }
}
