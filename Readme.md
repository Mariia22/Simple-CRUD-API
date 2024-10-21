# Simple CRUD API

This project is a simple CRUD API built with Node.js (version 22.x.x) and TypeScript. The API includes endpoints for creating, reading, updating, and deleting user records and supports development and production modes.

## Table of Contents

- [Simple CRUD API](#simple-crud-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
    - [Development Mode](#development-mode)
    - [Production Mode](#production-mode)
    - [Scaling with Node.js Cluster API](#scaling-with-nodejs-cluster-api)
    - [Testing](#testing)
  - [API Documentation](#api-documentation)
    - [User Object](#user-object)
    - [Endpoints](#endpoints)
      - [Get All Users](#get-all-users)
      - [Get User by ID](#get-user-by-id)
      - [Create User](#create-user)
      - [Update User](#update-user)
      - [Delete User](#delete-user)

## Features

- CRUD operations on user data.
- Environment-based configurations for development and production.
- Error handling for invalid requests and server issues.
- Horizontal scaling using the Node.js Cluster API with a round-robin load balancer.

## Requirements

- Node.js version 22.9.0 or higher.
- npm (Node Package Manager) or yarn for managing dependencies.
- The following npm libraries are used:
  - `nodemon`, `dotenv`, `ts-node-dev`, `typescript`, `webpack`, `ts-loader`, `uuid`, `eslint`, and `prettier`.

## Installation

1. **Clone the repository and install dependencies**:

   ```bash
   git clone https://github.com/your-repo/simple-crud-api.git
   cd simple-crud-api
   npm install
2. **Set up environment variables**: Create a .env file in the root of the project with the following content:

   ```bash
   PORT=4000
   ```

## Running the Application

### Development Mode

To run the application in development mode with auto-reload on file changes:

  ```bash
  npm run start:dev
  ```

### Production Mode

To build the application and run it in production mode, use the following command:

  ```bash
  npm run start:prod
  ```

### Scaling with Node.js Cluster API

To run multiple instances of the application with horizontal scaling:

  ```bash
  npm run start:multi
  ```

### Testing

You can run tests to verify the API functionality:

  ```bash
  npm run test
  ```

## API Documentation

### User Object

Each user has the following properties:

- **id** (string, UUID): A unique identifier generated by the server.
- **username** (string, required): The user’s name.
- **age** (number, required): The user’s age.
- **hobbies** (array of strings, required): The user’s hobbies.

### Endpoints

#### Get All Users

- **URL**: `/api/users`
- **Method**: `GET`
- **Response**:
  - `200 OK` with an array of users.

#### Get User by ID

- **URL**: `/api/users/{userId}`
- **Method**: `GET`
- **Response**:
  - `200 OK` with the user object.
  - `400 Bad Request` if the `userId` is not a valid UUID.
  - `404 Not Found` if the user is not found.

#### Create User

- **URL**: `/api/users`
- **Method**: `POST`
- **Body**:

  ```json
  {
    "username": "John",
    "age": 25,
    "hobbies": ["reading", "gaming"]
  }
  ```

- **Response**:
  - `201 Created` with the created user object.
  - `400 Bad Request` if the `userId`  if required fields are missing.

#### Update User

- **URL**: `/api/users/{userId}`
- **Method**: `PUT`
- - **Body**:

  ```json
  {
    "username": "John Updated",
    "age": 26,
    "hobbies": ["reading", "cycling"]
  }
  ```

  - **Response**:
  - `200 OK` with the updated user object.
  - `400 Bad Request` if the `userId` is invalid.
  - `404 Not Found` if the user is not found.

#### Delete User

- **URL**: `/api/users/{userId}`
- **Method**: `DELETE`
- **Response**:
  - `204 No Content` if the user was deleted.
  - `400 Bad Request` if the `userId` is invalid.
  - `404 Not Found` if the user is not found.
