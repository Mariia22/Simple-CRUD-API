import { BaseError } from '.';
import { httpStatusCode } from '../types';

export class Api400Error extends BaseError {
  constructor(message: string, statusCode = httpStatusCode.BAD_REQUEST) {
    super(message, statusCode);
  }
}
