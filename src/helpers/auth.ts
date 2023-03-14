import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import createDebug from 'debug';
import { config } from '../config.js';
import { HTTPError } from '../errors/httpError.js';
const debug = createDebug('pet-hospital:helpers:auth');
debug('Loaded static class');

export interface PayloadToken extends jwt.JwtPayload {
  id: string;
  email: string;
}

const salt = 10;

export abstract class Auth {
  static createJWT(payload: PayloadToken) {
    return jwt.sign(payload, config.jwtSecret as string);
  }

  static verifyJWTGettingPayload(token: string) {
    const result = jwt.verify(token, config.jwtSecret as string);
    if (typeof result === 'string')
      throw new HTTPError(498, 'Invalid payload', result);
    return result as PayloadToken;
  }

  static hash(value: string): Promise<string> {
    return bcrypt.hash(value, salt);
  }

  static compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
