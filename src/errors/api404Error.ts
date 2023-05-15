import { BaseError } from '.';
import { httpStatusCode } from '../types';

export class Api404Error extends BaseError {
  constructor(message: string, statusCode = httpStatusCode.NOT_FOUND) {
    super(message, statusCode);
  }
}
