import { IncomingMessage, ServerResponse } from 'http';
import { regexAPI, regexAPIId } from '../config';
import { Api404Error } from '../errors/api404Error';
import { printApiNotFoundMessage, printInternalErrorMessage } from '../utils';
import { BaseError } from '../errors';
import { Internal500Error } from '../errors/internal500Error';

export const router = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  res.setHeader('Content-Type', 'application/json');
  try {
    const { url, method } = req;
    if (!url.match(regexAPI) && !url.match(regexAPIId)) {
      throw new Api404Error(printApiNotFoundMessage(url));
    }
    res.end('ok');
  } catch (error) {
    const { message, statusCode } =
      error instanceof BaseError ? error : new Internal500Error(printInternalErrorMessage());
    res.statusCode = statusCode;
    res.end(JSON.stringify(message));
  }
};
