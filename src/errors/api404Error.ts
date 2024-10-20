import { BaseError } from './index.ts';
import { httpStatusCode } from '../types/index.ts';

export class Api404Error extends BaseError {
  constructor(message: string, statusCode = httpStatusCode.NOT_FOUND) {
    super(message, statusCode);
  }
}
