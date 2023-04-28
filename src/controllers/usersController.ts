import { Api404Error } from './../errors/api404Error';
import { User, UserController, UserModel, httpStatusCode } from '../types';
import { IncomingMessage, ServerResponse } from 'http';
import { getIdFromURL, printNotFoundMessage } from '../utils';

export class UsersController implements UserController {
  constructor(private userModel: UserModel) {}

  async getAll(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const users = await this.userModel.getAll();
    this.sendResponse(users, res);
  }

  async getUserById(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    try {
      const id = getIdFromURL(req.url);
      const user = await this.userModel.getUserById(id);
      this.sendResponse(user, res);
    } catch (error) {
      const { message, statusCode } = error;
      this.sendResponse(message, res, statusCode);
    }
  }

  private sendResponse<T>(data: T, res: ServerResponse<IncomingMessage>, status: number = httpStatusCode.OK) {
    res.statusCode = status;
    res.end(JSON.stringify(data));
  }
}
