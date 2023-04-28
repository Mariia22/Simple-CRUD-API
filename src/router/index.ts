import { IncomingMessage, ServerResponse } from 'http';
import { regexAPI, regexAPIId } from '../config';
import { Api404Error } from '../errors/api404Error';
import { printApiNotFoundMessage, printInternalErrorMessage } from '../utils';
import { BaseError } from '../errors';
import { Internal500Error } from '../errors/internal500Error';
import { httpMethods } from '../types';
import { UsersController } from '../controllers/usersController';
import { UsersModel } from '../models/usersModel';

export const router = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
  const model = new UsersModel([{ id: '1', username: 'Mariia', age: 33, hobbies: [] }]);
  const controller = new UsersController(model);
  res.setHeader('Content-Type', 'application/json');
  try {
    const { url, method } = req;
    if (!url.match(regexAPI) && !url.match(regexAPIId)) {
      throw new Api404Error(printApiNotFoundMessage(url));
    }
    switch (method) {
      case httpMethods.GET:
        if (url.match(regexAPIId)) {
          controller.getUserById(req, res);
        } else {
          controller.getAll(req, res);
        }
    }
  } catch (error) {
    const { message, statusCode } =
      error instanceof BaseError ? error : new Internal500Error(printInternalErrorMessage());
    res.statusCode = statusCode;
    res.end(JSON.stringify(message));
  }
};
