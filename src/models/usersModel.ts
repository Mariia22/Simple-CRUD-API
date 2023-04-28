import { Api404Error } from '../errors/api404Error';
import { User, UserModel } from '../types';
import { printNotFoundMessage } from '../utils';

export class UsersModel implements UserModel {
  constructor(private users: User[]) {}
  async getAll() {
    return this.users;
  }

  async getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (user) {
      return user;
    } else {
      throw new Api404Error(printNotFoundMessage(id));
    }
  }
}
