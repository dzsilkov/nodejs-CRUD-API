import {createServer as createServerHttp} from 'node:http';
import {IncomingMessage, ServerResponse} from 'http';
// import {parseRoute} from '../helpers/helpers';
import {handleRequest} from './handle-request';

const createServer = () => createServerHttp(async (req: IncomingMessage, res: ServerResponse) => {
    // console.log('Request ', req, port);
    // console.log('Response', res, port);

    try {
        await handleRequest(req, res);
        // const {route: {handler}} = await parseRoute(req);
        // console.log(handler());
    } catch {
        res.writeHead(500, 'Internal server Error', {'Content-Type': 'application/json'});
        res.end(JSON.stringify({message: 'Internal server Error'}));
    }

});

const listenServer = (port) => {
    const server = createServer();
    server.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
};

export {listenServer};