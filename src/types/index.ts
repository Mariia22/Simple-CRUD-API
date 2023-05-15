import { IncomingMessage, ServerResponse } from 'http';

export const httpMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

export const httpStatusCode = {
  OK: 200,
  CREATED: 201,
  DELETED: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
} as const;

type controllerHandler = (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => Promise<void>;

export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
};

export type UserRequest = Pick<User, 'username' | 'age' | 'hobbies'>;

export interface UserController {
  getAll: controllerHandler;
  getUserById: controllerHandler;
  postUser: controllerHandler;
  deleteUser: controllerHandler;
  // updateUser: controllerHandler;
}

export interface UserModel {
  getAll: () => Promise<User[]>;
  getUserById: (id: string) => Promise<User>;
  postUser: (user: UserRequest | {}) => Promise<User>;
  deleteUser: (id: string)=> Promise<string>;
  // updateUser: (id: string)=>Promise<User>;
}
