export const printNotFoundMessage = (id: number): string => {
  return `User with id: ${id} is not found.`;
};

export const printBadRequestMessage = (id: number): string => {
  return `User's id: ${id} is invalid.`;
};

export const printBodyBadRequestMessage = (): string => {
  return `Body does not contain required fields`;
};

export const printApiNotFoundMessage = (url: string): string => {
  return `Api: ${url} is not found.`;
};

export const printInternalErrorMessage = (): string => {
  return `Server not responding`;
};
