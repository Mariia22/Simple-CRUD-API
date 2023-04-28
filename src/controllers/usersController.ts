import { User, UserController, UserModel, httpStatusCode } from '../types';
import { IncomingMessage, ServerResponse } from 'http';

export class UsersController implements UserController {
  constructor(private userModel: UserModel) {}

  async getAll(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    const users = await this.userModel.getAll();
    this.sendResponse(users, res);
  }

  private sendResponse<T>(data: T, res: ServerResponse<IncomingMessage>, status: number = httpStatusCode.OK) {
    res.statusCode = status;
    res.end(JSON.stringify(data));
  }
}
