import {request, createServer, IncomingMessage, ServerResponse} from 'http';

import dotenv from 'dotenv';
import {listenServer} from './server/server';
import {availableParallelism} from 'os';
import cluster, {Worker} from 'cluster';

dotenv.config();

const isMulti = process.argv.includes('--multi');
export const cpus = availableParallelism();
const host = process.env.HOST;

const port = process.env.PORT || 4000;

export type Workers = {
    worker: Worker;
    host: 'localhost';
    port: number;
}[];

export const getBalancerRouter =
    (workers: Worker[], currentWorker: { index: number }) =>
        async (req: IncomingMessage, res: ServerResponse) => {
            // const worker = workers[currentWorker.index];

            currentWorker.index = (currentWorker.index + 1) % workers.length;

            const proxyRequest = request({
                host,
                // port: worker.port,
                // method: req.method,
                path: req.url,
                headers: req.headers,
            });

            req.pipe(proxyRequest);

            proxyRequest.on('response', (workerResponse) => {
                workerResponse.pipe(res, { end: true });
            });

            proxyRequest.on('error', async () => {
                // await handleInternalError(res);
            });
        };

if (isMulti && cluster.isPrimary) {
    const workers: Worker[] = [];

    for (let i = 1; i <= cpus; i++) {
        const childWorker = cluster.fork({ HOST: host, PORT: +port + i });

        workers.push(childWorker);
        childWorker.on('message', (data) => {
            workers.forEach((worker) => worker.send(data));
        });
    }

    cluster.on('exit', (worker, code) => {
        console.log(`Worker ${worker.id} died. Exit code: ${code}`);
    });

    let currentWorker = { index: 0 };

    const loadBalancer = createServer(
        getBalancerRouter(workers, currentWorker),
    );

    loadBalancer.listen(port, () =>
        console.log(`Load balancer listening on port ${port}`),
    );
} else {
    listenServer(port);
}