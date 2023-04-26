import * as dotenv from 'dotenv';
import { defaultPort } from './config';
import { createServer } from 'http';
dotenv.config();

const port = Number(process.env.PORT || defaultPort);
export const server = createServer();

server.listen(port, () => {
  console.log(`${process.pid} is running on port ${port}`);
});
