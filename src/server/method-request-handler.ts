import {IncomingMessage, ServerResponse} from 'http';
import {UserDto} from '../models/models';
import {db} from '../db/db-service';
import {parseDataRequest} from './parse-data-request';

export class MethodRequestHandler {

    static async getRequestHandler(req: IncomingMessage, res: ServerResponse) {
        const userId = (req.url as string).split('/')[3];
        if (userId) {
            const user = await db.getUser(userId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
            return;
        }
        const data = await db.getAllUsers();
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify(data));
        res.end();
    }

    static async postRequestHandler(req: IncomingMessage, res: ServerResponse) {
        try {
            const data = await parseDataRequest(req);
            const newUser: UserDto = JSON.parse(data);
            //
            // if (!isUserDataValid(newUser)) {
            //     await handleInvalidUserDataRequest(res);
            //
            //     return;
            // }

            const user = await db.createUser(newUser);

            res.writeHead(201, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(user));
        } catch (e) {
            // if (e instanceof SyntaxError) {
            //     await handleInvalidUserDataRequest(res);
            // } else {
            //     await handleInternalError(res);
            // }
        }
    }


    static async putRequestHandler(req: IncomingMessage, res: ServerResponse) {
        const userId = (req.url as string).split('/')[3];
        if (userId) {
            const data = await parseDataRequest(req);
            let updateUserFields: Partial<UserDto> = JSON.parse(data);


            const updatedUser = await db.updateUser(userId, updateUserFields);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(updatedUser));
        }

    }

    static async deleteRequestHandler(req: IncomingMessage, res: ServerResponse) {
        const userId = (req.url as string).split('/')[3];
        if (userId) {
            await db.deleteUser(userId);
            res.writeHead(204, { 'Content-Type': 'application/json' });
            res.end();
        }
    }

}