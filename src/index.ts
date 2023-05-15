import * as dotenv from 'dotenv';
import { defaultPort } from './config';
import { createServer } from 'http';
import { router } from './router';
import { IncomingMessage, ServerResponse } from 'http';
import { multiBalancer } from './multi';
dotenv.config();

const multi = 'cluster';
const port = Number(process.env.PORT || defaultPort);
const mode = process.env.NODE_MODE;
const server = createServer(mode === multi ? multiBalancer(port) : router());

server.listen(port, () => {
  console.log(`${process.pid} is running on port ${port}`);
});
