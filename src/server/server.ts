import {createServer as createServerHttp} from 'node:http';
import {IncomingMessage, ServerResponse} from 'http';
import {handleRequest} from './handle-request';
import {invalidInternalErrorResponse} from './response-handlers';

const createServer = () => createServerHttp(async (req: IncomingMessage, res: ServerResponse) => {
    try {
        await handleRequest(req, res);
    } catch {
        await invalidInternalErrorResponse(res);
    }

});

const listenServer = (port) => {
    const server = createServer();
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
};

export {listenServer};