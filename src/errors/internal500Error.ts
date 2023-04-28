import { BaseError } from '.';
import { httpStatusCode } from '../types';

export class Internal500Error extends BaseError {
  constructor(message: string, statusCode = httpStatusCode.INTERNAL_SERVER) {
    super(message, statusCode);
  }
}
