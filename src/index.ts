import * as dotenv from 'dotenv';
import { defaultPort } from './config';
import { createServer } from 'http';
import { router } from './router';
import { IncomingMessage, ServerResponse } from 'http';
dotenv.config();

const port = Number(process.env.PORT || defaultPort);
const server = createServer(router());

server.listen(port, () => {
  console.log(`${process.pid} is running on port ${port}`);
});
