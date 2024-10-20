import { IncomingMessage, ServerResponse } from 'http';
import { regexAPI, regexAPIId } from '../config/index.ts';
import { Api404Error } from '../errors/api404Error.ts';
import { printApiNotFoundMessage, printInternalErrorMessage } from '../utils.ts';
import { BaseError } from '../errors/index.ts';
import { Internal500Error } from '../errors/internal500Error.ts';
import { httpMethods } from '../types/index.ts';
import { UsersController } from '../controllers/usersController.ts';
import { UsersModel } from '../models/usersModel.ts';

export const router = () => {
  const model = new UsersModel([]);
  const controller = new UsersController(model);

  return async (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    res.setHeader('Content-Type', 'application/json');
    try {
      const { url, method } = req;
      if (!url.match(regexAPI) && !url.match(regexAPIId)) {
        throw new Api404Error(printApiNotFoundMessage(url));
      }
      switch (method) {
        case httpMethods.GET:
          if (url.match(regexAPIId)) {
            await controller.getUserById(req, res);
          } else {
            await controller.getAll(req, res);
          }
          break;
        case httpMethods.POST:
          await controller.postUser(req, res);
          break;
        case httpMethods.DELETE:
          await controller.deleteUser(req, res);
          break;
        case httpMethods.PUT:
          await controller.updateUser(req, res);
          break;
      }
    } catch (error) {
      const { message, statusCode } =
        error instanceof BaseError ? error : new Internal500Error(printInternalErrorMessage());
      res.statusCode = statusCode;
      res.end(JSON.stringify(message));
    }
  };
};
