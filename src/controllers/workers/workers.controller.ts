import createDebug from 'debug';
import { Request, NextFunction, Response } from 'express';
import { HTTPError } from '../../errors/httpError.js';
import { Auth, PayloadToken } from '../../helpers/auth.js';
import { WorkersMongoRepo } from '../../repositories/workers/workers.mongo.repo.js';
const debug = createDebug('pet-hospital:workers-controller');

export class WorkersController {
  constructor(public repo: WorkersMongoRepo) {
    debug('Instantiate');
  }

  async login(req: Request, resp: Response, next: NextFunction) {
    try {
      // eslint-disable-next-line no-debugger
      debug('Login:post');
      debug(req.body.email);
      debug(req.body.password);

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
      debug('data', data);
      const loggedWorker = data[0];
      loggedWorker.token = token;

      resp.status(202);
      resp.json({
        results: loggedWorker.token,
      });
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, resp: Response, next: NextFunction) {
    try {
      debug('register:post');
      if (!req.body.email || !req.body.password)
        throw new HTTPError(401, 'Unauthorized', 'Invalid Email or password');
      req.body.password = await Auth.hash(req.body.password);
      req.body.things = [];
      const data = await this.repo.create(req.body);
      resp.status(201);
      resp.json({
        results: [data],
      });
    } catch (error) {
      next(error);
    }
  }
}
