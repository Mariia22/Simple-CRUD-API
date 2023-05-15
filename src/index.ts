import * as dotenv from 'dotenv';
import { defaultPort } from './config';
import { createServer } from 'http';
import { router } from './router';
import { multiBalancer } from './multi';
import cluster from 'cluster';
dotenv.config();

const multi = 'cluster';
const processPort = Number(process.env.PORT || defaultPort);
const port = Number(cluster.isPrimary ? processPort : process.env.workerPort);
const mode = process.env.NODE_MODE;
export const server = createServer(mode === multi ? multiBalancer(port) : router());

server.listen(port, () => {
  console.log(`${process.pid} is running on port ${port}`);
});
