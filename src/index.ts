import * as dotenv from 'dotenv';
import { createServer } from 'node:http';
import cluster from 'node:cluster';
import { defaultPort } from './config/index.ts';
import { multiBalancer } from './multi/index.ts';
import { router } from './router/index.ts';

dotenv.config();

const multi = 'cluster';
const processPort = Number(process.env.PORT || defaultPort);
const port = Number(cluster.isPrimary ? processPort : process.env.workerPort);
const mode = process.env.NODE_MODE;
export const server = createServer(mode === multi ? multiBalancer(port) : router());

server.listen(port, () => {
  console.log(`${process.pid} is running on port ${port}`);
});
