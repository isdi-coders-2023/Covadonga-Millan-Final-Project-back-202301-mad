import { CustomError, HTTPError } from './httpError.js';

describe('Given the HttpError class', () => {
  let error: CustomError;
  beforeEach(() => {
    error = new HTTPError(420, 'test', 'test2');
  });
  describe('When we throw a new HTTPError', () => {
    test('Then Error should be instantiated', () => {
      expect(error).toBeInstanceOf(Error);
    });
    test('Then HTTPError should be instantiated', () => {
      expect(error).toBeInstanceOf(HTTPError);
    });
    test('Then the error should have the status code number', () => {
      expect(error).toHaveProperty('statusCode', 420);
    });
    test('Then the error should have the status message', () => {
      expect(error).toHaveProperty('statusMessage', 'test');
    });
    test('Then the error should have the message', () => {
      expect(error).toHaveProperty('message', 'test2');
    });
    test('Then the error should have the status name', () => {
      expect(error).toHaveProperty('name', 'HTTPError');
    });
  });
});
