import { cpus } from 'os';
import { UsersModel } from '../models/usersModel';
import { IncomingMessage, ServerResponse } from 'http';
import cluster from 'cluster';

export const multiBalancer = (port: number) => {
  const cores = cpus();
  const coresNumber = cores.length;
  const model = new UsersModel([]);
  const ports = cores.map((_, index) => {
    const workerPort = port + index + 1;
    cluster.schedulingPolicy = cluster.SCHED_NONE;
    cluster.fork({ workerPort });
  });
  return (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    console.log('here');
  };
};
