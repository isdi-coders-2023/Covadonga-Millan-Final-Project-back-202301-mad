import createDebug from 'debug';
import { Request, NextFunction, Response } from 'express';
import { HTTPError } from '../errors/httpError.js';
import { Auth, PayloadToken } from '../helpers/auth.js';
import { WorkersMongoRepo } from '../repositories/workers.mongo.repo.js';
const debug = createDebug('pet-hospital:workers');

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

      console.log(data, req.body);

      if (!data.length)
        throw new HTTPError(401, 'Unauthorized', 'Email not found');

      // A if (!(await Auth.compare(req.body.password, data[0].password)))

      if (req.body.password !== data[0].password)
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
