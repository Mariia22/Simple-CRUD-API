import { server } from '..';
import { UserRequest, httpStatusCode } from '../types';
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

const userData: UserRequest = {
  username: 'Mariia',
  age: 33,
  hobbies: ['Coding'],
};

const newUserData: UserRequest = {
  username: 'Mariia',
  age: 34,
  hobbies: ['Coding', 'Painting'],
};

const nonCorrectUserData = {
  username: 'Mariia',
};

const getUsers = async () => {
  const users = await request(server).get('/api/users');
  const [user] = users.body;
  const { id } = user;
  return id;
};

describe('Users tests', () => {
  afterAll(() => {
    server.close();
  });

  describe('Scenario#1: users api', () => {
    it('should return all records', async () => {
      await request(server).get('/api/users').expect(httpStatusCode.OK, []);
    });

    it('should create a new user', async () => {
      const response = await request(server).post('/api/users').send(userData);
      expect(response.statusCode).toBe(httpStatusCode.CREATED);
      expect(response.body).toEqual({ ...userData, id: response.body.id });
    });

    it('should return created user', async () => {
      const response = await request(server).get('/api/users');
      expect(response.statusCode).toBe(httpStatusCode.OK);
      expect(response.body).toStrictEqual([{ ...userData, id: expect.any(String) }]);
    });

    it('should update user', async () => {
      const id = await getUsers();
      const response = await request(server).put(`/api/users/${id}`).send(newUserData);
      expect(response.statusCode).toBe(httpStatusCode.OK);
      expect(response.body).toStrictEqual({ ...newUserData, id: expect.any(String) });
    });

    it('should return data by id', async () => {
      const id = await getUsers();
      const response = await request(server).get(`/api/users/${id}`).send(newUserData);
      expect(response.statusCode).toBe(httpStatusCode.OK);
      expect(response.body).toStrictEqual({ ...newUserData, id: expect.any(String) });
    });

    it('should delete data by id', async () => {
      const id = await getUsers();
      const response = await request(server).delete(`/api/users/${id}`);
      expect(response.statusCode).toBe(httpStatusCode.DELETED);
    });

    it('should return empty records', async () => {
      await request(server).get('/api/users').expect(httpStatusCode.OK, []);
    });
  });

  describe('Scenario#2: test bad requests (400 error) cases', () => {
    it('should return 400 when user id is invalid (method: get)', async () => {
      await request(server)
        .get('/api/users/someInvalidId')
        .expect(httpStatusCode.BAD_REQUEST, `"User's id: someInvalidId is invalid."`);
    });

    it('should return 400 when user id is invalid (method: put)', async () => {
      await request(server)
        .put('/api/users/someInvalidId')
        .expect(httpStatusCode.BAD_REQUEST, `"User's id: someInvalidId is invalid."`);
    });

    it('should return 400 when user id is invalid (method: delete)', async () => {
      await request(server)
        .delete('/api/users/someInvalidId')
        .expect(httpStatusCode.BAD_REQUEST, `"User's id: someInvalidId is invalid."`);
    });

    it('should return 400 when body does not contain required fields', async () => {
      const response = await request(server).post('/api/users').send(nonCorrectUserData);
      expect(response.statusCode).toBe(httpStatusCode.BAD_REQUEST);
      expect(response.body).toEqual("Body does not contain required fields.");
    });
  });

  describe('Scenario#3: test not found requests (404 error) cases', () => {
    const validId = uuidv4();
    it('should return 404 when endpoint does not exist', async () => {
      await request(server).get('/api/not-api').expect(httpStatusCode.NOT_FOUND, `"Api: /api/not-api is not found."`);
    });

    it('should return 404 when request unvailable method', async () => {
      await request(server).patch('/api/not-api').expect(httpStatusCode.NOT_FOUND, `"Api: /api/not-api is not found."`);
    });

    it('should create a new user', async () => {
      const response = await request(server).post('/api/users').send(userData);
      expect(response.statusCode).toBe(httpStatusCode.CREATED);
      expect(response.body).toEqual({ ...userData, id: response.body.id });
    });

    it('should return 404 when id does not exist (method: get)', async () => {
      await request(server)
        .get(`/api/users/${validId}`)
        .expect(httpStatusCode.NOT_FOUND, `"User with id: ${validId} is not found."`);
    });

    it('should return 404 when id does not exist (method: put)', async () => {
      await request(server)
        .put(`/api/users/${validId}`)
        .expect(httpStatusCode.NOT_FOUND, `"User with id: ${validId} is not found."`);
    });

    it('should return 404 when id does not exist (method: delete)', async () => {
      await request(server)
        .delete(`/api/users/${validId}`)
        .expect(httpStatusCode.NOT_FOUND, `"User with id: ${validId} is not found."`);
    });
  });
});
