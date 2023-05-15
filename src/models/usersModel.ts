import { v4 as uuidv4, validate } from 'uuid';
import { Api400Error } from '../errors/api400Error';
import { Api404Error } from '../errors/api404Error';
import { User, UserModel, UserRequest } from '../types';
import {
  printNotFoundMessage,
  printBodyBadRequestMessage,
  printBadRequestMessage,
  validateUserBody,
  printBodyBadFieldsMessage,
} from '../utils';
import { deletedMessage } from '../config';

export class UsersModel implements UserModel {
  constructor(private users: User[]) {}
  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getUserById(id: string) {
    if (validate(id)) {
      const user = this.users.find((user) => user.id === id);
      if (user) {
        return user;
      } else {
        throw new Api404Error(printNotFoundMessage(id));
      }
    } else {
      throw new Api400Error(printBadRequestMessage(id));
    }
  }

  async postUser(body: UserRequest) {
    if (validateUserBody(body)) {
      const newUser = { ...body, id: uuidv4() };
      this.users.push(newUser);
      return newUser;
    } else {
      throw new Api400Error(printBodyBadRequestMessage());
    }
  }

  async deleteUser(id: string) {
    if (!validate(id)) {
      throw new Api400Error(printBadRequestMessage(id));
    } else {
      const index: number = this.users.findIndex((user) => user.id === id);
      if (index >= 0) {
        this.users.splice(index, 1);
        return deletedMessage;
      } else {
        throw new Api404Error(printNotFoundMessage(id));
      }
    }
  }

  async updateUser(id: string, body: UserRequest) {
    if (!validate(id)) {
      throw new Api400Error(printBadRequestMessage(id));
    } else if (Object.keys(body).includes('id')) {
      throw new Api400Error(printBodyBadFieldsMessage());
    } else {
      const user = this.users.find((user) => user.id === id);
      if (!user) {
        throw new Api404Error(printNotFoundMessage(id));
      } else {
        const updatedUser = { ...user, ...body };
        this.users[this.users.indexOf(user)] = updatedUser;
        return updatedUser;
      }
    }
  }
}
