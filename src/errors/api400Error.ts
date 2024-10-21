import { BaseError } from './index.ts';
import { httpStatusCode } from '../types/index.ts';

export class Api400Error extends BaseError {
  constructor(message: string, statusCode = httpStatusCode.BAD_REQUEST) {
    super(message, statusCode);
  }
}
