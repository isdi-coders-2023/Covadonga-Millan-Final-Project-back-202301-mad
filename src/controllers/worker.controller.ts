import createDebug from 'debug';
import { Request, NextFunction, Response } from 'express';
import { Worker } from '../entities/worker.js';
import { HTTPError } from '../errors/httpError.js';
import { Auth, PayloadToken } from '../helpers/auth.js';
import { RepoWorker } from '../repositories/repoWorker.interface.js';
import { WorkerModel } from '../repositories/workers.mongo.model.js';
const debug = createDebug('pet:hospital:workers');

export class WorkerController {
  constructor(public repo: RepoWorker<Worker>) {
    debug('Instantiate');
  }

  async search(query: { key: string; value: unknown }): Promise<Worker[]> {
    debug('Search');
    const data = await WorkerModel.find({ [query.key]: query.value });
    return data;
  }

  async login(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('Login:post');
      if (!req.body.email || !req.body.password)
        throw new HTTPError(401, 'Unauthorized', 'Invalid email or password');
      const data = await this.repo.search({
        key: 'email',
        value: req.body.email,
      });
      if (!data.length)
        throw new HTTPError(401, 'Unauthorized', 'Email not found');
      if (!(await Auth.compare(req.body.password, data[0].password)))
        throw new HTTPError(401, 'Unauthorized', 'Password does not match');
      const payload: PayloadToken = {
        id: data[0].id,
        email: data[0].email,
      };
      const token = Auth.createJWT(payload);
      resp.status(202);
      resp.json({
        token,
      });
    } catch (error) {
      next(error);
    }
  }
}
