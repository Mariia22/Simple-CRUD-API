import { IncomingMessage } from 'http';
import { Api400Error } from './errors/api400Error';
import { UserRequest } from './types';

export const printNotFoundMessage = (id: string): string => {
  return `User with id: ${id} is not found.`;
};

export const printBadRequestMessage = (id: string): string => {
  return `User's id: ${id} is invalid.`;
};

export const printBodyBadRequestMessage = (): string => {
  return `Body does not contain required fields.`;
};

export const printBodyBadFieldsMessage = (): string => {
  return `Body contains invalid field.`;
};

const printBodyInvalidDataMessage = (): string => {
  return `Invalid data.`;
};

export const printApiNotFoundMessage = (url: string): string => {
  return `Api: ${url} is not found.`;
};

export const printInternalErrorMessage = (): string => {
  return `Server not responding.`;
};

export const getIdFromURL = (url: string): string => {
  return url.split('/')[3];
};

export const getBodyFromReq = async (req: IncomingMessage): Promise<{}> => {
  return new Promise((resolve, reject) => {
    const buff: Uint8Array[] = [];
    req
      .on('data', (chunk: Uint8Array) => {
        buff.push(chunk);
      })
      .on('end', () => {
        const body = buff.toString();
        try {
          resolve(body ? JSON.parse(body) : {});
        } catch {
          reject(new Api400Error(printBodyInvalidDataMessage()));
        }
      })
      .on('error', () => {
        reject();
      });
  });
};

export const validateUserBody = (user: UserRequest): boolean => {
  return (
    typeof user.age === 'number' &&
    typeof user.username === 'string' &&
    Array.isArray(user.hobbies) &&
    user.hobbies.every((hobby) => typeof hobby === 'string')
  );
};
