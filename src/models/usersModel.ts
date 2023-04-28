import { User, UserModel } from '../types';

export class UsersModel implements UserModel {
  constructor(private users: User[]) {}
  async getAll(): Promise<User[]> {
    return this.users;
  }
}
