import { PayloadToken, Auth } from './auth.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
jest.mock('jsonwebtoken');
jest.mock('bcryptjs');

describe('Given the Auth class', () => {
  describe('When we use the createJWT method', () => {
    test('Then the jwt.sign function has to be called', () => {
      const payload = {} as PayloadToken;
      Auth.createJWT(payload);
      expect(jwt.sign).toHaveBeenCalled();
    });
  });
  describe('When we use the verifyJWTGettingPayload method', () => {
    test('Then the jwt.verify function has to be called', () => {
      (jwt.verify as jest.Mock).mockReturnValue({});
      Auth.verifyJWTGettingPayload('mockToken');
      expect(jwt.verify).toHaveBeenCalled();
    });
  });
  describe('When we use the verifyJWTGettingPayload method and the token is not valid', () => {
    test('Then the jwt.verify function has to throw an error', () => {
      (jwt.verify as jest.Mock).mockReturnValue('invalid token');
      expect(() => Auth.verifyJWTGettingPayload('mockToken')).toThrow();
    });
  });
  describe('When we use the hash method', () => {
    test('Then the bcrypt.hash function has to be called', async () => {
      await Auth.hash('value');
      expect(bcrypt.hash).toHaveBeenCalled();
    });
  });
  describe('When we use the compare method', () => {
    test('Then the bcrypt.compare function has to be called', async () => {
      await Auth.compare('value', 'hash');
      expect(bcrypt.compare).toHaveBeenCalled();
    });
  });
});
