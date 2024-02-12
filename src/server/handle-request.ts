import {IncomingMessage, ServerResponse} from 'http';
import {MethodRequestHandler} from './method-request-handler';

export const handleRequest = async (req: IncomingMessage, res: ServerResponse) => {
    console.log(req.method?.toLowerCase());
    switch (req.method?.toUpperCase()) {
        case 'GET':
            await MethodRequestHandler.getRequestHandler(req, res);
            break;
        case 'POST':
            await MethodRequestHandler.postRequestHandler(req, res);
            break;
        case 'PUT':
            await MethodRequestHandler.putRequestHandler(req, res);
            break;
        case 'DELETE':
            await MethodRequestHandler.deleteRequestHandler(req, res);
            break;
        default:
            res.writeHead(
                405,
                { 'Content-Type': 'text/plain' },
            );
            res.end('unknown method');
    }
};