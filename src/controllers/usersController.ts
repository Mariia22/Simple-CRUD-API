import { UserController, UserModel, httpStatusCode } from '../types';
import { IncomingMessage, ServerResponse } from 'http';
import { getBodyFromReq, getIdFromURL } from '../utils';

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

  async postUser(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    try {
      const body = await getBodyFromReq(req);
      const user = await this.userModel.postUser(body);
      this.sendResponse(user, res, httpStatusCode.CREATED);
    } catch (error) {
      const { message, statusCode } = error;
      this.sendResponse(message, res, statusCode);
    }
  }

  async deleteUser(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    try {
      const id = getIdFromURL(req.url);
      const result = await this.userModel.deleteUser(id);
      this.sendResponse(result, res, httpStatusCode.DELETED);
    } catch (error) {
      const { message, statusCode } = error;
      this.sendResponse(message, res, statusCode);
    }
  }

  async updateUser(req: IncomingMessage, res: ServerResponse<IncomingMessage>) {
    try {
      const id = getIdFromURL(req.url);
      const body = await getBodyFromReq(req);
      const user = await this.userModel.updateUser(id, body);
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
