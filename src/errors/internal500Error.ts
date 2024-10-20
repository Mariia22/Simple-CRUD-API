import { BaseError } from './index.ts';
import { httpStatusCode } from '../types/index.ts';

export class Internal500Error extends BaseError {
  constructor(message: string, statusCode = httpStatusCode.INTERNAL_SERVER) {
    super(message, statusCode);
  }
}
